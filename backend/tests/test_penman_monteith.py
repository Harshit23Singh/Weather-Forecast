import pytest
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT_DIR))

from ml_engine.physics.penman_monteith import fao_penman_monteith


def test_fao56_penman_monteith_eto():
    # Representative summer conditions in Indo-Gangetic Plains
    eto_data = fao_penman_monteith.calculate_eto(
        temp_mean_c=28.0,
        temp_max_c=34.0,
        temp_min_c=22.0,
        humidity_mean_pct=65.0,
        wind_speed_2m_ms=2.5,
        solar_radiation_mj_m2=22.0,
        elevation_m=200.0,
        lat_deg=26.9,
        day_of_year=105
    )

    assert "eto_reference_mm_day" in eto_data
    assert eto_data["eto_reference_mm_day"] > 3.0
    assert eto_data["eto_reference_mm_day"] < 10.0
    assert eto_data["atmospheric_pressure_kpa"] > 90.0
