# 🩺 Aidly – Backend

Aidly is an educational and assistance platform focused on delivering accessible first-aid information and interactive learning tools.  
This repository contains the **backend** REST API built with **Node.js**, **Express**, and **PostgreSQL**.

---

## 🚀 Features

- 👤 **Authentication & Authorization**
  - Secure login & registration with JWT
  - Role-based access control (Admin, Expert, Learner)

- 📚 **Educational Content**
  - Manage Categories and Articles
  - Create interactive Quizzes per article

- 🧠 **User Interaction**
  - Track Scores and Learning Progress
  - Provide Feedback and Ratings

- 🛡 **Security**
  - Input validation using `express-validator`
  - Password hashing with `bcrypt`
  - Rate limiting & Helmet for HTTP security headers

- 💾 **Database**
  - PostgreSQL with schema auto-load and seed script
  - Modular structure for scalability

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Language** | Node.js (ES Modules) |
| **Framework** | Express.js |
| **Database** | PostgreSQL (via pg & pgAdmin) |
| **Validation** | express-validator |
| **Authentication** | JWT + bcrypt |
| **Security** | Helmet, Rate Limiter, CORS |
| **Dev Tools** | Nodemon, dotenv, Git |

---

## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/alielali22/aidly-project.git
cd aidly-project
