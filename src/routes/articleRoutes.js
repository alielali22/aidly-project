import { Router } from 'express';
import { index, show, store, updateOne, destroy } from '../controllers/articleController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { listArticlesValidator, articleIdParam, createArticleValidator, updateArticleValidator } from '../validators/articleValidator.js';

export const articleRoutes = Router();

// Public: list articles with optional filters
articleRoutes.get('/', listArticlesValidator, validate, index);

// Public: get a single article
articleRoutes.get('/:id', articleIdParam, validate, show);

// Protected: create a new article (Expert or Admin)
articleRoutes.post('/', 
  authRequired, requireRole('Admin', 'Expert'),
  createArticleValidator, validate, store
);

// Protected: update an article (Expert or Admin)
articleRoutes.put('/:id', 
  authRequired, requireRole('Admin', 'Expert'),
  articleIdParam, updateArticleValidator, validate, updateOne
);

// Protected: delete an article (Admin only)
articleRoutes.delete('/:id', 
  authRequired, requireRole('Admin'),
  articleIdParam, validate, destroy
);
