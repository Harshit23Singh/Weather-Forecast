from typing import List
from pydantic_settings import BaseSettings
from pydantic import Field


class Settings(BaseSettings):
    """Application runtime configurations."""

    PROJECT_NAME: str = "Gram Mausam AI - Backend Gateway"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    DEBUG: bool = False

    # CORS origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://gram-mausam.web.app",
    ]

    # Weather Provider APIs
    OPEN_METEO_BASE_URL: str = "https://api.open-meteo.com/v1/forecast"
    REDIS_URL: str = "redis://localhost:6379/0"
    ENABLE_REDIS_CACHE: bool = False

    # ML Inference Settings
    DOWNSCALER_MODEL_PATH: str = "ml_engine/weights/pinn_downscaler_v1.onnx"
    SPATIAL_GRID_RESOLUTION_KM: float = 1.0  # 1km hyper-local resolution
    ELEVATION_LAPSE_RATE_C_PER_100M: float = 0.65

    class Config:
        case_sensitive = True
        env_file = ".env"


settings = Settings()
