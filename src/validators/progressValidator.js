import { body } from 'express-validator';

const STATUSES = ['Not Started', 'In Progress', 'Completed'];

export const upsertProgressValidator = [
  body('articleId').toInt().isInt({ min: 1 }).withMessage('articleId is required'),
  body('status').trim().isIn(STATUSES).withMessage(`status must be one of ${STATUSES.join(', ')}`),
  body('percentRead').optional().toInt().isInt({ min: 0, max: 100 }).withMessage('percentRead must be 0..100')
];
