import { body, param, query } from 'express-validator';

export const listArticlesValidator = [
  query('categoryId').optional().toInt().isInt({ min: 1 }).withMessage('categoryId must be a positive integer'),
  query('search').optional().isString().withMessage('search must be a string'),
  query('limit').optional().toInt().isInt({ min: 1, max: 50 }).withMessage('limit must be between 1 and 50'),
  query('offset').optional().toInt().isInt({ min: 0 }).withMessage('offset must be >= 0')
];

export const articleIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be a positive integer')
];

export const createArticleValidator = [
  body('title')
    .trim()
    .notEmpty().withMessage('title is required')
    .isLength({ min: 4 }).withMessage('title must be at least 4 characters long'),
  body('content')
    .trim()
    .notEmpty().withMessage('content is required')
    .isLength({ min: 10 }).withMessage('content must be at least 10 characters long'),
  body('categoryId')
    .toInt()
    .isInt({ min: 1 }).withMessage('categoryId is required and must be a positive integer'),
  body('readTimeMinutes')
    .optional()
    .toInt().isInt({ min: 1, max: 180 }).withMessage('readTimeMinutes must be between 1 and 180'),
  body('mediaUrl')
    .optional()
    .trim()
    .isURL().withMessage('mediaUrl must be a valid URL')
];

export const updateArticleValidator = [
  body('title')
    .optional()
    .trim().notEmpty().withMessage('title cannot be empty')
    .isLength({ min: 4 }).withMessage('title must be at least 4 characters long'),
  body('content')
    .optional()
    .trim().notEmpty().withMessage('content cannot be empty')
    .isLength({ min: 10 }).withMessage('content must be at least 10 characters long'),
  body('categoryId')
    .optional()
    .toInt().isInt({ min: 1 }).withMessage('categoryId must be a positive integer'),
  body('readTimeMinutes')
    .optional()
    .toInt().isInt({ min: 1, max: 180 }).withMessage('readTimeMinutes must be between 1 and 180'),
  body('mediaUrl')
    .optional()
    .trim().isURL().withMessage('mediaUrl must be a valid URL')
];
