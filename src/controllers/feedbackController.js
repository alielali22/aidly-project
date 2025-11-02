import { listFeedbackForArticle, addFeedback, moderateFeedback } from '../services/feedbackService.js';
import { CreateFeedbackDto } from '../domain/dto/feedback.dto.js';

/**
 * Get all visible feedback for a given article.
 */
export async function listForArticle(req, res, next) {
  try {
    const articleId = Number(req.params.articleId);
    const feedbackList = await listFeedbackForArticle(articleId);
    res.json(feedbackList);
  } catch (e) {
    next(e);
  }
}

/**
 * Create a new feedback entry (rating/comment) for an article.
 */
export async function create(req, res, next) {
  try {
    const data = CreateFeedbackDto(req.body);
    data.userId = req.user.id;
    const feedback = await addFeedback(data);
    res.status(201).json(feedback);
  } catch (e) {
    next(e);
  }
}

/**
 * Moderate a feedback entry's visibility (Admin/Expert only).
 */
export async function moderate(req, res, next) {
  try {
    const feedback = await moderateFeedback(Number(req.params.id), Boolean(req.body.isVisible));
    res.json(feedback);
  } catch (e) {
    next(e);
  }
}
