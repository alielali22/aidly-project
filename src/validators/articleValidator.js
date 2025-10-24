import { body, param, query } from 'express-validator';

export const listArticlesValidator = [
  query('categoryId').optional().toInt().isInt({ min: 1 }).withMessage('categoryId must be positive integer'),
  query('limit').optional().toInt().isInt({ min: 1, max: 200 }).withMessage('limit 1..200'),
  query('offset').optional().toInt().isInt({ min: 0 }).withMessage('offset >= 0')
];

export const articleIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be positive integer')
];

export const createArticleValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('title is required')
    .isLength({ max: 255 }).withMessage('title must be <= 255 chars'),
  body('content')
    .trim()
    .notEmpty().withMessage('content is required'),
  body('categoryId')
    .toInt()
    .isInt({ min: 1 }).withMessage('categoryId must be positive integer'),
  body('readTimeMinutes')
    .optional()
    .toInt()
    .isInt({ min: 1, max: 180 }).withMessage('readTimeMinutes 1..180'),
  body('mediaUrl')
    .optional()
    .trim()
    .isURL().withMessage('mediaUrl must be a valid URL')
];

export const updateArticleValidator = [
  body('title').optional().trim().notEmpty().withMessage('title cannot be empty').isLength({ max: 255 }),
  body('content').optional().trim().notEmpty().withMessage('content cannot be empty'),
  body('categoryId').optional().toInt().isInt({ min: 1 }),
  body('readTimeMinutes').optional().toInt().isInt({ min: 1, max: 180 }),
  body('mediaUrl').optional().trim().isURL().withMessage('mediaUrl must be a valid URL')
];
