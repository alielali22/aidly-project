import { BaseRepository } from './BaseRepository.js';
import { Category } from '../entities/Category.js';

export class CategoryRepository extends BaseRepository {
  async create({ name, description }) {
    const { rows } = await this.query(
      `INSERT INTO categories (category_name, description)
       VALUES ($1, $2)
       RETURNING id, category_name, description, created_at`,
      [name, description ?? null]
    );
    return Category.fromRow(rows[0]);
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, category_name, description, created_at 
       FROM categories 
       WHERE id = $1`,
      [id]
    );
    return rows[0] ? Category.fromRow(rows[0]) : null;
  }

  // ⬇️ UPDATED: search matches name OR description, and supports pagination
  async findAll({ search = '', limit = 50, offset = 0 }) {
    let whereClause = '';
    const params = [];

    if (search) {
      whereClause = 'WHERE (category_name ILIKE $1 OR description ILIKE $1)';
      params.push(`%${search}%`);
    }

    const sql = `
      SELECT id, category_name, description, created_at
      FROM categories
      ${whereClause}
      ORDER BY category_name
      LIMIT $${params.length + 1} OFFSET $${params.length + 2}
    `;
    params.push(limit, offset);

    const { rows } = await this.query(sql, params);
    return rows.map(Category.fromRow);
  }

  async update(id, { name, description }) {
    const values = [id, name ?? null, description ?? null];
    const { rows } = await this.query(
      `UPDATE categories
       SET category_name = COALESCE($2, category_name),
           description   = COALESCE($3, description)
       WHERE id = $1
       RETURNING id, category_name, description, created_at`,
      values
    );
    return rows[0] ? Category.fromRow(rows[0]) : null;
  }

  async remove(id) {
    const result = await this.query(`DELETE FROM categories WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }
}
