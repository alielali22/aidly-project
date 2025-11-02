import { Router } from 'express';
import { authRoutes } from './authRoutes.js';
import { categoryRoutes } from './categoryRoutes.js';
import { articleRoutes } from './articleRoutes.js';
import { quizRoutes } from './quizRoutes.js';
import { scoreRoutes } from './scoreRoutes.js';
import { progressRoutes } from './progressRoutes.js';
import { feedbackRoutes } from './feedbackRoutes.js';

export const router = Router();

router.use('/auth', authRoutes);
router.use('/categories', categoryRoutes);
router.use('/articles', articleRoutes);
router.use('/quizzes', quizRoutes);
router.use('/scores', scoreRoutes);
router.use('/progress', progressRoutes);
router.use('/feedback', feedbackRoutes);
