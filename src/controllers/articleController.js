import {
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '../services/articleService.js';
import {
  CreateArticleDto,
  UpdateArticleDto
} from '../domain/dto/article.dto.js';

/**
 * Get a list of articles (optionally filtered by category, search term, or paginated).
 */
export async function index(req, res, next) {
  try {
    const params = {
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : null,
      search: req.query.search || '',
      limit: req.query.limit ? parseInt(req.query.limit, 10) : 50,
      offset: req.query.offset ? parseInt(req.query.offset, 10) : 0
    };
    const articles = await listArticles(params);
    res.json(articles);
  } catch (e) {
    next(e);
  }
}

/**
 * Get a single article by ID.
 */
export async function show(req, res, next) {
  try {
    const articleId = Number(req.params.id);
    const article = await getArticle(articleId);
    res.json(article);
  } catch (e) {
    next(e);
  }
}

/**
 * Create a new article. Requires authentication (Expert or Admin role).
 */
export async function store(req, res, next) {
  try {
    const data = CreateArticleDto(req.body);
    data.createdBy = req.user.id;
    const article = await createArticle(data);
    res.status(201).json(article);
  } catch (e) {
    next(e);
  }
}

/**
 * Update an existing article by ID. Requires Expert or Admin role.
 */
export async function updateOne(req, res, next) {
  try {
    const articleId = Number(req.params.id);
    const data = UpdateArticleDto(req.body);
    const article = await updateArticle(articleId, data);
    res.json(article);
  } catch (e) {
    next(e);
  }
}

/**
 * Delete an article by ID. Requires Admin role.
 */
export async function destroy(req, res, next) {
  try {
    const articleId = Number(req.params.id);
    await deleteArticle(articleId);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
