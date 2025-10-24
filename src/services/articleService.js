import { ArticleRepository } from '../domain/repositories/ArticleRepository.js';
import { CategoryRepository } from '../domain/repositories/CategoryRepository.js';

const articles = new ArticleRepository();
const categories = new CategoryRepository();

export async function listArticles({ categoryId, limit, offset }) {
  return articles.findAll({ categoryId: categoryId ? Number(categoryId) : null, limit, offset });
}

export async function getArticle(id) {
  return articles.findById(Number(id));
}

export async function createArticle(dto, currentUserId) {
  const cat = await categories.findById(Number(dto.categoryId));
  if (!cat) {
    const err = new Error('Category not found');
    err.status = 404;
    throw err;
  }
  return articles.create({
    title: dto.title,
    content: dto.content,
    categoryId: Number(dto.categoryId),
    createdBy: Number(currentUserId),
    readTimeMinutes: dto.readTimeMinutes,
    mediaUrl: dto.mediaUrl
  });
}

export async function updateArticle(id, dto) {
  const exists = await articles.findById(Number(id));
  if (!exists) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  // if updating category, validate it
  if (dto.categoryId != null) {
    const cat = await categories.findById(Number(dto.categoryId));
    if (!cat) {
      const err = new Error('Category not found');
      err.status = 404;
      throw err;
    }
  }
  return articles.update(Number(id), {
    title: dto.title,
    content: dto.content,
    categoryId: dto.categoryId != null ? Number(dto.categoryId) : null,
    readTimeMinutes: dto.readTimeMinutes,
    mediaUrl: dto.mediaUrl
  });
}

export async function deleteArticle(id) {
  const exists = await articles.findById(Number(id));
  if (!exists) {
    const err = new Error('Article not found');
    err.status = 404;
    throw err;
  }
  await articles.remove(Number(id));
  return { ok: true };
}
