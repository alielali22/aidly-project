import { BaseRepository } from './BaseRepository.js';
import { Article } from '../entities/Article.js';

export class ArticleRepository extends BaseRepository {
  async create({ title, content, categoryId, createdBy, readTimeMinutes, mediaUrl }) {
    const { rows } = await this.query(
      `INSERT INTO articles (title, content, category_id, created_by, read_time_minutes, media_url)
       VALUES ($1,$2,$3,$4,$5,$6)
       RETURNING id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url`,
      [title, content, categoryId, createdBy, readTimeMinutes, mediaUrl]
    );
    return Article.fromRow(rows[0]);
  }

  async findById(id) {
    const { rows } = await this.query(
      `SELECT id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url
         FROM articles WHERE id = $1`,
      [id]
    );
    return rows[0] ? Article.fromRow(rows[0]) : null;
  }

  async findAll({ categoryId = null, limit = 50, offset = 0 }) {
    const args = [];
    let where = '';
    if (categoryId) { where = 'WHERE category_id = $1'; args.push(categoryId); }
    const { rows } = await this.query(
      `SELECT id, title, content, category_id, created_by, created_at, updated_at, read_time_minutes, media_url
         FROM articles
         ${where}
         ORDER BY id DESC
         LIMIT ${limit} OFFSET ${offset}`,
      args
    );
    return rows.map(Article.fromRow);
  }

  async update(id, { title, content, categoryId, readTimeMinutes, mediaUrl }) {
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
      [id, title, content, categoryId, readTimeMinutes, mediaUrl]
    );
    return rows[0] ? Article.fromRow(rows[0]) : null;
  }

  async remove(id) {
    await this.query(`DELETE FROM articles WHERE id = $1`, [id]);
    return true;
  }
}
