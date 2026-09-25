import pytest
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR))

from ml_engine.physics.soil_water_balance import soil_water_balance


def test_soil_water_balance_depletion():
    # Test drought condition on Wheat in Alluvial soil
    res = soil_water_balance.calculate_root_zone_water_balance(
        crop="Wheat",
        soil_type="alluvial_loam",
        current_soil_moisture=0.14,  # Close to wilting point 0.12
        eto_mm_day=5.5,
        rainfall_mm=0.0
    )

    assert res["crop"] == "Wheat"
    assert res["irrigation_urgency"] == "IMMEDIATE"
    assert res["water_stress_coefficient_ks"] < 1.0
    assert res["soil_water_deficit_index_swdi"] < 0.0


def test_soil_water_balance_optimal():
    # Test well-watered field condition
    res = soil_water_balance.calculate_root_zone_water_balance(
        crop="Wheat",
        soil_type="alluvial_loam",
        current_soil_moisture=0.28,  # Near field capacity 0.30
        eto_mm_day=4.2,
        rainfall_mm=10.0
    )

    assert res["irrigation_urgency"] == "NORMAL"
    assert res["water_stress_coefficient_ks"] == 1.0
