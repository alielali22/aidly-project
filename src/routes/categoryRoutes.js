import { Router } from 'express';
import { index, show, store, updateOne, destroy } from '../controllers/categoryController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { listCategoriesValidator, categoryIdParam, createCategoryValidator, updateCategoryValidator } from '../validators/categoryValidator.js';

export const categoryRoutes = Router();

// Public: list categories
categoryRoutes.get('/', listCategoriesValidator, validate, index);

// Public: get a single category
categoryRoutes.get('/:id', categoryIdParam, validate, show);

// Protected: create a new category (Admin only)
categoryRoutes.post('/',
  authRequired, requireRole('Admin'),
  createCategoryValidator, validate, store
);

// Protected: update a category (Admin only)
categoryRoutes.put('/:id',
  authRequired, requireRole('Admin'),
  categoryIdParam, updateCategoryValidator, validate, updateOne
);

// Protected: delete a category (Admin only)
categoryRoutes.delete('/:id',
  authRequired, requireRole('Admin'),
  categoryIdParam, validate, destroy
);
