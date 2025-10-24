import { body, param } from 'express-validator';

export const quizIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be positive integer')
];

export const articleIdParam = [
  param('articleId').toInt().isInt({ min: 1 }).withMessage('articleId must be positive integer')
];

export const createQuizValidator = [
  body('articleId').toInt().isInt({ min: 1 }).withMessage('articleId is required'),
  body('question').trim().notEmpty().withMessage('question is required'),
  body('optionA').trim().notEmpty().withMessage('optionA is required'),
  body('optionB').trim().notEmpty().withMessage('optionB is required'),
  body('optionC').trim().notEmpty().withMessage('optionC is required'),
  body('optionD').trim().notEmpty().withMessage('optionD is required'),
  body('correct')
    .trim()
    .isIn(['A','B','C','D']).withMessage('correct must be A, B, C, or D')
];
