// scripts/seed.js
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { db } from '../src/config/db.js';

dotenv.config();

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '10', 10);

async function seed() {
  const client = await db.connect();
  try {
    console.log('🌱 Starting seed...');
    await client.query('BEGIN');

    /* ---------- Roles ---------- */
    const roles = ['Admin', 'Expert', 'Learner'];
    for (const roleName of roles) {
      await client.query(
        `INSERT INTO roles (role_name)
         VALUES ($1)
         ON CONFLICT (role_name) DO NOTHING`,
        [roleName]
      );
    }

    const { rows: roleRows } = await client.query(`SELECT id, role_name FROM roles`);
    const roleMap = Object.fromEntries(roleRows.map(r => [r.role_name, r.id]));
    if (!roleMap.Admin || !roleMap.Expert || !roleMap.Learner) {
      throw new Error('Missing one or more required roles (Admin, Expert, Learner)');
    }

    /* ---------- Admin User ---------- */
    const adminEmail = 'admin@example.com';
    const adminPassword = await bcrypt.hash('adminpass123', SALT_ROUNDS);

    await client.query(
      `INSERT INTO users (name, email, password, role_id, avatar_url)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING`,
      ['Admin User', adminEmail, adminPassword, roleMap.Admin, 'https://i.pravatar.cc/150?img=1']
    );

    const { rows: adminRows } = await client.query(
      `SELECT id FROM users WHERE email = $1`,
      [adminEmail]
    );
    if (!adminRows[0]) throw new Error('Failed to create or fetch admin user');
    const adminId = adminRows[0].id;

    /* ---------- Categories ---------- */
    const categories = [
      { name: 'Burns',    description: 'Treating burns effectively' },
      { name: 'Bleeding', description: 'Managing bleeding wounds'  }
    ];

    for (const c of categories) {
      await client.query(
        `INSERT INTO categories (category_name, description)
         VALUES ($1, $2)
         ON CONFLICT (category_name) DO NOTHING`,
        [c.name, c.description]
      );
    }

    const { rows: catRows } = await client.query(`SELECT id, category_name FROM categories`);
    const catMap = Object.fromEntries(catRows.map(c => [c.category_name, c.id]));
    const burnsCategoryId = catMap['Burns'];
    if (!burnsCategoryId) throw new Error('Missing Burns category');

    /* ---------- Article ---------- */
    const articleTitle = 'How to Treat First Degree Burns';
    const { rows: articleCheck } = await client.query(
      `SELECT id FROM articles WHERE title = $1 LIMIT 1`,
      [articleTitle]
    );

    let articleId;
    if (articleCheck[0]) {
      articleId = articleCheck[0].id;
    } else {
      const { rows } = await client.query(
        `INSERT INTO articles (title, content, category_id, created_by, read_time_minutes, media_url)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING id`,
        [
          articleTitle,
          'Cool the burn with running water for 10–20 minutes. Do not apply ice. Cover with sterile non-adhesive bandage. Seek medical attention if needed.',
          burnsCategoryId,
          adminId,
          4,
          'https://via.placeholder.com/640x480.png?text=Burn+Treatment'
        ]
      );
      articleId = rows[0].id;
    }

    /* ---------- Quiz (structure: quizzes -> quiz_questions -> quiz_options) ---------- */
    // Create quiz for the article (idempotent by (article_id, title))
    const quizTitle = 'First Degree Burns Basics';
    const { rows: quizExisting } = await client.query(
      `SELECT id FROM quizzes WHERE article_id = $1 AND title = $2 LIMIT 1`,
      [articleId, quizTitle]
    );

    let quizId;
    if (quizExisting[0]) {
      quizId = quizExisting[0].id;
    } else {
      const { rows } = await client.query(
        `INSERT INTO quizzes (article_id, title, created_by)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [articleId, quizTitle, adminId]
      );
      quizId = rows[0].id;
    }

    // Create a canonical question (idempotent by checking body existence in that quiz)
    const qBody = 'What should you never apply directly to a burn?';
    const { rows: qExisting } = await client.query(
      `SELECT id FROM quiz_questions WHERE quiz_id = $1 AND body = $2 LIMIT 1`,
      [quizId, qBody]
    );

    let questionId;
    if (qExisting[0]) {
      questionId = qExisting[0].id;
    } else {
      const { rows } = await client.query(
        `INSERT INTO quiz_questions (quiz_id, body, explanation)
         VALUES ($1, $2, $3)
         RETURNING id`,
        [
          quizId,
          qBody,
          'Cold running water can help, but ice directly on skin can worsen tissue damage.'
        ]
      );
      questionId = rows[0].id;
    }

    // Insert options if none exist yet for this question
    const { rows: existingOptions } = await client.query(
      `SELECT id FROM quiz_options WHERE question_id = $1 LIMIT 1`,
      [questionId]
    );

    if (!existingOptions[0]) {
      const options = [
        { body: 'Running cold water', isCorrect: false },
        { body: 'Antibiotic ointment', isCorrect: false },
        { body: 'Ice directly', isCorrect: true  },
        { body: 'Sterile gauze', isCorrect: false }
      ];
      for (const opt of options) {
        await client.query(
          `INSERT INTO quiz_options (question_id, body, is_correct)
           VALUES ($1, $2, $3)`,
          [questionId, opt.body, opt.isCorrect]
        );
      }
    }

    await client.query('COMMIT');
    console.log('✅ Seed complete');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Seed failed:', err);
    process.exit(1);
  } finally {
    client.release();
    await db.end();
  }
}

seed();
