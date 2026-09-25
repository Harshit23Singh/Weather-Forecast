from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import logging

from app.core.config import settings
from app.api.v1.endpoints import health, weather, locations, ml_inference, advisory, sms_dispatch, gis_export

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
app.include_router(weather.router, prefix=f"{settings.API_V1_STR}/weather", tags=["Weather Telemetry"])
app.include_router(locations.router, prefix=f"{settings.API_V1_STR}/locations", tags=["Geospatial Panchayat Registry"])
app.include_router(ml_inference.router, prefix=f"{settings.API_V1_STR}/ml", tags=["Machine Learning Inference"])
app.include_router(advisory.router, prefix=f"{settings.API_V1_STR}/advisory", tags=["Agro-Meteorological Advisory"])
app.include_router(sms_dispatch.router, prefix=f"{settings.API_V1_STR}/sms", tags=["Kisan SMS Gateway Dispatch"])
app.include_router(gis_export.router, prefix=f"{settings.API_V1_STR}/gis", tags=["GIS & GeoJSON Interoperability"])


@app.get("/")
def root():
    return {
        "title": "Gram Mausam AI - High-Resolution Agro-Meteorology API",
        "version": settings.VERSION,
        "documentation": f"{settings.API_V1_STR}/docs",
        "description": "Providing 1km micro-climate downscaling and ICAR agro-advisories for Indian Gram Panchayats.",
    }
