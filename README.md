<p align="center">
  <img src="https://github.com/alielali22/aidly-project/blob/main/logo_aidly.png?raw=true" width="260" alt="Aidly Logo">
</p>

<h1 align="center">🩹 Aidly Backend API</h1>

<p align="center">
  <b>Empowering first-aid learning through structured education, interactive quizzes, and expert-driven content.</b><br>
  Built with <b>Node.js</b>, <b>Express</b>, and <b>PostgreSQL</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express">
  <img src="https://img.shields.io/badge/PostgreSQL-blue?logo=postgresql">
  <img src="https://img.shields.io/badge/Tested%20With-Postman-orange?logo=postman">
  <img src="https://img.shields.io/badge/Status-Active-success">
</p>

---

## 🌟 Overview

**Aidly** is the backend API for a modern **first-aid education platform**.  
It powers role-based learning experiences for **Admins**, **Experts**, and **Learners**, providing category-driven articles, quizzes, and progress tracking.  

Built with scalability, clarity, and maintainability in mind, this API forms the foundation for a future web or mobile frontend.

---

## 🗂 Project Structure

```

aidly-project/
├─ database/
│  └─ schema.sql
├─ postman/
│  ├─ Aidly API.postman_collection.json
│  └─ Aidly Local.postman_environment.json
├─ src/
│  ├─ config/
│  ├─ controllers/
│  ├─ domain/
│  │  ├─ dto/
│  │  ├─ entities/
│  │  └─ repositories/
│  ├─ middlewares/
│  ├─ routes/
│  ├─ services/
│  ├─ validators/
│  ├─ app.js
│  └─ server.js
├─ .env
├─ .gitignore
├─ package.json
└─ README.md

````

**Layer Overview**
- **Controllers:** Handle HTTP requests and responses  
- **Services:** Business logic and transactions  
- **Repositories:** SQL access layer (PostgreSQL)  
- **DTOs:** Define structured data flow  
- **Middlewares:** Auth, role checks, and validation  
- **Validators:** Input validation via `express-validator`  
- **Routes:** Register all endpoints  
- **Postman:** Contains API testing collections  

---

## 🚀 Core Features

### 🔐 Authentication & Roles
- JWT-based authentication  
- Secure password hashing with **bcrypt**
- Role-based access:  
  - **Admin** → Full access  
  - **Expert** → Manage educational content  
  - **Learner** → Read & participate  

### 📚 Content Management
- Manage categories, articles, and quizzes  
- Full CRUD for Admins and Experts  
- Learners access approved educational content  

### 🧠 Quizzes & Scores
- Take quizzes linked to articles  
- Auto-graded attempts with instant results  
- Admins can manually edit or correct scores  

### 📊 Progress Tracking
- Learners view history and performance  
- Admins review and adjust scores  

---

## ⚙️ Setup Guide

### 1️⃣ Requirements
- Node.js 18+
- PostgreSQL (with pgAdmin recommended)
- Postman for testing

### 2️⃣ Installation
```bash
git clone https://github.com/alielali22/aidly-project.git
cd aidly-project
npm install
````

### 3️⃣ Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE aidly_db;
```

### 4️⃣ Environment Variables

Create a `.env` file:

```env
PORT=4000
NODE_ENV=development

PGHOST=localhost
PGPORT=5432
PGDATABASE=aidly_db
PGUSER=postgres
PGPASSWORD=postgres

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

### 5️⃣ Run the Server

```bash
npm run dev
```

Visit your API at 👉 **[http://localhost:4000/api](http://localhost:4000/api)**

---

## 🧠 API Overview

| Method         | Endpoint                      | Description           | Access        |
| -------------- | ----------------------------- | --------------------- | ------------- |
| **Auth**       |                               |                       |               |
| POST           | `/auth/register`              | Register new user     | Public        |
| POST           | `/auth/login`                 | Login & receive JWT   | Public        |
| GET            | `/auth/me`                    | Current user info     | Authenticated |
| **Categories** |                               |                       |               |
| GET            | `/categories`                 | List categories       | Public        |
| GET            | `/categories/:id`             | View category         | Public        |
| POST           | `/categories`                 | Create category       | Admin         |
| PUT            | `/categories/:id`             | Update category       | Admin         |
| DELETE         | `/categories/:id`             | Delete category       | Admin         |
| **Articles**   |                               |                       |               |
| GET            | `/articles`                   | List all articles     | Public        |
| GET            | `/articles/:id`               | View article details  | Public        |
| POST           | `/articles`                   | Create article        | Expert/Admin  |
| PUT            | `/articles/:id`               | Update article        | Expert/Admin  |
| DELETE         | `/articles/:id`               | Delete article        | Admin         |
| **Quizzes**    |                               |                       |               |
| GET            | `/quizzes/article/:articleId` | Get quiz for article  | Public        |
| POST           | `/quizzes/:id/questions`      | Add question to quiz  | Expert/Admin  |
| POST           | `/quizzes/:id/attempts`       | Start attempt         | Learner       |
| POST           | `/quizzes/:id/submit`         | Submit answers        | Learner       |
| DELETE         | `/quizzes/:id`                | Delete quiz           | Admin         |
| **Scores**     |                               |                       |               |
| GET            | `/scores/me`                  | View learner’s scores | Learner       |
| POST           | `/scores`                     | Add or override score | Admin         |
| PATCH          | `/scores/:id`                 | Edit score            | Admin         |

---

## 🧪 Postman Testing Setup

All endpoints are preconfigured for testing using the provided Postman files in the `/postman` folder.

### 📦 Files

* [`Aidly API.postman_collection.json`](postman/Aidly%20API.postman_collection.json) — all requests grouped by feature
* [`Aidly Local.postman_environment.json`](postman/Aidly%20Local.postman_environment.json) — local environment variables

### 🧭 Import Guide

1. Open **Postman**
2. Click **Import**
3. Select both JSON files
4. Activate the **Aidly Local** environment
5. Verify `base_url` is:

   ```
   http://localhost:4000/api
   ```

### 🧩 Environment Variables

| Variable    | Example                     | Description               |
| ----------- | --------------------------- | ------------------------- |
| `base_url`  | `http://localhost:4000/api` | Base API URL              |
| `token`     | (auto-set after login)      | JWT token                 |
| `articleId` | 1                           | Used for chained requests |
| `quizId`    | 3                           | Used for quiz testing     |

---

### 🚀 Recommended Testing Flow

1. **Auth**
   → Register, then login to obtain a JWT
2. **Categories**
   → Create, update, and delete a category
3. **Articles**
   → Add an article, then fetch by ID
4. **Quizzes**
   → Create a quiz, add questions, and submit attempts
5. **Scores**
   → Learner checks `/scores/me`
   → Admin tests `/scores/:id` for manual updates

---

### 🧰 Tips for Testing

* The **token** is automatically saved after login
* Use the **“Runner”** to execute multiple endpoints sequentially
* Check **Tests tab** for:

  ```js
  pm.test("Status is OK", () => pm.response.to.have.status(200));
  pm.test("Response time < 500ms", () => pm.expect(pm.response.responseTime).to.be.below(500));
  ```

---

## 🧱 Architecture Overview

* **Controllers:** Handle route logic and responses
* **Services:** Contain all business operations
* **Repositories:** Direct database queries (PostgreSQL)
* **DTOs:** Sanitize and structure data
* **Middlewares:** Handle auth and access control
* **Validators:** Manage field-level validation

---

## 🧱 Tech Stack

| Layer           | Technology        |
| --------------- | ----------------- |
| Runtime         | Node.js (ESM)     |
| Framework       | Express.js        |
| Database        | PostgreSQL        |
| Authentication  | JWT + bcrypt      |
| Validation      | express-validator |
| Testing         | Postman           |
| Version Control | Git + GitHub      |

---

## 🌐 Future Enhancements

* 🧾 Leaderboard for quiz scores
* 💬 Article feedback & moderation system
* 📊 Learner progress analytics dashboard
* 🌐 React.js or Next.js frontend integration
* 🔔 Notification and email service

---

## 🤝 Contribution Guide

```bash
# 1. Fork the repo
# 2. Create your feature branch
git checkout -b feature/amazing-feature

# 3. Commit changes
git commit -m "feat: add amazing feature"

# 4. Push and open a PR
git push origin feature/amazing-feature
```

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/alielali22">Ali El Ali</a>
</p>
```


