from fastapi import APIRouter, Query, Response
from typing import Optional, Dict, Any
import json
from app.services.shapefile_export_service import shapefile_export_service

router = APIRouter()


@router.get("/geojson", summary="Export Gram Panchayat Boundaries as GeoJSON")
def export_geojson(
    panchayat_id: Optional[str] = Query(None, description="Specific Panchayat ID or all registered clusters")
):
    """
    Returns standard OGC GeoJSON FeatureCollection formatted for QGIS, ISRO Bhuvan,
    and digital land records integration.
    """
    geojson_data = shapefile_export_service.generate_panchayat_geojson(panchayat_id=panchayat_id)
    return geojson_data


@router.get("/download-geojson", summary="Downloadable GeoJSON file stream")
def download_geojson():
    geojson_data = shapefile_export_service.generate_panchayat_geojson()
    content = json.dumps(geojson_data, indent=2)
    return Response(
        content=content,
        media_type="application/geo+json",
        headers={"Content-Disposition": "attachment; filename=gram_mausam_panchayats.geojson"}
    )
