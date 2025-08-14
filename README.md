# AI Job Assistant

AI Job Assistant is a full-stack, multi-agent job application assistant designed to automate and enhance the job search process using modern web technologies and advanced AI/NLP. The project features a Next.js frontend, a Node.js/Express backend, and a dedicated Python FastAPI microservice for natural language processing tasks such as CV parsing, skill extraction, and job matching. 

> **Note:** This project is being developed collaboratively with the help of Cursor AI Copilot, showcasing modern AI-assisted software engineering practices.

## Tech Stack
- Next.js (React)
- Node.js (Express)
- MongoDB (Mongoose)
- JWT Authentication (username, email, password)
- Google OAuth (planned)
- Multer, pdf-parse (for CV upload/parse)
- Axios (frontend API utility)
- **Python FastAPI Microservice** (for AI/NLP tasks, using spaCy and open-source models)

## Project Structure
```
backend/
  controllers/
  middleware/
  routes/
  services/
  Models/
  Data/
frontend/
ai_services/   # Python FastAPI microservice for AI/NLP
```

## Setup

### Backend
1. `cd backend`
2. `npm install`
3. Create `.env` (see below)
4. `node index.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### AI Microservice
1. `cd ai_services`
2. (Optional) Create and activate a Python virtual environment
3. `pip install -r requirements.txt`
4. `python -m spacy download en_core_web_sm`
5. `uvicorn app.main:app --reload`

## Environment Variables

| Variable              | Description                        |
|-----------------------|------------------------------------|
| MONGO_URI             | MongoDB connection string          |
| JWT_SECRET            | Secret for signing JWTs            |
| GOOGLE_CLIENT_ID      | Google OAuth client ID (optional)  |
| GOOGLE_CLIENT_SECRET  | Google OAuth secret (optional)     |
| GOOGLE_CALLBACK_URL   | Google OAuth callback URL          |
| NEXT_PUBLIC_API_BASE_URL | Backend API base URL (frontend)  |

## API Endpoints (see docs/api.md for details)

### Auth
- `POST /api/register` — Register user (body: username, email, password)
- `POST /api/login` — Login (body: username, password)
- `GET /api/profile` — Get user profile (JWT required)
- `POST /api/logout` — Logout (client deletes JWT)
- `GET /api/auth/google` — Google OAuth login (planned)

### CV Upload
- `POST /api/upload-resume` — Upload a PDF resume (authenticated). Extracts name, email, phone, and skills, and updates the user profile.

## Features

- Secure JWT authentication (username, email, password)
- Session persistence and protected routes
- Onboarding: manual profile setup or CV upload (PDF parsing, progress bar)
- Profile form supports custom sections

## AI Microservice (ai_services)

The `ai_services` directory contains a dedicated Python FastAPI microservice that powers all advanced AI/NLP features for the platform, including:
- CV parsing and skill extraction
- Job matching and skill gap analysis
- Multi-agent AI generation (CV optimization, cover letter, interview prep, skill enhancement)

It leverages open-source models (spaCy, Sentence Transformers, GPT-2) and can optionally use OpenAI for generative tasks. For full details and API documentation, see [`ai_services/README.md`](ai_services/README.md).


