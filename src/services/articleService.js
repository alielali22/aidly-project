import { ArticleRepository } from '../domain/repositories/ArticleRepository.js';

const articleRepo = new ArticleRepository();

/**
 * List articles with optional filters and pagination.
 * @param {{ categoryId?: number|null, search?: string, limit?: number, offset?: number }} params
 */
export async function listArticles({ categoryId = null, search = '', limit = 50, offset = 0 }) {
  return articleRepo.findAll({ categoryId, search, limit, offset });
}

/**
 * Get a single article by ID.
 */
export async function getArticle(id) {
  const article = await articleRepo.findById(id);
  if (!article) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  return article;
}

/**
 * Create a new article.
 */
export async function createArticle(data) {
  return articleRepo.create(data);
}

/**
 * Update an existing article by ID.
 */
export async function updateArticle(id, data) {
  const article = await articleRepo.update(id, data);
  if (!article) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  return article;
}

/**
 * Delete an article by ID.
 */
export async function deleteArticle(id) {
  const deleted = await articleRepo.remove(id);
  if (!deleted) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
}
