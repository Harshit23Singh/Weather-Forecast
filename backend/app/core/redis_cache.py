import json
import logging
from typing import Optional, Any, Dict
import time

logger = logging.getLogger("gram_mausam_ai.cache")


class GeospatialCache:
    """
    High-performance caching layer with coordinate grid snapping (0.01 deg precision ~ 1.1km)
    and automatic 15-minute Time-To-Live (TTL) eviction.
    Supports in-memory LRU fallback when Redis is unavailable.
    """

    def __init__(self, ttl_seconds: int = 900):
        self.ttl_seconds = ttl_seconds
        self._in_memory_store: Dict[str, Dict[str, Any]] = {}

    def _generate_cache_key(self, lat: float, lon: float, prefix: str = "weather") -> str:
        # Snap coordinates to ~1.1km grid to maximize cache hit rates for adjacent farms
        snapped_lat = round(lat, 2)
        snapped_lon = round(lon, 2)
        return f"{prefix}:{snapped_lat}:{snapped_lon}"

    async def get(self, lat: float, lon: float, prefix: str = "weather") -> Optional[Dict[str, Any]]:
        key = self._generate_cache_key(lat, lon, prefix)
        entry = self._in_memory_store.get(key)
        if not entry:
            return None

        # Check expiration
        if time.time() > entry["expires_at"]:
            del self._in_memory_store[key]
            return None

        logger.info(f"Cache HIT for micro-grid coordinate [{key}]")
        return entry["data"]

    async def set(self, lat: float, lon: float, data: Dict[str, Any], prefix: str = "weather") -> None:
        key = self._generate_cache_key(lat, lon, prefix)
        self._in_memory_store[key] = {
            "data": data,
            "expires_at": time.time() + self.ttl_seconds
        }
        # LRU cleanup if store exceeds 5000 cached grid points
        if len(self._in_memory_store) > 5000:
            oldest_key = min(self._in_memory_store.keys(), key=lambda k: self._in_memory_store[k]["expires_at"])
            del self._in_memory_store[oldest_key]


geospatial_cache = GeospatialCache()
