import pytest
import sys
from pathlib import Path

# Add project root and backend to path
ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR))
sys.path.insert(0, str(ROOT_DIR / "backend"))

from ml_engine.models.spatial_interpolator import spatial_interpolator
from ml_engine.models.crop_risk_classifier import crop_risk_classifier


def test_spatial_downscaling_physics():
    # Base: 30°C at 200m elevation
    # Target: 1200m elevation (+1000m)
    # Expected lapse drop: approx -6.5°C -> 23.5°C
    res = spatial_interpolator.downscale_point(
        base_temp=30.0,
        base_humidity=60.0,
        base_elevation=200.0,
        target_elevation=1200.0
    )

    assert res["downscaled_temperature"] == 23.5
    assert res["downscaled_humidity"] > 60.0  # RH rises as temp falls
    assert res["elevation_offset_applied_m"] == 1000.0


def test_crop_pest_risk_classifier():
    # Test high pest vulnerability conditions in Wheat (Cloudy/humid)
    res = crop_risk_classifier.predict_risk(
        crop="Wheat",
        avg_temp=18.0,
        avg_humidity=85.0,
        rain_sum_mm=0.0,
        wind_speed_kmh=6.0,
        soil_moisture_vol=0.35
    )

    assert res["crop_evaluated"] == "Wheat"
    assert res["overall_pest_risk_index"] >= 0.80
    assert len(res["pest_alerts"]) > 0
    assert res["field_operations"]["chemical_spray_suitability"] == "OPTIMAL"
