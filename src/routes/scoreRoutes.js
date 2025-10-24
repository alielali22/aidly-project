import { Router } from 'express';
import { create, mine } from '../controllers/scoreController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createScoreValidator } from '../validators/scoreValidator.js';

export const scoreRoutes = Router();

// submit a score (protected)
scoreRoutes.post('/', authRequired, createScoreValidator, validate, create);

// my scores (protected)
scoreRoutes.get('/me', authRequired, mine);
