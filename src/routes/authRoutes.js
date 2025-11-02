import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';

export const authRoutes = Router();

// Public: register a new user
authRoutes.post('/register', registerValidator, validate, register);

// Public: log in and receive a token
authRoutes.post('/login', loginValidator, validate, login);

// Protected: get current user profile
authRoutes.get('/me', authRequired, me);
