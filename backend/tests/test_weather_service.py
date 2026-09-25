import pytest
from unittest.mock import AsyncMock, patch
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from app.services.weather_service import weather_service


@pytest.mark.asyncio
async def test_weather_service_parsing():
    mock_payload = {
        "latitude": 26.9274,
        "longitude": 81.1822,
        "elevation": 125.0,
        "timezone": "Asia/Kolkata",
        "current": {
            "temperature_2m": 31.4,
            "relative_humidity_2m": 58.0,
            "apparent_temperature": 34.0,
            "precipitation": 0.0,
            "rain": 0.0,
            "weather_code": 1,
            "surface_pressure": 1010.5,
            "wind_speed_10m": 9.8,
            "wind_direction_10m": 120.0,
            "uv_index": 6.2,
            "soil_temperature_0cm": 29.1,
            "soil_moisture_0_to_1cm": 0.28
        },
        "hourly": {
            "time": ["2026-03-26T00:00"],
            "temperature_2m": [31.4]
        },
        "daily": {
            "time": ["2026-03-26"],
            "temperature_2m_max": [35.0]
        }
    }

    with patch("httpx.AsyncClient.get") as mock_get:
        mock_response = AsyncMock()
        mock_response.status_code = 200
        mock_response.json.return_value = mock_payload
        mock_response.raise_for_status = AsyncMock()
        mock_get.return_value = mock_response

        result = await weather_service.get_forecast(26.9274, 81.1822)
        assert result["latitude"] == 26.9274
        assert result["current"]["temperature"] == 31.4
        assert result["current"]["relative_humidity"] == 58.0
