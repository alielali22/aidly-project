import { body, param, query } from 'express-validator';

export const listCategoriesValidator = [
  query('limit').optional().toInt().isInt({ min: 1, max: 200 }).withMessage('limit 1..200'),
  query('offset').optional().toInt().isInt({ min: 0 }).withMessage('offset >= 0')
];

export const categoryIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be positive integer')
];

export const createCategoryValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isLength({ max: 100 }).withMessage('name must be <= 100 chars'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 10000 }).withMessage('description too long')
];

export const updateCategoryValidator = [
  body('name')
    .optional()
    .trim()
    .notEmpty().withMessage('name cannot be empty')
    .isLength({ max: 100 }).withMessage('name must be <= 100 chars'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 10000 }).withMessage('description too long')
];
