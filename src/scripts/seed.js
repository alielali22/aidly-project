import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcrypt';
import { db } from '../src/config/db.js';

async function main() {
  console.log('Seeding database...');

  // Ensure roles exist
  await db.query(`
    INSERT INTO roles (role_name) VALUES ('Admin'), ('Expert'), ('Learner')
    ON CONFLICT (role_name) DO NOTHING
  `);

  // Create admin if not exists
  const adminEmail = 'admin@aidly.local';
  const adminPass = 'Admin123!';
  const rounds = Number(process.env.BCRYPT_ROUNDS || 10);
  const hash = await bcrypt.hash(adminPass, rounds);

  const { rows: existing } = await db.query('SELECT id FROM users WHERE email = $1', [adminEmail]);
  let adminId;
  if (existing.length === 0) {
    const { rows } = await db.query(`
      INSERT INTO users (name, email, password, role_id)
      SELECT $1, $2, $3, id FROM roles WHERE role_name = 'Admin'
      RETURNING id
    `, ['Admin', adminEmail, hash]);
    adminId = rows[0].id;
    console.log(`Admin created: ${adminEmail} / ${adminPass}`);
  } else {
    adminId = existing[0].id;
    console.log(`Admin already exists: ${adminEmail}`);
  }

  // Sample category
  const { rows: catRows } = await db.query(`
    INSERT INTO categories (name, description)
    VALUES ('CPR', 'Cardiopulmonary resuscitation basics')
    ON CONFLICT (name) DO UPDATE SET description = EXCLUDED.description
    RETURNING id
  `);
  const categoryId = catRows[0].id;

  // Sample article
  const { rows: artRows } = await db.query(`
    INSERT INTO articles (title, content, category_id, author_id, read_time_minutes)
    VALUES ($1,$2,$3,$4,5)
    ON CONFLICT DO NOTHING
    RETURNING id
  `, [
    'How to perform CPR',
    '1) Check responsiveness. 2) Call emergency. 3) Start compressions...',
    categoryId,
    adminId
  ]);
  const articleId = artRows[0]?.id || (await db.query('SELECT id FROM articles WHERE title = $1', ['How to perform CPR'])).rows[0].id;

  // Sample quiz
  await db.query(`
    INSERT INTO quizzes (article_id, question, optiona, optionb, optionc, optiond, correct)
    VALUES ($1,$2,$3,$4,$5,$6,'B')
    ON CONFLICT DO NOTHING
  `, [
    articleId,
    'What is the first step of CPR?',
    'Call for help',
    'Check responsiveness',
    'Give two breaths',
    'Start compressions'
  ]);

  console.log('Seed complete.');
  process.exit(0);
}

main().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
