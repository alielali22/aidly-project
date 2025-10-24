import { BaseRepository } from './BaseRepository.js';
import { User } from '../entities/User.js';

export class UserRepository extends BaseRepository {
  async findByEmail(email) {
    const { rows } = await this.query(
      'SELECT id, name, email, password, role_id, created_at, avatar_url FROM users WHERE email = $1 LIMIT 1',
      [email]
    );
    return rows[0] || null; // includes password for auth step
  }

  async findById(id) {
    const { rows } = await this.query(
      'SELECT id, name, email, role_id, created_at, avatar_url FROM users WHERE id = $1 LIMIT 1',
      [id]
    );
    return rows[0] ? User.fromRow(rows[0]) : null;
  }

  async create({ name, email, passwordHash, roleId }) {
    const { rows } = await this.query(
      `INSERT INTO users (name, email, password, role_id)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, role_id, created_at, avatar_url`,
      [name, email, passwordHash, roleId]
    );
    return User.fromRow(rows[0]);
  }
}
