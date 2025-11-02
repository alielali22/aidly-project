// scripts/setup.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { db } from '../src/config/db.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const schemaPath = path.resolve(__dirname, '../database/schema.sql');

  if (!fs.existsSync(schemaPath)) {
    console.error(`❌ schema.sql not found at: ${schemaPath}`);
    process.exit(1);
  }

  const sql = fs.readFileSync(schemaPath, 'utf8');

  console.log('🔧 Applying database schema...');
  // Use a single connection for the whole schema application
  const client = await db.connect();
  try {
    await client.query('BEGIN');
    await client.query(sql);
    await client.query('COMMIT');
    console.log('✅ Schema applied successfully.');
  } catch (e) {
    await client.query('ROLLBACK');
    console.error('❌ Failed to apply schema:', e);
    process.exit(1);
  } finally {
    client.release();
    await db.end();
  }
}

main().catch((e) => {
  console.error('❌ Unhandled error in setup:', e);
  process.exit(1);
});
