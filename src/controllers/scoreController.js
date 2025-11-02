import { submitManualScore, myScores, updateScoreById } from '../services/scoreService.js';
import { CreateScoreDto } from '../domain/dto/score.dto.js';

/**
 * Admin-only: Manually create/override a score for a quiz.
 * Normal scores are created automatically during quiz submission.
 */
export async function create(req, res, next) {
  try {
    const data = CreateScoreDto(req.body);

    // If userId not provided, default to the current user (admin may target anyone)
    data.userId = data.userId ?? req.user.id;

    const isAdmin = req.user?.role?.toLowerCase() === 'admin';
    if (!isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    const scoreRecord = await submitManualScore(data);
    res.status(201).json(scoreRecord);
  } catch (e) {
    next(e);
  }
}

/**
 * Learner: Get all quiz scores for the current user.
 */
export async function mine(req, res, next) {
  try {
    const scores = await myScores(req.user.id);
    res.json(scores);
  } catch (e) {
    next(e);
  }
}

/**
 * Admin-only: Update an existing score (manual correction).
 */
export async function updateScore(req, res, next) {
  try {
    const id = Number(req.params.id);
    const isAdmin = req.user?.role?.toLowerCase() === 'admin';
    if (!isAdmin) {
      return res.status(403).json({ error: 'Forbidden: Admins only' });
    }

    const updatedScore = await updateScoreById(id, req.body);
    res.json(updatedScore);
  } catch (e) {
    next(e);
  }
}
