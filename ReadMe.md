# 🧠 BrainyBot — AI Study Buddy

> An AI-powered study companion that helps students turn their study material into summaries, flashcards, and quizzes.

BrainyBot is my first full-stack project, built to explore how a modern web application connects the frontend, backend, database, authentication, file processing, and AI services together.

🚧 **Current Status:** Backend completed | React frontend in progress

---

## ✨ Features

### 🤖 AI-Powered Learning
- Generate concise summaries from study material
- Create flashcards for quick revision
- Generate MCQ quizzes for practice

### 📄 Study Material Processing
- Upload PDF and TXT files
- Extract and process text from uploaded files
- Use extracted content as input for AI generation

### 🔐 Authentication
- User registration and login
- Password hashing using bcrypt
- JWT-based authentication
- Protected API routes

### 🗂️ Study Session History
- Store generated summaries, flashcards, and quizzes
- Associate sessions with individual users
- Retrieve previous study sessions

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML & CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication & Security
- JWT
- bcrypt

### AI
- Hugging Face API

### Testing
- Postman

---

## 🏗️ Architecture

```text
                    🧠 BrainyBot
                   AI Study Buddy
                         │
                         ▼
                ┌─────────────────┐
                │  React Frontend │
                │      (UI)       │
                └────────┬────────┘
                         │
                      REST API
                         │
                         ▼
                ┌─────────────────┐
                │ Node.js +       │
                │ Express Backend │
                └────────┬────────┘
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     ┌─────────┐   ┌───────────┐   ┌────────────┐
     │ MongoDB │   │ Hugging   │   │ JWT +      │
     │  Atlas  │   │ Face AI   │   │ bcrypt     │
     └─────────┘   └───────────┘   └────────────┘