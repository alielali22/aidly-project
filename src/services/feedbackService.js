import { FeedbackRepository } from '../domain/repositories/FeedbackRepository.js';
import { ArticleRepository } from '../domain/repositories/ArticleRepository.js';

const repo = new FeedbackRepository();
const articles = new ArticleRepository();

export async function addFeedback(dto, userId) {
  const article = await articles.findById(dto.articleId);
  if (!article) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  return repo.create({ userId, articleId: dto.articleId, comment: dto.comment, rating: dto.rating });
}

export function listFeedback(articleId) {
  return repo.listForArticle(Number(articleId));
}
