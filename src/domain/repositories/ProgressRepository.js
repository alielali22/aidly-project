import { BaseRepository } from './BaseRepository.js';
import { Progress } from '../entities/Progress.js';

export class ProgressRepository extends BaseRepository {
  async upsert({ userId, articleId, status, percentRead }) {
    const { rows } = await this.query(
      `INSERT INTO progress (user_id, article_id, status, percent_read)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (user_id, article_id) DO UPDATE
         SET status = EXCLUDED.status,
             percent_read = EXCLUDED.percent_read,
             last_accessed = NOW()
       RETURNING id, user_id, article_id, status, last_accessed, percent_read`,
      [userId, articleId, status, percentRead]
    );
    return Progress.fromRow(rows[0]);
  }

  async listByUser(userId) {
    const { rows } = await this.query(
      `SELECT id, user_id, article_id, status, last_accessed, percent_read
       FROM progress WHERE user_id = $1 ORDER BY last_accessed DESC`,
      [userId]
    );
    return rows.map(Progress.fromRow);
  }
}
