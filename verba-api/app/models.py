from __future__ import annotations
from typing import Optional
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    role: str
    text: str
    timestamp: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1)
    conversationId: Optional[str] = None


class ChatResponse(BaseModel):
    conversationId: str
    reply: str
    timestamp: str
