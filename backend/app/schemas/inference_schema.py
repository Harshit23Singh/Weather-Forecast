from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


class DownscaleRequest(BaseModel):
    lat: float = Field(..., ge=-90.0, le=90.0)
    lon: float = Field(..., ge=-180.0, le=180.0)
    target_elevation_m: Optional[float] = Field(None, description="Target field elevation in meters")
    canopy_cover: Optional[float] = Field(0.4, description="Fraction of vegetative canopy cover (0.0 - 1.0)")


class DownscaleResponse(BaseModel):
    latitude: float
    longitude: float
    target_elevation_m: float
    synoptic_temperature: float
    synoptic_humidity: float
    downscaled_temperature_1km: float
    downscaled_humidity_1km: float
    microclimate_soil_temp: float
    canopy_adjusted_temp: float
    thermal_lapse_delta_c: float
    grid_resolution: str = "1km x 1km"
    model_version: str = "PINN-UNet-v1.4"


class CropRiskRequest(BaseModel):
    crop: str = Field("Wheat", description="Target crop name (Wheat, Paddy, Cotton, Mustard, Sugarcane, Soybean)")
    avg_temperature: float
    avg_humidity: float
    rain_sum_mm: float
    wind_speed_kmh: float
    soil_moisture_vol: Optional[float] = 0.32


class CropRiskResponse(BaseModel):
    crop_evaluated: str
    overall_pest_risk_index: float
    pest_alerts: List[Dict[str, Any]]
    abiotic_stresses: Dict[str, bool]
    field_operations: Dict[str, str]
