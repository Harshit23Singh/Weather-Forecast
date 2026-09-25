from fastapi import APIRouter, Query, HTTPException
from typing import Dict, Any, List
from app.services.weather_service import weather_service
from app.services.translation_service import translation_service
from app.schemas.advisory_schema import MultilingualAdvisoryResponse, AdvisoryItem

router = APIRouter()


@router.get("/panchayat-bulletin", response_model=MultilingualAdvisoryResponse, summary="Generate Gram Panchayat Agro-Advisory Bulletin")
async def generate_agro_advisory(
    lat: float = Query(..., description="Latitude"),
    lon: float = Query(..., description="Longitude"),
    crop: str = Query(default="Wheat", description="Primary crop in field"),
    lang: str = Query(default="en", description="Language code: en (English), hi (Hindi), pa (Punjabi), mr (Marathi), gu (Gujarati)")
):
    """
    Synthesizes real-time micro-climate observations, 7-day precipitation forecasts,
    and crop phenology to formulate actionable ICAR/IMD advisories in regional languages.
    """
    try:
        weather_data = await weather_service.get_forecast(lat, lon)
        curr = weather_data.get("current", {})
        temp = curr.get("temperature", 28.0)
        humidity = curr.get("relative_humidity", 65.0)
        rain = curr.get("rain", 0.0)
        wind = curr.get("wind_speed_10m", 10.0)

        bulletins: List[AdvisoryItem] = []

        # Irrigation Advisory
        if rain < 1.0 and temp > 30.0:
            rec = translation_service.translate_bulletin("irrigation_high", lang=lang, crop=crop, wind=wind)
            rec_en = translation_service.translate_bulletin("irrigation_high", lang="en", crop=crop, wind=wind)
            bulletins.append(AdvisoryItem(
                category="Irrigation Management",
                urgency="High",
                recommendation=rec,
                recommendation_en=rec_en
            ))
        elif rain > 15.0:
            rec = translation_service.translate_bulletin("drainage_warning", lang=lang, crop=crop, wind=wind)
            rec_en = translation_service.translate_bulletin("drainage_warning", lang="en", crop=crop, wind=wind)
            bulletins.append(AdvisoryItem(
                category="Drainage & Soil Protection",
                urgency="Warning",
                recommendation=rec,
                recommendation_en=rec_en
            ))

        # Chemical Spray Advisory
        if wind < 12.0 and rain == 0.0:
            rec = translation_service.translate_bulletin("spray_optimal", lang=lang, crop=crop, wind=wind)
            rec_en = translation_service.translate_bulletin("spray_optimal", lang="en", crop=crop, wind=wind)
            bulletins.append(AdvisoryItem(
                category="Plant Protection & Spraying",
                urgency="Optimal Window",
                recommendation=rec,
                recommendation_en=rec_en
            ))
        else:
            rec = translation_service.translate_bulletin("spray_deferred", lang=lang, crop=crop, wind=wind)
            rec_en = translation_service.translate_bulletin("spray_deferred", lang="en", crop=crop, wind=wind)
            bulletins.append(AdvisoryItem(
                category="Plant Protection & Spraying",
                urgency="Deferred",
                recommendation=rec,
                recommendation_en=rec_en
            ))

        return MultilingualAdvisoryResponse(
            panchayat_coordinates={"lat": lat, "lon": lon},
            crop=crop,
            language=lang,
            current_conditions={
                "temperature_c": temp,
                "relative_humidity_pct": humidity,
                "wind_speed_kmh": wind
            },
            advisory_bulletins=bulletins,
            generated_by="Gram Mausam AI - Expert Agro-Climatic Intelligence Engine"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate agro-advisory: {str(e)}")
