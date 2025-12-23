# Verba AI — Simple AI Chat Interface (Mocked Backend)

A simple full-stack customer-support chat demo: a clean chat UI (frontend) + a mocked AI reply endpoint (backend).

**It is recommended to run the commands one-by-one instead of all at once!**
---

- **Frontend chat UI** with message input + message history, clean design, basic responsiveness(Mobile-friendly)
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
- Node.js + npm (https://nodejs.org/en/download/current)
- Python 3.11+ (https://www.python.org/downloads/)
- Git (https://git-scm.com/install/)
- VsCode (Optional Recommended https://code.visualstudio.com/Download)

---
## Quick start (Windows)

### 1) Clone the repo
in powershell/terminal (make sure you are at the location where you want to clone the folder to)
Example in terminal: C:\Users\User\Desktop\verba> 

run:
```
git clone https://github.com/liriimb/verba-ai.git
```
then:
```
cd verba-ai
```

### Or:

Download Zip and Extract
at https://github.com/liriimb/verba-ai/archive/refs/heads/main.zip

## 2) Install Dependencies (once):
 ### Start terminal from repo root (the folder you cloned):
```powershell
npm install
cd verba-api
python -m venv .venv
.\.venv\Scripts\python -m pip install --upgrade pip
.\.venv\Scripts\python -m pip install -r requirements.txt
cd ..
```
---
## Running the app (Windows)
You can run the project in two ways:
### Method A (recommended): One-command dev
This starts **both** the backend and the frontend.
**Make sure you have Installed Dependencies at 2).**

### Start terminal from repo root (the folder you cloned):
```
powershell -ExecutionPolicy Bypass -File .\scripts\dev.ps1
```
Then In-Browser
Frontend: http://localhost:5173
Backend: http://localhost:8000/docs
---

### Method B: Two terminals
Use this if you prefer to run each app separately.
**Make sure you have Installed Dependencies at 2).**

Terminal 1 — Backend (FastAPI):
### Start terminal from repo root (the folder you cloned)):
```
cd verba-api
python -m uvicorn app.main:app --reload --port 8000
```
Terminal 2 — Frontend (Vite):
### Start terminal from repo root (the folder you cloned):
```
cd frontend
npm run dev
```
Then In-Browser
Frontend: http://localhost:5173
Backend: http://localhost:8000/docs
---
### for macOS / Linux
**Make sure you have Installed Dependencies at 2).**

Backend:
### Start terminal from repo root (the folder you cloned):
```
cd verba-api
python3 -m venv .venv
./.venv/bin/python -m pip install --upgrade pip
./.venv/bin/python -m pip install -r requirements.txt
./.venv/bin/python -m uvicorn app.main:app --reload --port 8000
```
Frontend:
### Start terminal from repo root (the folder you cloned)):
```
cd frontend
npm install
npm run dev
in-browser: http://localhost:5173
```
---
## Testing
(execute terminal/powershell inside verba-api folder):
```
.\.venv\Scripts\python -m pytest
```
---
### Linting & formatting
### Start terminal from repo root (the folder you cloned):
```
Frontend
cd frontend
npm run lint
npm run typecheck
```
### Backend (Ruff)
### Start terminal from repo root (the folder you cloned):
```
cd verba-api
.\.venv\Scripts\python -m ruff check .
.\.venv\Scripts\python -m ruff format .
```
### Repo formatting (Prettier)
### Start terminal from repo root (the folder you cloned):
```
npm run format
```
---

## How this would integrate with a real AI agent

The backend currently returns deterministic/rule-based replies to simulate an AI assistant. In a production setup, `/api/chat` would typically:

- Validate input, normalize text, and resolve session/conversation context.
- Load/store conversation history in a persistent store (Postgres/Redis) instead of in-memory state.
- Call an AI agent/LLM layer with a system prompt, the user message, and relevant context (e.g., orders, policies, user profile).
- Optionally use retrieval (RAG) to pull answers from a knowledge base and cite sources internally.
- Apply safety/quality guardrails (PII redaction, prompt-injection checks, policy filters) and support human handoff for low-confidence cases.
- Stream responses (SSE/WebSocket) for token-by-token output and a smoother UX.
- Add observability (request IDs, logs/metrics/traces), rate-limits, and error retries/timeouts for reliability.
