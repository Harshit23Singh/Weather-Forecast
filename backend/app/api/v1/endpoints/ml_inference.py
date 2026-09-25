from fastapi import APIRouter, HTTPException
import sys
from pathlib import Path

# Add project root to path for ML imports
ROOT_DIR = Path(__file__).resolve().parents[4]
if str(ROOT_DIR) not in sys.path:
    sys.path.append(str(ROOT_DIR))

from app.schemas.inference_schema import (
    DownscaleRequest,
    DownscaleResponse,
    CropRiskRequest,
    CropRiskResponse
)
from app.services.weather_service import weather_service
from ml_engine.models.spatial_interpolator import spatial_interpolator
from ml_engine.models.crop_risk_classifier import crop_risk_classifier

router = APIRouter()


@router.post("/downscale", response_model=DownscaleResponse, summary="1km Microclimate Super-Resolution")
async def downscale_microclimate(payload: DownscaleRequest):
    """
    Downscale synoptic 25km GFS/ERA5 forecasts to 1km Gram Panchayat hyper-local resolution
    using terrain elevation lapse models and Physics-Informed neural regularizers.
    """
    try:
        # Fetch base synoptic grid from weather service
        synoptic = await weather_service.get_forecast(payload.lat, payload.lon)
        curr = synoptic.get("current", {})
        base_temp = curr.get("temperature", 28.0)
        base_hum = curr.get("relative_humidity", 65.0)
        base_elev = synoptic.get("elevation", 200.0)

        target_elev = payload.target_elevation_m if payload.target_elevation_m is not None else (base_elev + 25.0)

        # Run spatial interpolation & lapse rate downscaling
        result = spatial_interpolator.downscale_point(
            base_temp=base_temp,
            base_humidity=base_hum,
            base_elevation=base_elev,
            target_elevation=target_elev,
            canopy_cover_fraction=payload.canopy_cover or 0.4
        )

        return DownscaleResponse(
            latitude=payload.lat,
            longitude=payload.lon,
            target_elevation_m=target_elev,
            synoptic_temperature=base_temp,
            synoptic_humidity=base_hum,
            downscaled_temperature_1km=result["downscaled_temperature"],
            downscaled_humidity_1km=result["downscaled_humidity"],
            microclimate_soil_temp=result["microclimate_soil_temp"],
            canopy_adjusted_temp=result["canopy_adjusted_temp"],
            thermal_lapse_delta_c=result["thermal_delta_c"]
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"ML Downscaling inference error: {str(e)}")


@router.post("/crop-risk", response_model=CropRiskResponse, summary="Predict Crop Pest Outbreak & Abiotic Stress")
def evaluate_crop_risk(payload: CropRiskRequest):
    """
    Evaluates thermal stress, humidity thresholds, and pest incubation risk
    calibrated against ICAR-CRIDA crop advisories.
    """
    try:
        result = crop_risk_classifier.predict_risk(
            crop=payload.crop,
            avg_temp=payload.avg_temperature,
            avg_humidity=payload.avg_humidity,
            rain_sum_mm=payload.rain_sum_mm,
            wind_speed_kmh=payload.wind_speed_kmh,
            soil_moisture_vol=payload.soil_moisture_vol or 0.32
        )
        return CropRiskResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crop risk evaluation error: {str(e)}")
