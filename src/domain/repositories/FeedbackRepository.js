import { BaseRepository } from './BaseRepository.js';
import { Feedback } from '../entities/Feedback.js';

export class FeedbackRepository extends BaseRepository {
  async create({ userId, articleId, comment, rating }) {
    const { rows } = await this.query(
      `INSERT INTO feedback (user_id, article_id, comment, rating)
       VALUES ($1, $2, $3, $4)
       RETURNING id, user_id, article_id, comment, rating, created_at, is_visible`,
      [userId, articleId, comment ?? null, rating ?? null]
    );
    return Feedback.fromRow(rows[0]);
  }

  async listForArticle(articleId) {
    const { rows } = await this.query(
      `SELECT id, user_id, article_id, comment, rating, created_at, is_visible
       FROM feedback 
       WHERE article_id = $1 AND is_visible = TRUE
       ORDER BY created_at DESC`,
      [articleId]
    );
    return rows.map(Feedback.fromRow);
  }

  async moderate(id, isVisible) {
    const { rows } = await this.query(
      `UPDATE feedback 
       SET is_visible = $2 
       WHERE id = $1
       RETURNING id, user_id, article_id, comment, rating, created_at, is_visible`,
      [id, isVisible]
    );
    return rows[0] ? Feedback.fromRow(rows[0]) : null;
  }
}
