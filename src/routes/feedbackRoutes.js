import { Router } from 'express';
import { listForArticle, create, moderate } from '../controllers/feedbackController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { articleIdParam, feedbackIdParam, createFeedbackValidator, moderateFeedbackValidator } from '../validators/feedbackValidator.js';

export const feedbackRoutes = Router();

// Public: get all visible feedback for an article
feedbackRoutes.get('/article/:articleId',
  articleIdParam, validate, listForArticle
);

// Protected: post a new feedback (must be logged in)
feedbackRoutes.post('/',
  authRequired,
  createFeedbackValidator, validate, create
);

// Protected: moderate feedback visibility (Expert/Admin)
feedbackRoutes.put('/:id/moderate',
  authRequired, requireRole('Admin', 'Expert'),
  feedbackIdParam, moderateFeedbackValidator, validate, moderate
);
