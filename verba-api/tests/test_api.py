from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health():
    r = client.get("/api/health")
    assert r.status_code == 200
    assert r.json() == {"ok": True}


def test_chat_returns_reply_and_conversation_id():
    r = client.post("/api/chat", json={"message": "hello"})
    assert r.status_code == 200
    data = r.json()
    assert "conversationId" in data and data["conversationId"]
    assert "reply" in data and data["reply"]
    assert "timestamp" in data and data["timestamp"]


def test_chat_requires_message():
    r = client.post("/api/chat", json={"message": "   "})
    assert r.status_code in (400, 422)
