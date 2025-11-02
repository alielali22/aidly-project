import { upsertProgress, myProgress } from '../services/progressService.js';
import { UpsertProgressDto } from '../domain/dto/progress.dto.js';

/**
 * Upsert (insert or update) progress for an article for the current user.
 */
export async function upsert(req, res, next) {
  try {
    const data = UpsertProgressDto(req.body);
    data.userId = req.user.id;
    const progress = await upsertProgress(data);
    res.json(progress);
  } catch (e) {
    next(e);
  }
}

/**
 * Get all progress entries for the current user.
 */
export async function mine(req, res, next) {
  try {
    const progressList = await myProgress(req.user.id);
    res.json(progressList);
  } catch (e) {
    next(e);
  }
}
