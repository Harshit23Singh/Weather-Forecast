from typing import List, Optional, Dict, Any
import math
from app.schemas.location_schema import PanchayatLocation

# Curated High-Density Indian Gram Panchayat Registry
INDIAN_PANCHAYAT_REGISTRY: List[Dict[str, Any]] = [
    {
        "id": "gp-up-01",
        "name": "Barabanki (Banki)",
        "block": "Banki",
        "district": "Barabanki",
        "state": "Uttar Pradesh",
        "lat": 26.9274,
        "lon": 81.1822,
        "elevation_m": 125.0,
        "soil_type": "Alluvial Loam",
        "primary_crops": ["Paddy", "Wheat", "Mentha", "Mustard"],
        "agro_climatic_zone": "Middle Gangetic Plain (Zone 4)"
    },
    {
        "id": "gp-pb-01",
        "name": "Khanna (Dhamot)",
        "block": "Khanna",
        "district": "Ludhiana",
        "state": "Punjab",
        "lat": 30.7072,
        "lon": 76.2167,
        "elevation_m": 254.0,
        "soil_type": "Indo-Gangetic Clay Loam",
        "primary_crops": ["Basmati Rice", "Wheat", "Cotton", "Fodder Maize"],
        "agro_climatic_zone": "Trans-Gangetic Plain (Zone 6)"
    },
    {
        "id": "gp-mh-01",
        "name": "Baramati (Malegaon)",
        "block": "Baramati",
        "district": "Pune",
        "state": "Maharashtra",
        "lat": 18.1517,
        "lon": 74.5771,
        "elevation_m": 538.0,
        "soil_type": "Medium Black Soil",
        "primary_crops": ["Sugarcane", "Grapes", "Pomegranate", "Soybean"],
        "agro_climatic_zone": "Western Plateau & Hills (Zone 9)"
    },
    {
        "id": "gp-rj-01",
        "name": "Kishangarh (Harmara)",
        "block": "Kishangarh",
        "district": "Ajmer",
        "state": "Rajasthan",
        "lat": 26.5744,
        "lon": 74.8653,
        "elevation_m": 433.0,
        "soil_type": "Sandy Loam & Arid Regosols",
        "primary_crops": ["Bajra (Pearl Millet)", "Mustard", "Moong Dal", "Guar"],
        "agro_climatic_zone": "Western Dry Region (Zone 14)"
    },
    {
        "id": "gp-mp-01",
        "name": "Hoshangabad (Babai)",
        "block": "Makhan Nagar (Babai)",
        "district": "Narmadapuram",
        "state": "Madhya Pradesh",
        "lat": 22.7519,
        "lon": 77.7289,
        "elevation_m": 298.0,
        "soil_type": "Deep Black Vertisols",
        "primary_crops": ["Sharbati Wheat", "Soybean", "Gram (Chana)", "Paddy"],
        "agro_climatic_zone": "Central Plateau & Hills (Zone 8)"
    },
    {
        "id": "gp-gj-01",
        "name": "Anand (Boriavi)",
        "block": "Anand",
        "district": "Anand",
        "state": "Gujarat",
        "lat": 22.5645,
        "lon": 72.9289,
        "elevation_m": 39.0,
        "soil_type": "Goradu (Alluvial Sandy Loam)",
        "primary_crops": ["Tobacco", "Banana", "Castor", "Groundnut"],
        "agro_climatic_zone": "Gujarat Plains & Hills (Zone 13)"
    },
    {
        "id": "gp-ka-01",
        "name": "Mandya (Pandavapura)",
        "block": "Pandavapura",
        "district": "Mandya",
        "state": "Karnataka",
        "lat": 12.5218,
        "lon": 76.8951,
        "elevation_m": 692.0,
        "soil_type": "Red Sandy Loam",
        "primary_crops": ["Sugarcane", "Ragi (Finger Millet)", "Paddy", "Coconut"],
        "agro_climatic_zone": "Southern Plateau & Hills (Zone 10)"
    },
    {
        "id": "gp-hr-01",
        "name": "Karnal (Nilokheri)",
        "block": "Nilokheri",
        "district": "Karnal",
        "state": "Haryana",
        "lat": 29.6857,
        "lon": 76.9905,
        "elevation_m": 252.0,
        "soil_type": "Alluvial Silt Loam",
        "primary_crops": ["Paddy (PR-126)", "Wheat (HD-2967)", "Mustard", "Sugarcane"],
        "agro_climatic_zone": "Trans-Gangetic Plain (Zone 6)"
    }
]


class GeospatialService:
    """Service to search, filter, and calculate spatial distance across Indian Gram Panchayats."""

    def __init__(self):
        self.registry = [PanchayatLocation(**loc) for loc in INDIAN_PANCHAYAT_REGISTRY]

    def search_locations(self, query: str) -> List[PanchayatLocation]:
        """Fuzzy search by village, block, district, or state."""
        q = query.lower().strip()
        if not q:
            return self.registry

        results = []
        for loc in self.registry:
            if (
                q in loc.name.lower()
                or q in loc.block.lower()
                or q in loc.district.lower()
                or q in loc.state.lower()
                or any(q in crop.lower() for crop in loc.primary_crops)
            ):
                results.append(loc)
        return results

    def find_nearest_panchayat(self, lat: float, lon: float) -> PanchayatLocation:
        """Find the closest Gram Panchayat record using the Haversine distance formula."""
        def haversine_dist(lat1, lon1, lat2, lon2):
            R = 6371.0  # Earth radius in km
            dlat = math.radians(lat2 - lat1)
            dlon = math.radians(lon2 - lon1)
            a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
            c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
            return R * c

        return min(self.registry, key=lambda loc: haversine_dist(lat, lon, loc.lat, loc.lon))


geospatial_service = GeospatialService()
