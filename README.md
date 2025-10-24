
<p align="center">
  <img src="https://github.com/alielali22/aidly-project/blob/main/logo_aidly.png?raw=true" width="280" alt="Aidly Logo">
</p>

<h1 align="center">🩹 Aidly Backend API</h1>

<p align="center">
  <b>Empowering first-aid learning through accessible education and interactive tools.</b><br>
  Built with <b>Node.js</b>, <b>Express</b>, and <b>PostgreSQL</b>.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-green?logo=node.js">
  <img src="https://img.shields.io/badge/Express.js-4.x-lightgrey?logo=express">
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue?logo=postgresql">
  <img src="https://img.shields.io/badge/License-MIT-yellow?logo=open-source-initiative">
</p>

---

## 🌟 Overview

**Aidly** is a backend API that powers a first-aid learning platform.  
It provides a structured system for user roles (**Admin**, **Expert**, **Learner**), educational content (**articles**, **categories**, **quizzes**), and progress tracking.  
This backend serves as the foundation for the front-end web or mobile app to be developed later.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - JWT-based login and registration
  - Secure password hashing with `bcrypt`
  - Role-based access control (Admin, Expert, Learner)

- 📚 **Educational Content**
  - Manage first-aid categories and articles
  - Interactive quizzes for learning evaluation
  - Learner progress and score tracking

- 🧱 **Database Integration**
  - PostgreSQL for structured and relational data
  - Managed easily via **pgAdmin**

- 🧩 **Modular Architecture**
  - Organized by controllers, services, domain, and routes
  - Clear separation between layers for scalability

---

## 🏗️ Project Structure

```

aidly-project/
├── database/              # SQL schemas & setup scripts
├── src/
│   ├── config/            # DB and environment config
│   ├── controllers/       # Route logic
│   ├── domain/            # Entities, DTOs, repositories
│   ├── middlewares/       # Auth, error handling, role validation
│   ├── routes/            # Express routes
│   ├── services/          # Business logic
│   ├── validators/        # Input validation
│   ├── app.js             # Express setup
│   └── server.js          # Server entry point
├── .env                   # Environment variables (ignored in Git)
├── .gitignore             # Files Git will ignore
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites
Ensure you have installed:
- [Node.js](https://nodejs.org/en/) v18+
- [PostgreSQL](https://www.postgresql.org/)
- [pgAdmin](https://www.pgadmin.org/download/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/downloads/) (for API testing)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/alielali22/aidly-project.git
cd aidly-project
````

---

### 3️⃣ Install Dependencies

```bash
npm install
```

---

### 4️⃣ Setup PostgreSQL Database

1. Open **pgAdmin**
2. Create a new database named `aidly_db`
3. Ensure PostgreSQL is running on:

   ```
   host: localhost
   port: 5432
   ```

---

### 5️⃣ Environment Variables

Create a `.env` file in the root directory:

```env
# Server
PORT=4000
NODE_ENV=development

# PostgreSQL Database
PGHOST=localhost
PGPORT=5432
PGDATABASE=aidly_db
PGUSER=postgres
PGPASSWORD=postgres
```

---

### 6️⃣ Run the Server

Development mode (auto-reload with `nodemon`):

```bash
npm run dev
```

Output example:

```
Server running on port 4000
```

Visit:
👉 [http://localhost:4000](http://localhost:4000)

---

## 🧠 Usage Guide

### Base URL

```
http://localhost:4000
```

### Main Endpoints

| Method | Endpoint         | Description                   | Access       |
| ------ | ---------------- | ----------------------------- | ------------ |
| GET    | `/health`        | Check if the server is online | Public       |
| GET    | `/health/db`     | Check DB connection           | Public       |
| POST   | `/auth/register` | Register new user             | Public       |
| POST   | `/auth/login`    | Login user and receive JWT    | Public       |
| GET    | `/categories`    | Get all categories            | Public       |
| POST   | `/categories`    | Create a new category         | Admin/Expert |
| GET    | `/articles`      | List all articles             | Public       |
| POST   | `/articles`      | Add new article               | Admin/Expert |
| GET    | `/quiz`          | Retrieve quizzes              | Learner      |
| POST   | `/quiz/submit`   | Submit quiz and get score     | Learner      |

---

## 🧪 API Testing with Postman

1. Open **Postman**
2. Create a request (example):

   * Method: `GET`
   * URL: `http://localhost:4000/health`
3. Click **Send**
4. You should see:

   ```json
   { "ok": true }
   ```

Then test other endpoints like `/auth/register` or `/auth/login` with JSON bodies.

---

## 🧰 Git & Version Control

### Initialize Git

```bash
git init
```

### Add & Commit Changes

```bash
git add .
git commit -m "feat: initial setup"
```

### Push to GitHub

```bash
git push
```

### Pull Updates

```bash
git pull
```

---

## 📦 Environment & Security

### ✅ Keep Sensitive Data Safe

* `.env` file is ignored by Git automatically
* Never upload your database password or JWT secrets
* Use strong passwords in production

### 🔒 Security Tips

* Always validate input data
* Use HTTPS in production
* Rotate database credentials periodically

---

## 🧩 Tech Stack

| Layer           | Technology                      |
| --------------- | ------------------------------- |
| Backend         | Node.js + Express               |
| Database        | PostgreSQL                      |
| ORM / Client    | `pg` (native PostgreSQL driver) |
| Authentication  | JWT + bcrypt                    |
| API Testing     | Postman                         |
| Version Control | Git + GitHub                    |

---

## 🧱 Future Enhancements

* 🧾 Leaderboard for quiz results
* 📈 Real-time learning progress tracking
* 💬 Expert Q&A and feedback system
* 🌐 React.js or Next.js frontend integration

---

## 🤝 Contribution Guide

Contributions are welcome!
Follow these steps to add improvements:

1. **Fork** the repository
2. **Create** a feature branch:

   ```bash
   git checkout -b feature-name
   ```
3. **Commit** your changes:

   ```bash
   git commit -m "feat: add new feature"
   ```
4. **Push** and **open a Pull Request**:

   ```bash
   git push origin feature-name
   ```

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/alielali22">Ali El Ali</a>
</p>
```

