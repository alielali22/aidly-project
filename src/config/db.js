import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

export const db = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : undefined,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000
});

/**
 * Simple query helper using the shared pool.
 */
export async function query(text, params) {
  return db.query(text, params);
}

/**
 * Transaction helper used by services (a.k.a. withTransaction/tx).
 * Usage:
 *   await withTransaction(async (client) => {
 *     await client.query('SQL', [params]);
 *     return result;
 *   });
 */
export async function withTransaction(run) {
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    const res = await run(client);
    await client.query('COMMIT');
    return res;
  } catch (err) {
    try { await client.query('ROLLBACK'); } catch {}
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Lightweight health check for /health
 */
export async function healthCheck() {
  try {
    const { rows } = await db.query('SELECT 1::int AS ok');
    return Number(rows[0]?.ok) === 1;
  } catch (err) {
    // Optional: log the reason health failed (useful during setup)
    if (process.env.NODE_ENV !== 'production') {
      console.error('DB health check failed:', err.message);
    }
    return false;
  }
}
