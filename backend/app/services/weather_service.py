import httpx
from typing import Dict, Any
import logging
from app.core.config import settings
from app.core.redis_cache import geospatial_cache

logger = logging.getLogger("gram_mausam_ai.weather_service")


class WeatherService:
    """Fetches high-precision agro-meteorological data from Open-Meteo & applies local adjustments."""

    def __init__(self):
        self.base_url = settings.OPEN_METEO_BASE_URL

    async def get_forecast(self, latitude: float, longitude: float) -> Dict[str, Any]:
        """Fetch synoptic real-time and 7-day forecast grid with caching."""
        # Check cache first
        cached = await geospatial_cache.get(latitude, longitude)
        if cached:
            return cached
        params = {
            "latitude": latitude,
            "longitude": longitude,
            "current": [
                "temperature_2m",
                "relative_humidity_2m",
                "apparent_temperature",
                "precipitation",
                "rain",
                "weather_code",
                "surface_pressure",
                "wind_speed_10m",
                "wind_direction_10m",
                "uv_index",
                "soil_temperature_0cm",
                "soil_moisture_0_to_1cm"
            ],
            "hourly": [
                "temperature_2m",
                "relative_humidity_2m",
                "precipitation_probability",
                "precipitation",
                "rain",
                "weather_code",
                "surface_pressure",
                "wind_speed_10m",
                "soil_moisture_0_to_1cm",
                "et0_fao_evapotranspiration"
            ],
            "daily": [
                "weather_code",
                "temperature_2m_max",
                "temperature_2m_min",
                "precipitation_sum",
                "rain_sum",
                "precipitation_probability_max",
                "wind_speed_10m_max",
                "uv_index_max",
                "et0_fao_evapotranspiration"
            ],
            "timezone": "auto"
        }

        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()
                
                # Transform to standard schema structure
                curr = data.get("current", {})
                current_transformed = {
                    "temperature": curr.get("temperature_2m", 28.0),
                    "relative_humidity": curr.get("relative_humidity_2m", 65.0),
                    "apparent_temperature": curr.get("apparent_temperature", 30.0),
                    "precipitation": curr.get("precipitation", 0.0),
                    "rain": curr.get("rain", 0.0),
                    "weather_code": curr.get("weather_code", 1),
                    "surface_pressure": curr.get("surface_pressure", 1012.0),
                    "wind_speed_10m": curr.get("wind_speed_10m", 12.0),
                    "wind_direction_10m": curr.get("wind_direction_10m", 180.0),
                    "uv_index": curr.get("uv_index", 5.0),
                    "soil_temperature_0cm": curr.get("soil_temperature_0cm", 26.5),
                    "soil_moisture_0_to_1cm": curr.get("soil_moisture_0_to_1cm", 0.32),
                }

                result = {
                    "latitude": data.get("latitude", latitude),
                    "longitude": data.get("longitude", longitude),
                    "elevation": data.get("elevation", 250.0),
                    "timezone": data.get("timezone", "Asia/Kolkata"),
                    "current": current_transformed,
                    "hourly": data.get("hourly", {}),
                    "daily": data.get("daily", {})
                }
                await geospatial_cache.set(latitude, longitude, result)
                return result
            except Exception as e:
                logger.error(f"Error fetching Open-Meteo telemetry: {e}")
                raise e


weather_service = WeatherService()
