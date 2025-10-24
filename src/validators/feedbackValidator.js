import { body, param } from 'express-validator';

export const articleIdParam = [
  param('articleId').toInt().isInt({ min: 1 }).withMessage('articleId must be positive integer')
];

export const createFeedbackValidator = [
  body('articleId').toInt().isInt({ min: 1 }).withMessage('articleId is required'),
  body('comment').optional().trim().isLength({ min: 1 }).withMessage('comment cannot be empty'),
  body('rating').optional().toInt().isInt({ min: 1, max: 5 }).withMessage('rating must be 1..5'),
  body().custom(({ comment, rating }) => {
    if (!comment && rating == null) throw new Error('comment or rating is required');
    return true;
  })
];
