import { body, param, query } from 'express-validator';

export const listCategoriesValidator = [
  query('search').optional().isString().withMessage('search must be a string'),
  query('limit').optional().toInt().isInt({ min: 1, max: 100 }).withMessage('limit must be 1–100'),
  query('offset').optional().toInt().isInt({ min: 0 }).withMessage('offset must be >= 0')
];

export const categoryIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be a positive integer')
];

export const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isLength({ max: 100 }).withMessage('name must be at most 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 10000 }).withMessage('description is too long (max 10000 chars)')
];

export const updateCategoryValidator = [
  body('name')
    .optional()
    .trim().notEmpty().withMessage('name cannot be empty')
    .isLength({ max: 100 }).withMessage('name must be at most 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 10000 }).withMessage('description is too long')
];
