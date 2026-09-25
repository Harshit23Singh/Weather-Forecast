from fastapi import APIRouter, Query
from typing import List, Optional

from app.services.geospatial_service import geospatial_service
from app.schemas.location_schema import PanchayatLocation, LocationSearchResponse

router = APIRouter()


@router.get("/search", response_model=LocationSearchResponse, summary="Search Indian Gram Panchayats")
def search_locations(
    q: Optional[str] = Query(default="", description="Search query: Panchayat name, district, state, or crop")
):
    """
    Search indexed Indian Gram Panchayats with agro-climatic classifications,
    dominant crop systems, and elevation profiles.
    """
    results = geospatial_service.search_locations(query=q)
    return LocationSearchResponse(
        query=q,
        total_results=len(results),
        results=results
    )


@router.get("/nearest", response_model=PanchayatLocation, summary="Find Nearest Gram Panchayat")
def get_nearest_location(
    lat: float = Query(..., ge=-90.0, le=90.0, description="Latitude coordinate"),
    lon: float = Query(..., ge=-180.0, le=180.0, description="Longitude coordinate"),
):
    """
    Locate the nearest registered Gram Panchayat to the specified GPS coordinates
    using spatial Haversine calculation.
    """
    return geospatial_service.find_nearest_panchayat(lat=lat, lon=lon)
