import { query, withTransaction } from '../config/db.js';
import { QuizRepository } from '../domain/repositories/QuizRepository.js';

const quizRepo = new QuizRepository();

/**
 * Get all quizzes for a given article.
 */
export async function quizzesByArticle(articleId) {
  return quizRepo.findByArticle(articleId);
}

/**
 * Get full quiz details (questions and options) for a quiz ID.
 * Returns an object with quiz info and an array of questions (each with options).
 */
export async function getQuizFull(quizId) {
  // Fetch basic quiz info
  const { rows: quizRows } = await query(
    `SELECT id, article_id AS "articleId", title 
     FROM quizzes 
     WHERE id = $1`,
    [quizId]
  );
  if (!quizRows[0]) return null;

  // Fetch all questions for this quiz
  const { rows: questions } = await query(
    `SELECT id, body, explanation 
     FROM quiz_questions 
     WHERE quiz_id = $1 
     ORDER BY id`,
    [quizId]
  );

  // Fetch all options for these questions
  const { rows: options } = await query(
    `SELECT id, question_id AS "questionId", body, is_correct AS "isCorrect"
     FROM quiz_options
     WHERE question_id IN (
       SELECT id FROM quiz_questions WHERE quiz_id = $1
     )
     ORDER BY id`,
    [quizId]
  );

  // Map questions to their options
  const questionMap = new Map();
  for (const q of questions) {
    questionMap.set(q.id, {
      id: q.id,
      body: q.body,
      explanation: q.explanation ?? null,
      options: []
    });
  }
  for (const op of options) {
    // Only include option body (hide correctness in this output)
    questionMap.get(op.questionId)?.options.push({ id: op.id, body: op.body });
  }

  return { ...quizRows[0], questions: Array.from(questionMap.values()) };
}

/**
 * Create a new quiz (with no questions yet).
 */
export async function createQuizService({ articleId, title, createdBy }) {
  return quizRepo.create({ articleId, title, createdBy });
}

/**
 * Add a new question (and its options) to a quiz, within a transaction.
 */
export async function addQuestionService(quizId, { body, options }) {
  return withTransaction(async (client) => {
    // Insert the question
    const qResult = await client.query(
      `INSERT INTO quiz_questions (quiz_id, body) 
       VALUES ($1, $2) 
       RETURNING id, body`,
      [quizId, body]
    );
    const questionId = qResult.rows[0].id;

    // Insert each option for the question
    for (const opt of options) {
      await client.query(
        `INSERT INTO quiz_options (question_id, body, is_correct) 
         VALUES ($1, $2, $3)`,
        [questionId, opt.body, Boolean(opt.isCorrect)]
      );
    }

    // Return the created question with its options (indicate which was correct for confirmation)
    return {
      id: questionId,
      body,
      options: options.map(o => ({ body: o.body, isCorrect: !!o.isCorrect }))
    };
  });
}

/**
 * Start a new quiz attempt for a user.
 */
export async function startAttemptService(quizId, userId) {
  const { rows } = await query(
    `INSERT INTO quiz_attempts (quiz_id, user_id) 
     VALUES ($1, $2) 
     RETURNING id, quiz_id AS "quizId", user_id AS "userId", started_at AS "startedAt"`,
    [quizId, userId]
  );
  return rows[0];
}

/**
 * Submit answers for a quiz attempt and compute the score.
 * Returns an object with the score results and a breakdown per question.
 */
export async function submitAttemptService(quizId, attemptId, userId, answers, timeTakenSeconds) {
  // Validate and grade the quiz attempt within a transaction
  return withTransaction(async (client) => {
    // ✅ Fetch and validate the attempt
    const { rows: attemptRows } = await client.query(
      `SELECT id, user_id AS "userId", quiz_id AS "quizId", submitted_at 
   FROM quiz_attempts 
   WHERE id = $1`,
      [attemptId]
    );

    if (!attemptRows[0]) {
      const err = new Error("Quiz attempt not found.");
      err.status = 404;
      throw err;
    }

    const attempt = attemptRows[0];

    if (attempt.userId !== userId) {
      const err = new Error("Unauthorized: You do not own this attempt.");
      err.status = 403;
      throw err;
    }

    if (attempt.quizId !== quizId) {
      const err = new Error("Quiz mismatch: Attempt does not match quiz.");
      err.status = 400;
      throw err;
    }

    if (attempt.submitted_at) {
      const err = new Error("This attempt has already been submitted.");
      err.status = 400;
      throw err;
    }

    for (const a of answers) {
      await client.query(
        `INSERT INTO quiz_answers (attempt_id, question_id, option_id) 
         VALUES ($1, $2, $3)
         ON CONFLICT (attempt_id, question_id) 
         DO UPDATE SET option_id = EXCLUDED.option_id`,
        [attemptId, a.questionId, a.optionId]
      );
    }

    // Compute how many answers were correct
    const { rows: correctAnswers } = await client.query(
      `SELECT qa.question_id
       FROM quiz_answers qa
       JOIN quiz_options qo ON qo.id = qa.option_id
       WHERE qa.attempt_id = $1 AND qo.is_correct = TRUE`,
      [attemptId]
    );
    const correctCount = correctAnswers.length;

    // Get total number of questions in the quiz
    const { rows: totalRows } = await client.query(
      `SELECT COUNT(*)::int AS total 
       FROM quiz_questions 
       WHERE quiz_id = $1`,
      [quizId]
    );
    const totalQuestions = totalRows[0].total || 0;

    // Calculate percentage score
    const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Close the attempt (mark as submitted and record score and time)
    await client.query(
      `UPDATE quiz_attempts
       SET submitted_at = NOW(),
           score_percent = $2,
           time_taken_seconds = COALESCE($3, time_taken_seconds)
       WHERE id = $1`,
      [attemptId, scorePercent, timeTakenSeconds ?? null]
    );

    // Record the score in the scores table for history/analytics
    await client.query(
      `INSERT INTO scores (user_id, quiz_id, score, total, time_taken_seconds)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, quizId, correctCount, totalQuestions, timeTakenSeconds ?? null]
    );

    // Prepare detailed breakdown per question (whether the user's answer was correct)
    const { rows: breakdownRows } = await client.query(
      `SELECT q.id AS questionId, q.body, q.explanation,
              (qo.is_correct = TRUE) AS correct
       FROM quiz_questions q
       LEFT JOIN quiz_answers qa 
         ON qa.question_id = q.id AND qa.attempt_id = $1
       LEFT JOIN quiz_options qo 
         ON qo.id = qa.option_id
       WHERE q.quiz_id = $2
       ORDER BY q.id`,
      [attemptId, quizId]
    );

    return {
      attemptId,
      quizId,
      score: correctCount,
      total: totalQuestions,
      scorePercent,
      timeTakenSeconds: timeTakenSeconds ?? null,
      breakdown: breakdownRows.map(r => ({
        questionId: r.questionId,
        correct: !!r.correct,
        explanation: r.explanation
      }))
    };
  });
}

/**
 * Delete a quiz by ID.
 */
export async function deleteQuizService(id) {
  const deleted = await quizRepo.remove(id);
  if (!deleted) {
    const err = new Error('Quiz not found');
    err.status = 404;
    throw err;
  }
}
