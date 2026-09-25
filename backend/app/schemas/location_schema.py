from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class PanchayatLocation(BaseModel):
    id: str = Field(..., description="Unique administrative identifier")
    name: str = Field(..., description="Gram Panchayat or Village name")
    block: str = Field(..., description="Block / Tehsil name")
    district: str = Field(..., description="District name")
    state: str = Field(..., description="State or Union Territory")
    lat: float = Field(..., description="Latitude coordinate")
    lon: float = Field(..., description="Longitude coordinate")
    elevation_m: float = Field(..., description="Elevation above sea level in meters")
    soil_type: str = Field(..., description="Primary soil classification")
    primary_crops: List[str] = Field(..., description="Dominant Kharif / Rabi crops")
    agro_climatic_zone: str = Field(..., description="Planning Commission / ICAR Agro-Climatic Zone")


class LocationSearchResponse(BaseModel):
    query: str
    total_results: int
    results: List[PanchayatLocation]


class GeoJSONPolygonFeature(BaseModel):
    type: str = "Feature"
    geometry: Dict[str, Any]
    properties: Dict[str, Any]
