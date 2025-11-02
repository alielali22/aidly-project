import { BaseRepository } from './BaseRepository.js';
import { Article } from '../entities/Article.js';

export class ArticleRepository extends BaseRepository {
  /**
   * Find all articles with optional category and search filters, and pagination.
   */
  async findAll({ categoryId = null, search = '', limit = 50, offset = 0 }) {
    const whereClauses = [];
    const params = [];

    if (categoryId) {
      whereClauses.push(`category_id = $${params.length + 1}`);
      params.push(categoryId);
    }

    if (search) {
      whereClauses.push(`(title ILIKE $${params.length + 1} OR content ILIKE $${params.length + 1})`);
      params.push(`%${search}%`);
    }

    let sql = `
      SELECT id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url
      FROM articles
    `;

    if (whereClauses.length > 0) {
      sql += `WHERE ${whereClauses.join(' AND ')} `;
    }

    sql += `ORDER BY created_at DESC 
            LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;

    params.push(limit, offset);

    const { rows } = await this.query(sql, params);
    return rows.map(Article.fromRow);
  }

  /**
   * Get a single article by ID.
   */
  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url
       FROM articles 
       WHERE id = $1`,
      [id]
    );
    return rows[0] ? Article.fromRow(rows[0]) : null;
  }

  /**
   * Create a new article.
   */
  async create({ title, content, categoryId, createdBy, readTimeMinutes, mediaUrl }) {
    const values = [title, content, categoryId, createdBy, readTimeMinutes ?? null, mediaUrl ?? null];
    const { rows } = await this.query(
      `INSERT INTO articles (title, content, category_id, created_by, read_time_minutes, media_url)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url`,
      values
    );
    return Article.fromRow(rows[0]);
  }

  /**
   * Update an article by ID.
   */
  async update(id, { title, content, categoryId, readTimeMinutes, mediaUrl }) {
    const values = [id, title ?? null, content ?? null, categoryId ?? null, readTimeMinutes ?? null, mediaUrl ?? null];
    const { rows } = await this.query(
      `UPDATE articles
       SET title = COALESCE($2, title),
           content = COALESCE($3, content),
           category_id = COALESCE($4, category_id),
           read_time_minutes = COALESCE($5, read_time_minutes),
           media_url = COALESCE($6, media_url),
           updated_at = NOW()
       WHERE id = $1
       RETURNING id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url`,
      values
    );
    return rows[0] ? Article.fromRow(rows[0]) : null;
  }

  /**
   * Delete an article by ID.
   */
  async remove(id) {
    const result = await this.query(`DELETE FROM articles WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }
}
