import dotenv from 'dotenv';
import express from 'express';
import { healthCheck } from './config/db.js';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';


// Routes
import { authRoutes } from './routes/authRoutes.js';
import { categoryRoutes } from './routes/categoryRoutes.js';
import { articleRoutes } from './routes/articleRoutes.js';
import { quizRoutes } from './routes/quizRoutes.js';
import { scoreRoutes } from './routes/scoreRoutes.js';
import { progressRoutes } from './routes/progressRoutes.js';
import { feedbackRoutes } from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();

app.set('trust proxy', 1);

app.use(helmet());
app.use(cors({ origin: true, credentials: true }));

app.use(rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100,            // 100 requests/min/IP
  standardHeaders: true,
  legacyHeaders: false
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));


/* ---------- Core settings ---------- */
app.set('trust proxy', 1);

/* ---------- Parsers ---------- */
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: false }));

/* ---------- Health ---------- */
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));
app.get('/health/db', async (_req, res) => {
  try {
    const ok = await healthCheck();
    res.status(ok ? 200 : 500).json({ ok });
  } catch {
    res.status(500).json({ ok: false });
  }
});

/* ---------- API routes (MOUNT BEFORE 404) ---------- */
app.use('/auth', authRoutes);
app.use('/categories', categoryRoutes);
app.use('/articles', articleRoutes);
app.use('/quizzes', quizRoutes);
app.use('/scores', scoreRoutes);
app.use('/progress', progressRoutes);
app.use('/feedback', feedbackRoutes);

/* ---------- Root ---------- */
app.get('/', (_req, res) => res.send('Aidly backend is running!'));

/* ---------- 404 (after all routes) ---------- */
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', path: req.originalUrl });
});

/* ---------- Central error handler (last) ---------- */
app.use((err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  if (process.env.NODE_ENV !== 'production') console.error(err);
  res.status(status).json({ error: message });
});

export { app };
