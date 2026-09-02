from pydantic import BaseModel
from typing import List

class TimelineItem(BaseModel):
    title: str
    description: str
    date: str
    completed: bool

class TimelineResponse(BaseModel):
    steps: List[TimelineItem]
