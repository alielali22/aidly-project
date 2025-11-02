import { query } from '../config/db.js';
import { ProgressRepository } from '../domain/repositories/ProgressRepository.js';

const progressRepo = new ProgressRepository();

/**
 * Upsert (insert or update) a progress record for a user and article.
 */
export async function upsertProgress(data) {
  // data: { userId, articleId, status, percentRead }
  try {
    return await progressRepo.upsert(data);
  } catch (e) {
    if (e.code === '23503') {  // invalid foreign key (e.g., article or user doesn't exist)
      const err = new Error('Invalid user or article reference');
      err.status = 400;
      throw err;
    }
    throw e;
  }
}

/**
 * Get all progress entries for a given user, including article titles.
 */
export async function myProgress(userId) {
  const { rows } = await query(
    `SELECT p.id, p.article_id AS "articleId", a.title AS "articleTitle",
            p.status, p.percent_read AS "percentRead", p.last_accessed AS "lastAccessed"
     FROM progress p
     JOIN articles a ON a.id = p.article_id
     WHERE p.user_id = $1
     ORDER BY p.last_accessed DESC`,
    [userId]
  );
  return rows;
}
