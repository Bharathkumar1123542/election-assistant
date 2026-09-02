class Guardrails:
    def validate(self, text: str) -> str:
        safe_text = text.strip()
        if not safe_text:
            return 'I am sorry, I could not find a valid answer. Please try again with more detail.'
        return safe_text
