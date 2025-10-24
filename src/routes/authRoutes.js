import { Router } from 'express';
import { register, login, me } from '../controllers/authController.js';
import { authRequired } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { registerValidator, loginValidator } from '../validators/authValidator.js';

export const authRoutes = Router();

authRoutes.post('/register', registerValidator, validate, register);
authRoutes.post('/login',    loginValidator,    validate, login);
authRoutes.get('/me',        authRequired,                   me);
