# Election Assistant

A student-friendly AI assistant for understanding election workflows, deadlines, and polling guidance.

## Project Structure

- `frontend/`: React + Vite application
- `backend/`: FastAPI service with chat and timeline APIs
- `docker-compose.yml`: local development stack for frontend and backend

## Run locally

1. Install frontend dependencies:
   - `cd frontend && npm install`
2. Install backend dependencies:
   - `cd ../backend && pip install -r requirements.txt`
3. Start backend:
   - `uvicorn app.main:app --reload --host 0.0.0.0 --port 8000`
4. Start frontend:
   - `npm run dev`

## API Endpoints

- `GET /health`
- `POST /api/v1/chat`
- `GET /api/v1/timeline`

## Notes

- The frontend is built with Vite and React, and uses accessible components for chat and timeline experiences.
- The backend includes a placeholder AI layer and RAG scaffolding that can be connected to OpenAI or other LLM providers.
- Environment variables should be configured using `.env.example` files in each app directory.
