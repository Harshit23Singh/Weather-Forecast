from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Dict, Any, Optional
from app.services.sms_gateway_service import sms_gateway_service

router = APIRouter()


class SMSDispatchPayload(BaseModel):
    panchayat_name: str = Field(..., description="Gram Panchayat name")
    crop: str = Field(default="Wheat", description="Target Crop")
    message: str = Field(..., description="Advisory text to broadcast")
    template_type: str = Field(default="general_bulletin", description="DLT Template type")
    recipient_count: Optional[int] = Field(1284, description="Number of farmers subscribed in village")


@router.post("/broadcast", summary="Dispatch Automated Farmer SMS / WhatsApp Advisory")
def trigger_sms_broadcast(payload: SMSDispatchPayload):
    """
    Submits an automated agro-meteorological advisory to the Kisan SMS Gateway (mKisan)
    for broadcast across registered Gram Panchayat farmer mobile numbers.
    """
    try:
        dispatch_receipt = sms_gateway_service.create_broadcast_payload(
            panchayat_name=payload.panchayat_name,
            crop=payload.crop,
            message=payload.message,
            template_type=payload.template_type,
            recipient_count=payload.recipient_count or 1284
        )
        return dispatch_receipt
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"SMS Gateway dispatch failed: {str(e)}")
