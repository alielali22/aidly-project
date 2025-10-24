import { CreateScoreDto } from '../domain/dto/score.dto.js';
import { submitScore, myScores } from '../services/scoreService.js';

export async function create(req, res, next) {
  try {
    const { dto, errors } = CreateScoreDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await submitScore(dto, req.user.id);
    res.status(201).json(row);
  } catch (e) { next(e); }
}

export async function mine(req, res, next) {
  try {
    const rows = await myScores(req.user.id);
    res.json(rows);
  } catch (e) { next(e); }
}
