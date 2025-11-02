import { body, param } from 'express-validator';

export const quizIdParam = [
  param('id').toInt().isInt({ min: 1 }).withMessage('id must be a positive integer')
];

export const articleIdParam = [
  param('articleId').toInt().isInt({ min: 1 }).withMessage('articleId must be a positive integer')
];

export const createQuizValidator = [
  body('articleId')
    .toInt().isInt({ min: 1 }).withMessage('articleId is required'),
  body('title')
    .trim().isLength({ min: 3 }).withMessage('title must be at least 3 characters long')
];

export const addQuestionValidator = [
  param('quizId').toInt().isInt({ min: 1 }).withMessage('quizId must be a positive integer'),
  body('body')
    .trim().isLength({ min: 5 }).withMessage('question text must be at least 5 characters'),
  body('options')
    .isArray({ min: 2 }).withMessage('options must be an array with at least 2 entries'),
  body('options.*.body')
    .isString().withMessage('each option must have a text body'),
  body('options.*.isCorrect')
    .isBoolean().withMessage('each option must have an isCorrect boolean'),
  body('options').custom(opts => {
    const correctCount = opts.filter(o => o.isCorrect).length;
    return correctCount === 1;
  }).withMessage('exactly one option must be marked as correct')
];

export const startAttemptValidator = [
  param('id').toInt().isInt({ min: 1 }).withMessage('quizId must be a positive integer')
];

export const submitAttemptValidator = [
  param('id').toInt().isInt({ min: 1 }).withMessage('quizId must be a positive integer'),
  param('attemptId').toInt().isInt({ min: 1 }).withMessage('attemptId must be a positive integer'),
  body('answers')
    .isArray({ min: 1 }).withMessage('answers must be a non-empty array'),
  body('answers.*.questionId')
    .toInt().isInt({ min: 1 }).withMessage('each answer must include a valid questionId'),
  body('answers.*.optionId')
    .toInt().isInt({ min: 1 }).withMessage('each answer must include a valid optionId'),
  body('timeTakenSeconds')
    .optional().toInt().isInt({ min: 0 }).withMessage('timeTakenSeconds must be >= 0')
];
