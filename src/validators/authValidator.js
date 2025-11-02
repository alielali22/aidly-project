import { body } from 'express-validator';

export const registerValidator = [
  body('name')
    .trim()
    .notEmpty().withMessage('name is required')
    .isLength({ min: 2, max: 100 }).withMessage('name must be 2–100 characters long'),
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email must be a valid email address')
    .isLength({ max: 255 }).withMessage('email is too long (max 255 chars)'),
  body('password')
    .notEmpty().withMessage('password is required')
    .isLength({ min: 8 }).withMessage('password must be at least 8 characters long'),
  body('roleName')
    .optional()
    .trim()
    .isIn(['Admin', 'Expert', 'Learner']).withMessage('roleName must be Admin, Expert, or Learner')
];

export const loginValidator = [
  body('email')
    .trim()
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('email must be valid'),
  body('password')
    .notEmpty().withMessage('password is required')
];
