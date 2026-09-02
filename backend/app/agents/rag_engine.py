from app.agents.llm_client import LLMClient
from app.agents.guardrails import Guardrails

class RAGEngine:
    def __init__(self):
        self.llm = LLMClient()
        self.guardrails = Guardrails()

    def generate_response(self, query: str) -> str:
        prompt = self._build_prompt(query)
        raw_answer = self.llm.generate(prompt)
        return self.guardrails.validate(raw_answer)

    def _build_prompt(self, query: str) -> str:
        context = (
            'You are an election assistant. Provide clear steps and cite deadlines. '
            'Use verified election guidance and avoid giving legal advice.'
        )
        return f"{context}\nUser question: {query}\nAnswer:"
