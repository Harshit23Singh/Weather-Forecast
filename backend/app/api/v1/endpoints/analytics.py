from fastapi import APIRouter, Query
from typing import Dict, Any
from app.services.agro_analytics_service import agro_analytics_service

router = APIRouter()


@router.get("/seasonal-summary", summary="Agro-Climatic Seasonal Analytics & IMD Rainfall Departure")
def get_seasonal_analytics(
    observed_rain_mm: float = Query(default=120.0, description="Observed seasonal rainfall"),
    normal_rain_mm: float = Query(default=135.0, description="Climatological normal rainfall"),
    accumulated_gdd: float = Query(default=450.0, description="Accumulated growing degree days"),
    temp_mean: float = Query(default=27.5, description="Mean temperature")
):
    """
    Computes IMD rainfall departure categories, Moisture Adequacy Index (MAI),
    and seasonal thermal units for district agricultural planning.
    """
    return agro_analytics_service.calculate_seasonal_metrics(
        observed_precip_mm=observed_rain_mm,
        normal_precip_mm=normal_rain_mm,
        growing_degree_days=accumulated_gdd,
        temp_mean_c=temp_mean
    )
