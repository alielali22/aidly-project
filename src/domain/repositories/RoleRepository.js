import { BaseRepository } from './BaseRepository.js';
import { Role } from '../entities/Role.js';

export class RoleRepository extends BaseRepository {
  async findByName(roleName) {
    const { rows } = await this.query(
      `SELECT id, role_name 
       FROM roles 
       WHERE role_name = $1 
       LIMIT 1`,
      [roleName]
    );
    return rows[0] ? Role.fromRow(rows[0]) : null;
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, role_name 
       FROM roles 
       WHERE id = $1 
       LIMIT 1`,
      [id]
    );
    return rows[0] ? Role.fromRow(rows[0]) : null;
  }

  async ensure(roleName) {
    // Insert role if not exists, or return existing
    const { rows } = await this.query(
      `INSERT INTO roles (role_name)
       VALUES ($1)
       ON CONFLICT (role_name) DO UPDATE SET role_name = EXCLUDED.role_name
       RETURNING id, role_name`,
      [roleName]
    );
    return Role.fromRow(rows[0]);
  }
}
