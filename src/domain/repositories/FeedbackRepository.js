import { BaseRepository } from './BaseRepository.js';
import { Feedback } from '../entities/Feedback.js';

export class FeedbackRepository extends BaseRepository {
  async create({ userId, articleId, comment, rating }) {
    const { rows } = await this.query(
      `INSERT INTO feedback (user_id, article_id, comment, rating)
       VALUES ($1,$2,$3,$4)
       RETURNING id, user_id, article_id, comment, rating, created_at, is_visible`,
      [userId, articleId, comment, rating]
    );
    return Feedback.fromRow(rows[0]);
  }

  async listForArticle(articleId) {
    const { rows } = await this.query(
      `SELECT id, user_id, article_id, comment, rating, created_at, is_visible
       FROM feedback WHERE article_id = $1 AND is_visible = TRUE
       ORDER BY created_at DESC`,
      [articleId]
    );
    return rows.map(Feedback.fromRow);
  }
}
