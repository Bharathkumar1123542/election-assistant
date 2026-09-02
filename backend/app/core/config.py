from pydantic import BaseSettings

class Settings(BaseSettings):
    api_title: str = 'Election Assistant API'
    api_version: str = '0.1.0'
    openai_api_key: str | None = None
    google_maps_api_key: str | None = None
    database_url: str = 'sqlite:///./election_assistant.db'

    class Config:
        env_file = '.env'
        case_sensitive = False

settings = Settings()
