import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { healthCheck } from './config/db.js';
import { router } from './routes/index.js';

export const app = express();

/* -------- Core middleware -------- */
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Rate limiter for auth routes (limit login/register attempts)
const authLimiter = rateLimit({ windowMs: 10 * 60 * 1000, max: 100 });
app.use('/auth', authLimiter);

/* -------- Health Check -------- */
app.get('/health', async (req, res) => {
  const ok = await healthCheck();
  res.status(ok ? 200 : 500).json({ ok });
});

/* -------- API Routes -------- */
app.use('/', router);

/* -------- 404 Handler -------- */
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

/* -------- Global Error Handler -------- */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') {
    console.error(err);
  }
  res.status(status).json({ error: message });
});
