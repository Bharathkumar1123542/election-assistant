from fastapi import APIRouter, HTTPException
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import ChatService

router = APIRouter()
service = ChatService()

@router.post('/chat', response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        answer = service.get_response(request.message)
        return ChatResponse(answer=answer)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))
