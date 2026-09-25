import math
from typing import Dict, Any


class SoilWaterBalanceModel:
    """
    FAO Dual Crop Coefficient (Kc = Kcb + Ke) & Soil Water Deficit Index (SWDI) Engine.
    Simulates root zone water depletion (Dr), total available water (TAW),
    readily available water (RAW), and soil water stress coefficient (Ks).
    """

    SOIL_PROPERTIES = {
        "alluvial_loam": {"field_capacity": 0.30, "wilting_point": 0.12},
        "black_vertisol": {"field_capacity": 0.42, "wilting_point": 0.22},
        "sandy_loam": {"field_capacity": 0.18, "wilting_point": 0.08},
        "red_loam": {"field_capacity": 0.25, "wilting_point": 0.11}
    }

    CROP_BASAL_COEFFICIENTS = {
        "wheat": {"kcb_ini": 0.15, "kcb_mid": 1.10, "kcb_end": 0.20, "root_depth_m": 1.2, "p_depletion": 0.55},
        "paddy": {"kcb_ini": 1.05, "kcb_mid": 1.20, "kcb_end": 0.90, "root_depth_m": 0.6, "p_depletion": 0.20},
        "mustard": {"kcb_ini": 0.20, "kcb_mid": 1.05, "kcb_end": 0.25, "root_depth_m": 1.0, "p_depletion": 0.60},
        "cotton": {"kcb_ini": 0.15, "kcb_mid": 1.15, "kcb_end": 0.50, "root_depth_m": 1.4, "p_depletion": 0.65}
    }

    @classmethod
    def calculate_root_zone_water_balance(
        cls,
        crop: str,
        soil_type: str,
        current_soil_moisture: float,
        eto_mm_day: float,
        rainfall_mm: float
    ) -> Dict[str, Any]:
        crop_key = crop.lower().strip()
        crop_param = cls.CROP_BASAL_COEFFICIENTS.get(crop_key, cls.CROP_BASAL_COEFFICIENTS["wheat"])

        soil_key = soil_type.lower().replace(" ", "_")
        soil_param = cls.SOIL_PROPERTIES.get(soil_key, cls.SOIL_PROPERTIES["alluvial_loam"])

        fc = soil_param["field_capacity"]
        wp = soil_param["wilting_point"]
        zr = crop_param["root_depth_m"]
        p = crop_param["p_depletion"]

        # Total Available Water (TAW) in mm
        taw = 1000.0 * (fc - wp) * zr

        # Readily Available Water (RAW) in mm
        raw = p * taw

        # Current root zone available water (mm)
        theta = max(wp, min(fc, current_soil_moisture))
        available_water_mm = 1000.0 * (theta - wp) * zr

        # Root Zone Depletion (Dr)
        dr = max(0.0, taw - available_water_mm)

        # Water Stress Coefficient (Ks)
        if dr <= raw:
            ks = 1.0
        else:
            ks = max(0.0, (taw - dr) / ((1.0 - p) * taw + 1e-6))

        # Actual Crop Evapotranspiration (ETc_adj)
        etc_adj = ks * crop_param["kcb_mid"] * eto_mm_day

        # Soil Water Deficit Index (SWDI: ranges from -10 (severe deficit) to +2 (waterlogged))
        swdi = 10.0 * ((theta - fc) / (fc - wp))

        return {
            "crop": crop,
            "soil_type": soil_type,
            "total_available_water_taw_mm": round(taw, 1),
            "readily_available_water_raw_mm": round(raw, 1),
            "root_zone_depletion_dr_mm": round(dr, 1),
            "water_stress_coefficient_ks": round(ks, 3),
            "actual_crop_evapotranspiration_etc_mm": round(etc_adj, 2),
            "soil_water_deficit_index_swdi": round(swdi, 2),
            "irrigation_urgency": "IMMEDIATE" if dr > raw else "NORMAL"
        }


soil_water_balance = SoilWaterBalanceModel()
