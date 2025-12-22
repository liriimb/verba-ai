# Verba AI — Simple AI Chat Interface (Mocked Backend)

A simple full-stack customer-support chat demo: a clean chat UI (frontend) + a mocked AI reply endpoint (backend).

---

- **Frontend chat UI** with message input + message history, clean design, basic responsiveness
- **Backend API** endpoint that receives a user message and returns a mock AI response (rule-based/static)
- **Optional polish implemented (minimal mention)**: typing/loading indicator, basic error handling, message timestamps

---

## Tech stack

### Frontend
- React + TypeScript (Vite)
- Axios
- MUI (Material UI)
- ESLint + Prettier

### Backend
- Python + FastAPI
- Uvicorn (ASGI server)
- Ruff (lint/format)
- Pytest (tests)

---

## Prerequisites
- Node.js + npm
- Python 3.11+
- Git

---

## Quick start (Windows)

### 1) Clone
```powershell
git clone https://github.com/liriimb/verba-ai.git
cd verba-ai

or 

Download Zip and Extract

### 2) Install frontend dependencies

Recommended (execute inside repo root verba-ai):
(inside terminal/powershell):
npm install

### 3) Setup and run backend (FastAPI)

(execute inside backend(verba-api) folder verba-ai/verba-api)
(inside terminal/powershell):
cd verba-api
python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000

### One-command dev (Windows)
(this runs both projects)
(execute inside repo root(verba-ai)):
.\scripts\dev.ps1

This starts:

FastAPI on http://localhost:8000
Vite on http://localhost:5173

---

### for macOS / Linux

Backend:

cd verba-api
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000


Frontend:

cd frontend
npm install
npm run dev

---

## Testing
(execute terminal/powershell inside verba-api folder):
.\.venv\Scripts\Activate.ps1
pytest

### Linting & formatting
Frontend
cd frontend
npm run lint
npm run typecheck

### Backend (Ruff)
cd verba-api
.\.venv\Scripts\Activate.ps1
ruff check .
ruff format .

### Repo formatting (Prettier)

From repo root:

npm run format

---

How this would integrate with a real AI agent

The backend currently returns deterministic/rule-based replies to simulate an AI assistant. In a production setup, /api/chat would typically:

Validate input and resolve session/conversation context.

Load history from a persistent store (DB/Redis) instead of in-memory state.

Call an AI agent/LLM layer with system instructions, user message, and relevant context (orders/docs/profile).

Optionally stream responses (SSE/WebSocket) for token-by-token output.

Persist assistant replies and add observability (request IDs, logs, metrics) + rate limits.
