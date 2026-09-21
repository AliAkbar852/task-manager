# TaskFlow Pro — Full-Stack Task Manager

A complete MERN-stack task management application built as the capstone project of a full-stack development internship.

## Project Proposal

**Problem:** People need a simple, clean tool to track personal tasks with priorities and statuses without the overhead of complex project management tools.

**Solution:** A personal task manager where each user has their own private workspace to create, organize, and track tasks with priority levels and status flow.

## Live Demo

- 🌐 **Frontend:** [Deployed on Vercel](https://your-app.vercel.app) ← update after deployment
- ⚙️ **Backend API:** [Deployed on Render](https://your-api.onrender.com) ← update after deployment

## Features

- 🔐 User signup, login, logout with JWT authentication
- ✅ Create, edit, and delete tasks
- 🏷️ Set task priority: **Low / Medium / High**
- 📊 Set task status: **To Do / In Progress / Done**
- 🔄 One-click status advancement (To Do → In Progress → Done)
- 🔍 Filter tasks by status and priority
- 📈 Live task stats (Total / In Progress / Done)
- 📱 Responsive design for mobile and desktop

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas, Mongoose |
| Authentication | JWT, bcrypt |
| Deployment | Vercel (frontend), Render (backend) |

## Project Structure

```
capstone/
├── backend/
│   ├── models/
│   │   ├── User.js           # Mongoose user schema + bcrypt
│   │   └── Task.js           # Task schema with priority/status
│   ├── routes/
│   │   ├── auth.js           # POST /api/auth/signup, /login
│   │   └── tasks.js          # Full CRUD — GET, POST, PUT, DELETE
│   ├── middleware/
│   │   └── auth.js           # JWT verification middleware
│   ├── server.js
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   └── Signup.jsx
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── FilterBar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskForm.jsx
    │   ├── App.jsx
    │   └── App.css
    └── package.json
```

## Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

### 1. Clone the repo
```bash
git clone https://github.com/AliAkbar852/capstone.git
cd capstone
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file (see `.env.example`):
```
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_strong_secret_key
CLIENT_URL=http://localhost:5173
PORT=5000
```

```bash
npm start
# Connected to MongoDB
# Server running at http://localhost:5000
```

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
# App running at http://localhost:5173
```

## API Reference

### Auth Routes (Public)

| Method | Endpoint | Body | Description |
|---|---|---|---|
| POST | /api/auth/signup | `{name, email, password}` | Register new user |
| POST | /api/auth/login | `{email, password}` | Login, returns JWT |

### Task Routes (Protected — `Authorization: Bearer <token>`)

| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks | Get all user tasks |
| GET | /api/tasks?status=todo&priority=high | Filtered tasks |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

**Task body:**
```json
{
  "title": "Task title",
  "description": "Optional description",
  "priority": "low | medium | high",
  "status": "todo | in-progress | done"
}
```

## Deployment Guide

### Backend → Render
1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your GitHub repo, set Root Directory to `backend`
4. Build Command: `npm install`, Start Command: `npm start`
5. Add environment variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL` (your Vercel URL), `PORT=5000`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Connect GitHub repo, set Root Directory to `frontend`
3. Add environment variable: `VITE_API_URL=https://your-render-app.onrender.com`
4. Deploy

## Environment Variables

### Backend (`.env`)
| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Strong secret key for JWT signing |
| `CLIENT_URL` | Frontend URL for CORS (Vercel URL in production) |
| `PORT` | Server port (default 5000) |

### Frontend (`.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (Render URL in production) |

> ⚠️ Never commit `.env` files. Use `.env.example` as a reference.

---
*Capstone Project — Full-Stack MERN Internship*  
*Developer: Ali Akbar*
