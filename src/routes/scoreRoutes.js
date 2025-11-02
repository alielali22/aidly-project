import { Router } from 'express';
import { create, mine, updateScore } from '../controllers/scoreController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { scoreTargetGuard } from '../middlewares/scoreTargetGuard.js';
import { createScoreValidator, updateScoreValidator } from '../validators/scoreValidator.js';

export const scoreRoutes = Router();

// Admin-only: manually submit / override a score
scoreRoutes.post('/',
  authRequired,
  requireRole('admin'),
  createScoreValidator,
  validate,
  scoreTargetGuard,  
  create
);

// Admin-only: edit an existing score
scoreRoutes.patch('/:id',
  authRequired,
  requireRole('admin'),
  updateScoreValidator,
  validate,
  updateScore
);

// Learner: get own score history
scoreRoutes.get('/me',
  authRequired,
  mine
);
