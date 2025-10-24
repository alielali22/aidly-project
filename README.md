<p align="center">
  <img src="https://github.com/alielali22/aidly-project/blob/main/logo_aidly.png?raw=true" width="140" alt="Aidly Logo">
</p>

<h1 align="center">🩹 Aidly Backend API</h1>

<p align="center">
  <b>Empowering first-aid learning through accessible education and interactive tools.</b><br>
  Built with <b>Node.js</b>, <b>Express</b>, and <b>PostgreSQL</b>.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#project-structure">Project Structure</a> •
  <a href="#installation--setup">Installation</a> •
  <a href="#usage--running-the-app">Usage</a> •
  <a href="#api-testing-with-postman">API Testing</a> •
  <a href="#git--version-control">Git & Version Control</a> •
  <a href="#license">License</a>
</p>

---

## 🌟 Overview

**Aidly** is a backend API that powers a first-aid learning platform.  
It provides a structured system for user roles (Admin, Expert, Learner), educational content (articles & quizzes), and progress tracking.  
This backend serves as the foundation for the future front-end web or mobile app.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - JWT-based login and registration
  - Secure password hashing with `bcrypt`
  - Role-based access control (Admin, Expert, Learner)

- 📚 **Educational Content**
  - Manage first-aid categories and articles
  - Take and submit quizzes
  - Track learner progress and scores

- 🗃️ **Database Management**
  - PostgreSQL via `pgAdmin`
  - Organized schema with clear relationships

- 🧩 **Clean Architecture**
  - Modular structure (controllers, services, domain, routes, validators)
  - Environment-driven configuration (`.env`)

---

## 🏗️ Project Structure
aidly-project/
├── database/ # SQL schemas & setup scripts
├── src/
│ ├── config/ # Database & environment config
│ ├── controllers/ # Request handling logic
│ ├── domain/ # Entities, DTOs, repositories
│ ├── middlewares/ # Auth, error, and role validation
│ ├── routes/ # Express route definitions
│ ├── services/ # Core business logic
│ ├── validators/ # Input validation with Joi/custom
│ ├── app.js # Express app configuration
│ └── server.js # Server start file
├── .env # Environment variables (not tracked by Git)
├── .gitignore # Ignored files (node_modules, env)
├── package.json
└── README.md



---


---

## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

Make sure you have installed:
- [Node.js](https://nodejs.org/en/) (v18 or later)
- [PostgreSQL](https://www.postgresql.org/)
- [pgAdmin 4](https://www.pgadmin.org/download/)
- [Git](https://git-scm.com/)
- [Postman](https://www.postman.com/downloads/) (for testing)

---

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/alielali22/aidly-project.git
cd aidly-project

3️⃣ Install Dependencies
npm install

4️⃣ Configure the Database

Open pgAdmin

Create a new database called aidly_db

Make sure PostgreSQL is running on localhost:5432

5️⃣ Set Up Environment Variables

Create a .env file in the project root:

# Server Configuration
PORT=4000
NODE_ENV=development

# Database Configuration
PGHOST=localhost
PGPORT=5432
PGDATABASE=aidly_db
PGUSER=postgres
PGPASSWORD=postgres

6️⃣ Run the Server

Development mode (auto-restart using nodemon):

npm run dev


If successful, you should see:

Server running on port 4000


Now visit:
👉 http://localhost:4000

🧠 Usage & Running the App
API Endpoints (Base URL: http://localhost:4000)
Method	Endpoint	Description
GET	/health	Check if the server is running
GET	/health/db	Check database connection
POST	/auth/register	Register new user
POST	/auth/login	Login user and return JWT
GET	/categories	Retrieve all categories
POST	/categories	Add new category (Admin/Expert)
GET	/articles	Get all articles
POST	/articles	Add new article (Admin/Expert)
GET	/quiz	Retrieve quizzes (Learner)
POST	/quiz/submit	Submit answers & get score
🧪 API Testing with Postman

Open Postman

Create a new request:

Example:

Method: GET

URL: http://localhost:4000/health

Click Send → you should see:

{ "ok": true }


Repeat for /auth/register, /auth/login, /categories, etc.

🧰 Git & Version Control
Initialize (already done)
git init

Add and Commit Changes
git add .
git commit -m "feat: add new route"

Push to GitHub
git push

Pull Latest Updates
git pull

📦 Environment & Security
✅ Environment Variables

Keep your .env private — Git will ignore it automatically (check .gitignore).

🔐 Security Tips

Never push .env or database credentials.

Use HTTPS in production.

Always validate inputs (handled via validators).

🧩 Tech Stack
Layer	Technology
Backend Framework	Node.js + Express
Database	PostgreSQL
ORM / Client	pg (native driver)
Authentication	JWT + bcrypt
Testing	Postman
Version Control	Git + GitHub
🧠 Future Enhancements

🧾 Add leaderboard for quiz results

📈 Integrate progress tracking per learner

💬 Expert feedback system

🌐 Frontend (React.js or Next.js) integration

🤝 Contribution Guide

Want to contribute? Awesome! Here’s how:

Fork the repo

Create a new branch

git checkout -b feature-name


Commit your changes

git commit -m "feat: add new feature"


Push and open a pull request

git push origin feature-name

<p align="center"> Made with ❤️ by <a href="https://github.com/alielali22">Ali El Ali</a> </p> ```