from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional


class AdvisoryItem(BaseModel):
    category: str = Field(..., description="Agro-meteorological category")
    urgency: str = Field(..., description="Action priority: High, Warning, Optimal Window, Normal")
    recommendation: str = Field(..., description="Actionable advisory in selected language")
    recommendation_en: Optional[str] = Field(None, description="English standard fallback")


class MultilingualAdvisoryResponse(BaseModel):
    panchayat_coordinates: Dict[str, float]
    crop: str
    language: str
    current_conditions: Dict[str, Any]
    advisory_bulletins: List[AdvisoryItem]
    generated_by: str
    icar_zone_reference: str = "ICAR-CRIDA Agromet Advisory Framework"
