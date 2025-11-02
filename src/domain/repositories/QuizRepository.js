import { BaseRepository } from './BaseRepository.js';
import { Quiz } from '../entities/Quiz.js';

export class QuizRepository extends BaseRepository {
  async create({ articleId, title, createdBy }) {
    const { rows } = await this.query(
      `INSERT INTO quizzes (article_id, title, created_by)
       VALUES ($1, $2, $3)
       RETURNING id, article_id, title, created_by, created_at`,
      [articleId, title, createdBy]
    );
    return Quiz.fromRow(rows[0]);
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, article_id, title, created_by, created_at
       FROM quizzes 
       WHERE id = $1`,
      [id]
    );
    return rows[0] ? Quiz.fromRow(rows[0]) : null;
  }

  async findByArticle(articleId) {
    const { rows } = await this.query(
      `SELECT id, article_id, title, created_by, created_at
       FROM quizzes
       WHERE article_id = $1
       ORDER BY id ASC`,
      [articleId]
    );
    return rows.map(Quiz.fromRow);
  }

  async remove(id) {
    const result = await this.query(`DELETE FROM quizzes WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }
}
