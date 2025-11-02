import { Router } from 'express';
import {
  forArticle, show, createQuiz, addQuestion,
  startAttempt, submitAttempt, removeQuiz
} from '../controllers/quizController.js';
import { authRequired } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/roles.js';
import { validate } from '../middlewares/validate.js';
import { quizIdParam, articleIdParam, createQuizValidator, addQuestionValidator, startAttemptValidator, submitAttemptValidator } from '../validators/quizValidator.js';

export const quizRoutes = Router();

// Public: list quizzes for a specific article
quizRoutes.get('/article/:articleId',
  articleIdParam, validate, forArticle
);

// Protected: get quiz with questions (user must be logged in to attempt)
quizRoutes.get('/:id',
  authRequired,
  quizIdParam, validate, show
);

// Protected: create a new quiz (Expert/Admin)
quizRoutes.post('/',
  authRequired, requireRole('Admin', 'Expert'),
  createQuizValidator, validate, createQuiz
);

// Protected: add a question to a quiz (Expert/Admin)
quizRoutes.post('/:quizId/questions',
  authRequired, requireRole('Admin', 'Expert'),
  addQuestionValidator, validate, addQuestion
);

// Protected: start a quiz attempt (Learner)
quizRoutes.post('/:id/attempts',
  authRequired,
  startAttemptValidator, validate, startAttempt
);

// Protected: submit a quiz attempt (Learner)
quizRoutes.post('/:id/attempts/:attemptId/submit',
  authRequired,
  submitAttemptValidator, validate, submitAttempt
);

// Protected: delete a quiz (Admin only)
quizRoutes.delete('/:id',
  authRequired, requireRole('Admin'),
  quizIdParam, validate, removeQuiz
);
