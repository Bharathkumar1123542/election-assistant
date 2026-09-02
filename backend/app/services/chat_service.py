from app.agents.rag_engine import RAGEngine

class ChatService:
    def __init__(self):
        self.rag_engine = RAGEngine()

    def get_response(self, message: str) -> str:
        return self.rag_engine.generate_response(message)
