from __future__ import annotations

from datetime import datetime, timezone
from uuid import uuid4

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from .mock_ai import get_mock_reply
from .models import ChatMessage, ChatRequest, ChatResponse
from .store import InMemoryConversationStore

app = FastAPI(title="Verba AI Mock Chat API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

store = InMemoryConversationStore(max_messages_per_conversation=50)


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat()


@app.get("/api/health")
def health():
    return {"ok": True}


@app.post("/api/chat", response_model=ChatResponse)
def chat(payload: ChatRequest):
    message = payload.message.strip()
    if not message:
        raise HTTPException(status_code=400, detail={"error": "Message is required."})

    conversation_id = payload.conversationId.strip() if payload.conversationId else uuid4().hex

    history = store.get_history(conversation_id)
    reply_text = get_mock_reply(message, history)

    user_time = now_iso()
    ai_time = now_iso()

    store.append(
        conversation_id,
        [
            ChatMessage(role="user", text=message, timestamp=user_time),
            ChatMessage(role="assistant", text=reply_text, timestamp=ai_time),
        ],
    )

    return ChatResponse(conversationId=conversation_id, reply=reply_text, timestamp=ai_time)
