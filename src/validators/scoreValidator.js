import { body } from 'express-validator';

export const createScoreValidator = [
  body('quizId')
    .isInt({ min: 1 }).withMessage('quizId is required')
    .toInt(),

  // Optional: let admins target a specific learner; defaults to self if omitted.
  body('userId')
    .optional()
    .isInt({ min: 1 }).withMessage('userId must be a positive integer')
    .toInt(),

  body('score')
    .isInt({ min: 0 }).withMessage('score must be a non-negative integer')
    .toInt(),

  body('total')
    .isInt({ min: 1 }).withMessage('total must be at least 1')
    .toInt(),

  body('timeTakenSeconds')
    .optional()
    .isInt({ min: 0 }).withMessage('timeTakenSeconds must be >= 0')
    .toInt(),

  body().custom(({ score, total }) => {
    if (score != null && total != null && Number(score) > Number(total)) {
      throw new Error('score cannot exceed total');
    }
    return true;
  })
];

export const updateScoreValidator = [
  body('score')
    .isInt({ min: 0 }).withMessage('score must be a non-negative integer')
    .toInt(),
  body('total')
    .isInt({ min: 1 }).withMessage('total must be at least 1')
    .toInt(),
  body('timeTakenSeconds')
    .optional()
    .isInt({ min: 0 }).withMessage('timeTakenSeconds must be >= 0')
    .toInt(),
  body().custom(({ score, total }) => {
    if (score != null && total != null && Number(score) > Number(total)) {
      throw new Error('score cannot exceed total');
    }
    return true;
  })
];
