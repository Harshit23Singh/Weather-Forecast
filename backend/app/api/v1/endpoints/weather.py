from fastapi import APIRouter, Query, HTTPException
from typing import Optional

from app.services.weather_service import weather_service
from app.schemas.weather_schema import WeatherForecastResponse

router = APIRouter()


@router.get("/forecast", response_model=WeatherForecastResponse, summary="Get Synoptic Weather Forecast")
async def get_weather_forecast(
    lat: float = Query(..., ge=-90.0, le=90.0, description="Latitude in decimal degrees"),
    lon: float = Query(..., ge=-180.0, le=180.0, description="Longitude in decimal degrees"),
):
    """
    Fetch high-precision synoptic weather telemetry including soil moisture,
    solar radiation, hourly forecasts, and FAO-56 reference evapotranspiration.
    """
    try:
        data = await weather_service.get_forecast(latitude=lat, longitude=lon)
        return data
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Failed to fetch weather telemetry from upstream provider: {str(e)}"
        )
