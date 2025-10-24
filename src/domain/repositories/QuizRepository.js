import { BaseRepository } from './BaseRepository.js';
import { Quiz } from '../entities/Quiz.js';

export class QuizRepository extends BaseRepository {
  async create({ articleId, question, optionA, optionB, optionC, optionD, correct, createdBy }) {
    const { rows } = await this.query(
      `INSERT INTO quizzes (article_id, question, option_a, option_b, option_c, option_d, correct_answer, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
       RETURNING id, article_id, question, option_a, option_b, option_c, option_d, correct_answer, created_by, created_at`,
      [articleId, question, optionA, optionB, optionC, optionD, correct, createdBy]
    );
    return Quiz.fromRow(rows[0]);
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, article_id, question, option_a, option_b, option_c, option_d, correct_answer, created_by, created_at
       FROM quizzes WHERE id = $1`,
      [id]
    );
    return rows[0] ? Quiz.fromRow(rows[0]) : null;
  }

  async findByArticle(articleId) {
    const { rows } = await this.query(
      `SELECT id, article_id, question, option_a, option_b, option_c, option_d, correct_answer, created_by, created_at
       FROM quizzes WHERE article_id = $1 ORDER BY id ASC`,
      [articleId]
    );
    return rows.map(Quiz.fromRow);
  }

  async remove(id) {
    await this.query(`DELETE FROM quizzes WHERE id = $1`, [id]);
    return true;
  }
}
