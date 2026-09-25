from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.api.v1.endpoints import health

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("gram_mausam_ai")


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing Gram Mausam AI Backend Services...")
    logger.info("Loading ML Downscaling & Agro-climatic weights...")
    yield
    logger.info("Shutting down Gram Mausam AI Backend Services...")


app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Hyper-local 1km agro-meteorological forecasting, physics-informed downscaling, and crop intelligence API for Indian agriculture.",
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
    redoc_url=f"{settings.API_V1_STR}/redoc",
    lifespan=lifespan,
)

# Set CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(health.router, prefix=settings.API_V1_STR, tags=["Diagnostics"])


@app.get("/")
def root():
    return {
        "title": "Gram Mausam AI - High-Resolution Agro-Meteorology API",
        "version": settings.VERSION,
        "documentation": f"{settings.API_V1_STR}/docs",
        "description": "Providing 1km micro-climate downscaling and ICAR agro-advisories for Indian Gram Panchayats.",
    }
