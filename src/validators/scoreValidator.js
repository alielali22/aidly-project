import { body } from 'express-validator';

export const createScoreValidator = [
  body('quizId').toInt().isInt({ min: 1 }).withMessage('quizId is required'),
  body('score').toInt().isInt({ min: 0 }).withMessage('score must be >= 0'),
  body('total').toInt().isInt({ min: 1 }).withMessage('total must be >= 1'),
  body('timeTakenSeconds').optional().toInt().isInt({ min: 0 }).withMessage('timeTakenSeconds must be >= 0'),
  body().custom(({ score, total }) => {
    if (score != null && total != null && Number(score) > Number(total)) {
      throw new Error('score cannot exceed total');
    }
    return true;
  })
];
