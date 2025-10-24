import { Router } from 'express';
import { upsert, mine } from '../controllers/progressController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { upsertProgressValidator } from '../validators/progressValidator.js';

export const progressRoutes = Router();

// upsert progress for an article (protected)
progressRoutes.post('/', authRequired, upsertProgressValidator, validate, upsert);

// my progress (protected)
progressRoutes.get('/me', authRequired, mine);
