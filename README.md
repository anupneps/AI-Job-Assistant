# AI Job Assistant

A multi-agent job application assistant using Next.js (frontend) and Node.js/Express (backend).

## Tech Stack
- Next.js (React)
- Node.js (Express)
- MongoDB (Mongoose)
- JWT Authentication
- Google OAuth (planned)
- Multer, pdf-parse (for CV upload/parse)

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

## Environment Variables

| Variable              | Description                        |
|-----------------------|------------------------------------|
| MONGO_URI             | MongoDB connection string          |
| JWT_SECRET            | Secret for signing JWTs            |
| GOOGLE_CLIENT_ID      | Google OAuth client ID (optional)  |
| GOOGLE_CLIENT_SECRET  | Google OAuth secret (optional)     |
| GOOGLE_CALLBACK_URL   | Google OAuth callback URL          |

## API Endpoints (see docs/api.md for details)

### Auth
- `POST /api/register` — Register user (body: username, password)
- `POST /api/login` — Login (body: username, password)
- `GET /api/profile` — Get user profile (JWT required)
- `POST /api/logout` — Logout (client deletes JWT)
- `GET /api/auth/google` — Google OAuth login (planned)

## Features

- User authentication (JWT, Google OAuth)
- Upload CV (PDF) and extract profile info
- User profile management

## API Overview

- `POST /api/upload-resume` — Upload a PDF resume (authenticated). Extracts name, email, phone, and skills, and updates the user profile.

## License

MIT 