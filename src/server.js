import dotenv from 'dotenv';
import { app } from './app.js';

dotenv.config(); // ensure PORT and other envs are available here too

const PORT = Number(process.env.PORT) || 4000;
let server = null;

/* ---------- Start server ---------- */
server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* ---------- Graceful shutdown ---------- */
const shutdown = (signal) => {
  console.log(`\n${signal} received. Shutting down gracefully...`);

  if (!server) process.exit(0);

  server.close((err) => {
    if (err) {
      console.error('Error while closing server:', err);
      process.exit(1);
    }
    console.log('Server closed. Bye! 👋');
    process.exit(0);
  });

  // Force-exit if something hangs
  setTimeout(() => {
    console.warn('Forcing shutdown after 10s');
    process.exit(1);
  }, 10_000).unref();
};

process.on('SIGINT', () => shutdown('SIGINT'));   // Ctrl+C
process.on('SIGTERM', () => shutdown('SIGTERM')); // container/host stop

/* ---------- Safety nets ---------- */
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
  shutdown('unhandledRejection');
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  shutdown('uncaughtException');
});