import {
  listArticles,
  getArticle,
  createArticle,
  updateArticle,
  deleteArticle
} from '../services/articleService.js';
import { CreateArticleDto, UpdateArticleDto } from '../domain/dto/article.dto.js';

export async function index(req, res, next) {
  try {
    const limit = Number(req.query.limit) || 50;
    const offset = Number(req.query.offset) || 0;
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : null;
    const rows = await listArticles({ categoryId, limit, offset });
    res.json(rows);
  } catch (e) { next(e); }
}

export async function show(req, res, next) {
  try {
    const row = await getArticle(req.params.id);
    if (!row) return res.status(404).json({ error: 'Article not found' });
    res.json(row);
  } catch (e) { next(e); }
}

export async function store(req, res, next) {
  try {
    const { dto, errors } = CreateArticleDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await createArticle(dto, req.user.id); // created_by = current user
    res.status(201).json(row);
  } catch (e) { next(e); }
}

export async function updateOne(req, res, next) {
  try {
    const { dto, errors } = UpdateArticleDto(req.body);
    if (errors.length) return res.status(400).json({ errors });
    const row = await updateArticle(req.params.id, dto);
    res.json(row);
  } catch (e) { next(e); }
}

export async function destroy(req, res, next) {
  try {
    const result = await deleteArticle(req.params.id);
    res.json(result);
  } catch (e) { next(e); }
}
