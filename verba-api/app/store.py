from __future__ import annotations
from typing import Dict, List
from .models import ChatMessage


class InMemoryConversationStore:
    def __init__(self, max_messages_per_conversation: int = 50):
        self._max = max_messages_per_conversation
        self._conversations: Dict[str, List[ChatMessage]] = {}

    def get_history(self, conversation_id: str) -> List[ChatMessage]:
        return self._conversations.get(conversation_id, [])

    def append(self, conversation_id: str, messages: List[ChatMessage]) -> None:
        history = self._conversations.get(conversation_id, [])
        history.extend(messages)

        if len(history) > self._max:
            history = history[-self._max :]

        self._conversations[conversation_id] = history
