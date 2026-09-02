from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.health import router as health_router
from app.api.v1.chat import router as chat_router
from app.api.v1.timeline import router as timeline_router

app = FastAPI(
    title='Election Assistant API',
    description='Backend API for a guided election assistant with chat and timeline support.',
    version='0.1.0',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(health_router, prefix='')
app.include_router(chat_router, prefix='/api/v1')
app.include_router(timeline_router, prefix='/api/v1')
