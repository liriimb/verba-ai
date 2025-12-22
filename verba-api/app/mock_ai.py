from __future__ import annotations
from typing import List
from .models import ChatMessage


def get_mock_reply(message: str, history: List[ChatMessage]) -> str:
    m = message.lower()

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
