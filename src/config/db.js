import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Resolve __dirname manually (since ES modules don’t have it by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection pool
export const db = new Pool({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});

// Health Check function — confirms DB connectivity
export async function healthCheck() {
  try {
    const res = await db.query('SELECT NOW()');
    return !!res.rows.length;
  } catch (err) {
    console.error('Database health check failed:', err.message);
    return false;
  }
}

//Load database schema from /database/schema.sql
try {
  const schemaPath = path.resolve(__dirname, '../../database/schema.sql');
  const schemaSQL = fs.readFileSync(schemaPath, 'utf8');

  // Run schema only once at startup
  db.query(schemaSQL)
    .then(() => console.log('Database schema loaded successfully'))
    .catch((err) => console.error('Error loading schema:', err.message));
} catch (fileErr) {
  console.error('Could not read schema.sql file:', fileErr.message);
}
