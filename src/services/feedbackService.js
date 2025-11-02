import { query } from '../config/db.js';
import { FeedbackRepository } from '../domain/repositories/FeedbackRepository.js';

const feedbackRepo = new FeedbackRepository();

/**
 * List visible feedback for an article, including author names.
 */
export async function listFeedbackForArticle(articleId) {
  const { rows } = await query(
    `SELECT f.id, f.user_id AS "userId", u.name AS "userName",
            f.comment, f.rating, f.created_at AS "createdAt"
     FROM feedback f
     JOIN users u ON u.id = f.user_id
     WHERE f.article_id = $1 AND f.is_visible = TRUE
     ORDER BY f.created_at DESC`,
    [articleId]
  );
  return rows;
}

/**
 * Add a new feedback (comment/rating) for an article.
 */
export async function addFeedback({ userId, articleId, comment, rating }) {
  try {
    return await feedbackRepo.create({ userId, articleId, comment, rating });
  } catch (e) {
    if (e.code === '23503') {  // foreign key violation (e.g., invalid article_id)
      const err = new Error('Article not found');
      err.status = 400;
      throw err;
    }
    throw e;
  }
}

/**
 * Moderate (show/hide) a feedback entry by ID.
 */
export async function moderateFeedback(id, isVisible) {
  const feedback = await feedbackRepo.moderate(id, isVisible);
  if (!feedback) {
    const err = new Error('Feedback not found');
    err.status = 404;
    throw err;
  }
  return feedback;
}
