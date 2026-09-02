import pytest
from fastapi.testclient import TestClient
from app.main import app  # Assuming main.py exists

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_chat_endpoint():
    response = client.post("/api/v1/chat", json={"message": "Hello"})
    assert response.status_code == 200
    # Add more assertions based on expected response