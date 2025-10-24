import { UpsertProgressDto } from '../domain/dto/progress.dto.js';
import { myProgress, upsertProgress } from '../services/progressService.js';

export async function upsert(req, res, next) {
  try {
    const { dto, errors } = UpsertProgressDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await upsertProgress(dto, req.user.id);
    res.status(201).json(row);
  } catch (e) { next(e); }
}

export async function mine(req, res, next) {
  try {
    const rows = await myProgress(req.user.id);
    res.json(rows);
  } catch (e) { next(e); }
}
