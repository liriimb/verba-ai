from __future__ import annotations

from datetime import datetime, timezone
from typing import Dict, List, Optional
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# -----------------------------
# Models
# -----------------------------
class ChatMessage(BaseModel):
    role: str  # "user" | "assistant"
    text: str
    timestamp: str  # ISO string


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    conversationId: Optional[str] = None


class ChatResponse(BaseModel):
    conversationId: str
    reply: str
    timestamp: str


# -----------------------------
# App
# -----------------------------
app = FastAPI(title="Verba AI Mock Chat API", version="1.0.0")

# CORS for local dev (Vite usually runs on 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# In-memory "mock backend" state
# -----------------------------
MAX_MESSAGES_PER_CONVERSATION = 50
conversations: Dict[str, List[ChatMessage]] = {}


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


def get_mock_reply(message: str, history: List[ChatMessage]) -> str:
    m = message.lower()

    # last user message in history (same idea as your TS)
    last_user = None
    for x in reversed(history):
        if x.role == "user":
            last_user = x.text
            break

    if "hello" in m or "hi" in m or "pershendetje" in m:
        return "Hi! How can I help you today?"

    if "refund" in m or "return" in m:
        return "Sure — can you share your order number? I can guide you through the return/refund steps."

    if "price" in m or "pricing" in m:
        return "Happy to help. Which product/plan are you asking about, and what’s your approximate usage?"

    if last_user:
        return "Thanks — I understand. Can you add one more detail (account/email/order number) so I can help faster?"

    return "Thanks! Can you clarify what you need help with?"


def trim_history(history: List[ChatMessage]) -> None:
    if len(history) > MAX_MESSAGES_PER_CONVERSATION:
        del history[: len(history) - MAX_MESSAGES_PER_CONVERSATION]


# -----------------------------
# Routes
# -----------------------------
@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail={"error": "Message is required."})

    conversation_id = payload.conversationId.strip() if payload.conversationId else uuid4().hex

    history = conversations.get(conversation_id, [])
    reply_text = get_mock_reply(message, history)

    user_time = now_iso()
    ai_time = now_iso()

    history.append(ChatMessage(role="user", text=message, timestamp=user_time))
    history.append(ChatMessage(role="assistant", text=reply_text, timestamp=ai_time))

    trim_history(history)
    conversations[conversation_id] = history

    return ChatResponse(conversationId=conversation_id, reply=reply_text, timestamp=ai_time)
