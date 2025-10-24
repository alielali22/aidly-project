import { BaseRepository } from './BaseRepository.js';
import { Category } from '../entities/Category.js';

export class CategoryRepository extends BaseRepository {
  async create({ name, description }) {
    const { rows } = await this.query(
      `INSERT INTO categories (category_name, description)
       VALUES ($1, $2)
       RETURNING id, category_name, description, created_at`,
      [name, description]
    );
    return Category.fromRow(rows[0]);
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, category_name, description, created_at FROM categories WHERE id = $1`,
      [id]
    );
    return rows[0] ? Category.fromRow(rows[0]) : null;
  }

  async findAll({ limit = 50, offset = 0 }) {
    const { rows } = await this.query(
      `SELECT id, category_name, description, created_at
       FROM categories
       ORDER BY id ASC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );
    return rows.map(Category.fromRow);
  }

  async update(id, { name, description }) {
    const { rows } = await this.query(
      `UPDATE categories
         SET category_name = COALESCE($2, category_name),
             description   = COALESCE($3, description)
       WHERE id = $1
       RETURNING id, category_name, description, created_at`,
      [id, name, description]
    );
    return rows[0] ? Category.fromRow(rows[0]) : null;
  }

  async remove(id) {
    await this.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return true;
  }
}
