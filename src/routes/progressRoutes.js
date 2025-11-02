import { Router } from 'express';
import { upsert, mine } from '../controllers/progressController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { upsertProgressValidator } from '../validators/progressValidator.js';

export const progressRoutes = Router();

// Protected: update progress for an article (Learner)
progressRoutes.put('/',
  authRequired,
  upsertProgressValidator, validate, upsert
);

// Protected: get current user's progress entries
progressRoutes.get('/me',
  authRequired, 
  mine
);
