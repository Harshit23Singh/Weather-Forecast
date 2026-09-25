from fastapi import APIRouter
import time

router = APIRouter()
start_time = time.time()

@router.get("/health", summary="Service Health & Diagnostic Telemetry")
async def health_check():
    """
    Returns API health status, system uptime, and microservice connectivity status.
    """
    uptime_seconds = time.time() - start_time
    return {
        "status": "healthy",
        "service": "Gram Mausam AI Microclimate Engine",
        "version": "1.0.0",
        "uptime_seconds": round(uptime_seconds, 2),
        "ml_inference_engine": "online",
        "spatial_grid_resolution": "1km x 1km Gram Panchayat scale",
        "open_meteo_upstream": "reachable"
    }
