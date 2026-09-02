from fastapi import APIRouter
from app.schemas.timeline import TimelineResponse
from app.services.timeline_service import TimelineService

router = APIRouter()
service = TimelineService()

@router.get('/timeline', response_model=TimelineResponse)
def get_timeline():
    return service.get_timeline()
