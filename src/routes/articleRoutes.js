import { Router } from 'express';
import { index, show, store, updateOne, destroy } from '../controllers/articleController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  listArticlesValidator,
  articleIdParam,
  createArticleValidator,
  updateArticleValidator
} from '../validators/articleValidator.js';

export const articleRoutes = Router();

// public reads
articleRoutes.get('/',     listArticlesValidator, validate, index);
articleRoutes.get('/:id',  articleIdParam,        validate, show);

// protected writes
articleRoutes.post('/',    authRequired, createArticleValidator, validate, store);
articleRoutes.put('/:id',  authRequired, articleIdParam, updateArticleValidator, validate, updateOne);
articleRoutes.delete('/:id', authRequired, articleIdParam, validate, destroy);
