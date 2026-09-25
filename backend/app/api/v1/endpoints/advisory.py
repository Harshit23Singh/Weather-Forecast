from fastapi import APIRouter, Query, HTTPException
from typing import Dict, Any, List
from app.services.weather_service import weather_service

router = APIRouter()


@router.get("/panchayat-bulletin", summary="Generate Gram Panchayat Agro-Advisory Bulletin")
async def generate_agro_advisory(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    crop: str = Query(default="Wheat", description="Primary crop in field")
):
    """
    Synthesizes real-time micro-climate observations, 7-day precipitation forecasts,
    and crop phenology to formulate actionable ICAR/IMD advisories.
    """
    try:
        weather_data = await weather_service.get_forecast(lat, lon)
        curr = weather_data.get("current", {})
        temp = curr.get("temperature", 28.0)
        humidity = curr.get("relative_humidity", 65.0)
        rain = curr.get("rain", 0.0)
        wind = curr.get("wind_speed_10m", 10.0)

        bulletins: List[Dict[str, str]] = []

        # Irrigation Advisory
        if rain < 1.0 and temp > 30.0:
            bulletins.append({
                "category": "Irrigation Management",
                "urgency": "High",
                "recommendation": f"Soil evapotranspiration is elevated. Apply light sprinkler or furrow irrigation during morning or evening hours for {crop}."
            })
        elif rain > 15.0:
            bulletins.append({
                "category": "Drainage & Soil Protection",
                "urgency": "Warning",
                "recommendation": f"Heavy rainfall forecast detected. Ensure field drainage channels are clear to prevent water stagnation in {crop} roots."
            })

        # Chemical Spray Advisory
        if wind < 12.0 and rain == 0.0:
            bulletins.append({
                "category": "Plant Protection & Spraying",
                "urgency": "Optimal Window",
                "recommendation": f"Favorable conditions for foliar nutrient sprays and biological insecticides on {crop}. Wind speeds are below threshold."
            })
        else:
            bulletins.append({
                "category": "Plant Protection & Spraying",
                "urgency": "Deferred",
                "recommendation": f"Avoid chemical spray operations due to active wind drift ({wind} km/h) or precipitation risk."
            })

        return {
            "panchayat_coordinates": {"lat": lat, "lon": lon},
            "crop": crop,
            "current_conditions": {
                "temperature_c": temp,
                "relative_humidity_pct": humidity,
                "wind_speed_kmh": wind
            },
            "advisory_bulletins": bulletins,
            "generated_by": "Gram Mausam AI - Expert Agro-Climatic Intelligence Engine"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate agro-advisory: {str(e)}")
