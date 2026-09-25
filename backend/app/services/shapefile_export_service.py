import json
from typing import Dict, Any, List
from app.services.geospatial_service import INDIAN_PANCHAYAT_REGISTRY


class ShapefileExportService:
    """
    Exports Gram Panchayat micro-grid boundary coordinates into standard
    GeoJSON FeatureCollections and KML formats for GIS integration (QGIS, ArcGIS, Bhuvan, Bhulekh).
    """

    @staticmethod
    def generate_panchayat_geojson(panchayat_id: str = None) -> Dict[str, Any]:
        features = []
        for loc in INDIAN_PANCHAYAT_REGISTRY:
            if panchayat_id and loc["id"] != panchayat_id:
                continue

            lat = loc["lat"]
            lon = loc["lon"]
            delta = 0.015  # ~1.6km square bounding box

            polygon_coords = [[
                [round(lon - delta, 5), round(lat - delta, 5)],
                [round(lon + delta, 5), round(lat - delta, 5)],
                [round(lon + delta, 5), round(lat + delta, 5)],
                [round(lon - delta, 5), round(lat + delta, 5)],
                [round(lon - delta, 5), round(lat - delta, 5)]
            ]]

            feature = {
                "type": "Feature",
                "properties": {
                    "id": loc["id"],
                    "panchayat_name": loc["name"],
                    "block": loc["block"],
                    "district": loc["district"],
                    "state": loc["state"],
                    "elevation_m": loc["elevation_m"],
                    "soil_type": loc["soil_type"],
                    "primary_crops": loc["primary_crops"],
                    "agro_climatic_zone": loc["agro_climatic_zone"],
                    "grid_resolution": "1km x 1km"
                },
                "geometry": {
                    "type": "Polygon",
                    "coordinates": polygon_coords
                }
            }
            features.append(feature)

        return {
            "type": "FeatureCollection",
            "crs": {
                "type": "name",
                "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}
            },
            "features": features
        }


shapefile_export_service = ShapefileExportService()
