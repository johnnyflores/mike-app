# Mike App (FastAPI + React)

Mike App is a full-stack social media practice project with a FastAPI backend and a React + TypeScript frontend.

## Project Structure

```text
mike-app/
├── backend/   # FastAPI API, auth, posts, comments, image serving
└── frontend/  # React + Vite client
```

## Tech Stack

- Backend: FastAPI, SQLAlchemy, JWT auth, SQLite
- Frontend: React 19, TypeScript, Vite, Material UI

## Prerequisites

- Python 3.10+
- Node.js 20+
- npm 10+

## Backend Setup

From the project root:

```bash
cd backend
python3 -m venv env
source env/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

### Environment Variables

Create a local env file from the example:

```bash
cp .env_example .env
```

Update `.env` values:

- `SECRET_KEY` (generate with `openssl rand -hex 32`)
- `ALGORITHM` (example: `HS256`)

### Run Backend

```bash
uvicorn main:app --reload
```

Backend URL: `http://127.0.0.1:8000`

## Frontend Setup

From the project root:

```bash
cd frontend
npm install
```

### Run Frontend

```bash
npm run dev
```

Frontend URL: `http://localhost:5173`

## Development Notes

- CORS in backend is configured for `http://localhost:5173`.
- Backend serves uploaded images from `backend/images` at `/images`.
- SQLite database file is `backend/data.db`.

## Common Commands

```bash
# Backend
cd backend && source env/bin/activate && uvicorn main:app --reload

# Frontend
cd frontend && npm run dev
```
