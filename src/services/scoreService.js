import { query } from '../config/db.js';
import { ScoreRepository } from '../domain/repositories/ScoreRepository.js';

const scoreRepo = new ScoreRepository();

/**
 * Manually submit a new score for a quiz (Admin-only via controller/route).
 */
export async function submitManualScore({ userId, quizId, score, total, timeTakenSeconds }) {
  try {
    const scoreRecord = await scoreRepo.create({ userId, quizId, score, total, timeTakenSeconds });
    return scoreRecord;
  } catch (e) {
    if (e.code === '23503') {  // foreign key violation (invalid quizId or userId)
      const err = new Error(
        e.constraint && e.constraint.includes('quiz')
          ? 'Quiz not found'
          : 'User not found'
      );
      err.status = 400;
      throw err;
    }
    throw e;
  }
}

/**
 * Get all scores for a given user, including quiz titles.
 */
export async function myScores(userId) {
  const { rows } = await query(
    `SELECT s.id, s.quiz_id AS "quizId", q.title AS "quizTitle",
            s.score, s.total, s.taken_at AS "takenAt", s.time_taken_seconds AS "timeTakenSeconds"
     FROM scores s
     JOIN quizzes q ON q.id = s.quiz_id
     WHERE s.user_id = $1
     ORDER BY s.taken_at DESC`,
    [userId]
  );
  return rows;
}

/**
 * Admin-only: update an existing score record by its ID.
 */
export async function updateScoreById(id, { score, total, timeTakenSeconds }) {
  const updated = await scoreRepo.update(id, { score, total, timeTakenSeconds });
  if (!updated) {
    const err = new Error('Score not found');
    err.status = 404;
    throw err;
  }
  return updated;
}
