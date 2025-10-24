import { Router } from 'express';
import { index, show, store, updateOne, destroy } from '../controllers/categoryController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import {
  listCategoriesValidator,
  categoryIdParam,
  createCategoryValidator,
  updateCategoryValidator
} from '../validators/categoryValidator.js';

export const categoryRoutes = Router();

// public reads
categoryRoutes.get('/',     listCategoriesValidator, validate, index);
categoryRoutes.get('/:id',  categoryIdParam,         validate, show);

// protected writes
categoryRoutes.post('/',    authRequired, createCategoryValidator, validate, store);
categoryRoutes.put('/:id',  authRequired, categoryIdParam, updateCategoryValidator, validate, updateOne);
categoryRoutes.delete('/:id', authRequired, categoryIdParam, validate, destroy);
