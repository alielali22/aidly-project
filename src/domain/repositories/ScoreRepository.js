import { BaseRepository } from './BaseRepository.js';
import { Score } from '../entities/Score.js';

export class ScoreRepository extends BaseRepository {
  async create({ userId, quizId, score, total, timeTakenSeconds }) {
    const { rows } = await this.query(
      `INSERT INTO scores (user_id, quiz_id, score, total, time_taken_seconds)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING id, user_id, quiz_id, score, total, taken_at, time_taken_seconds`,
      [userId, quizId, score, total, timeTakenSeconds]
    );
    return Score.fromRow(rows[0]);
  }

  async listByUser(userId) {
    const { rows } = await this.query(
      `SELECT id, user_id, quiz_id, score, total, taken_at, time_taken_seconds
       FROM scores WHERE user_id = $1 ORDER BY taken_at DESC`,
      [userId]
    );
    return rows.map(Score.fromRow);
  }
}
