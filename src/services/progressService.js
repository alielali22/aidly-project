import { ProgressRepository } from '../domain/repositories/ProgressRepository.js';
import { ArticleRepository } from '../domain/repositories/ArticleRepository.js';

const repo = new ProgressRepository();
const articles = new ArticleRepository();

export async function upsertProgress(dto, userId) {
  const article = await articles.findById(dto.articleId);
  if (!article) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  return repo.upsert({ userId, articleId: dto.articleId, status: dto.status, percentRead: dto.percentRead });
}

export function myProgress(userId) {
  return repo.listByUser(userId);
}
