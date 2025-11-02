import {
  createQuizService, addQuestionService, quizzesByArticle,
  getQuizFull, startAttemptService, submitAttemptService, deleteQuizService
} from '../services/quizService.js';

/**
 * Get all quizzes for a given article (publicly accessible).
 */
export async function forArticle(req, res, next) {
  try {
    const quizzes = await quizzesByArticle(Number(req.params.articleId));
    res.json(quizzes);
  } catch (e) {
    next(e);
  }
}

/**
 * Get full quiz details (questions and options). Requires authentication to attempt.
 */
export async function show(req, res, next) {
  try {
    const quiz = await getQuizFull(Number(req.params.id));
    if (!quiz) {
      return res.status(404).json({ error: 'Not found' });
    }
    res.json(quiz);
  } catch (e) {
    next(e);
  }
}

/**
 * Create a new quiz for an article (Expert/Admin only).
 */
export async function createQuiz(req, res, next) {
  try {
    const data = { 
      articleId: Number(req.body.articleId),
      title: req.body.title,
      createdBy: req.user.id 
    };
    const quiz = await createQuizService(data);
    res.status(201).json(quiz);
  } catch (e) {
    next(e);
  }
}

/**
 * Add a question (with options) to an existing quiz (Expert/Admin only).
 */
export async function addQuestion(req, res, next) {
  try {
    const quizId = Number(req.params.quizId);
    const question = await addQuestionService(quizId, req.body);
    res.status(201).json(question);
  } catch (e) {
    next(e);
  }
}

/**
 * Start a new quiz attempt for the current user.
 */
export async function startAttempt(req, res, next) {
  try {
    const attempt = await startAttemptService(Number(req.params.id), req.user.id);
    res.status(201).json(attempt);
  } catch (e) {
    next(e);
  }
}

/**
 * Submit answers for a quiz attempt and get the results.
 */
export async function submitAttempt(req, res, next) {
  try {
    const result = await submitAttemptService(
      Number(req.params.id),
      Number(req.params.attemptId),
      req.user.id,
      req.body.answers,
      req.body.timeTakenSeconds ?? null
    );
    res.json(result);
  } catch (e) {
    next(e);
  }
}

/**
 * Delete a quiz by ID (Admin only).
 */
export async function removeQuiz(req, res, next) {
  try {
    await deleteQuizService(Number(req.params.id));
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
