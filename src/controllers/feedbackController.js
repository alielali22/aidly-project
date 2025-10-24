import { CreateFeedbackDto } from '../domain/dto/feedback.dto.js';
import { addFeedback, listFeedback } from '../services/feedbackService.js';

export async function create(req, res, next) {
  try {
    const { dto, errors } = CreateFeedbackDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await addFeedback(dto, req.user.id);
    res.status(201).json(row);
  } catch (e) { next(e); }
}

export async function forArticle(req, res, next) {
  try {
    const rows = await listFeedback(req.params.articleId);
    res.json(rows);
  } catch (e) { next(e); }
}
