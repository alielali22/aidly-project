import { Router } from 'express';
import { create, forArticle, show, destroy } from '../controllers/quizController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { createQuizValidator, articleIdParam, quizIdParam } from '../validators/quizValidator.js';

export const quizRoutes = Router();

/** public reads */
quizRoutes.get('/article/:articleId', articleIdParam, validate, forArticle);
quizRoutes.get('/:id',                 quizIdParam,    validate, show);

/** protected writes: Admin/Expert */
quizRoutes.post('/',     authRequired, requireRole(['Admin','Expert']), createQuizValidator, validate, create);
quizRoutes.delete('/:id',authRequired, requireRole(['Admin','Expert']), quizIdParam,         validate, destroy);
