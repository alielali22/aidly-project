import { Router } from 'express';
import { create, forArticle } from '../controllers/feedbackController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { createFeedbackValidator, articleIdParam } from '../validators/feedbackValidator.js';

export const feedbackRoutes = Router();

// public read
feedbackRoutes.get('/article/:articleId', articleIdParam, validate, forArticle);

// protected write
feedbackRoutes.post('/', authRequired, createFeedbackValidator, validate, create);
