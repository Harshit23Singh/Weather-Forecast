from typing import Dict, List, Any


class GrowingDegreeDaysCalculator:
    """
    Computes Growing Degree Days (GDD) / Thermal Units for Indian crop phenology stages.
    GDD = max(0, ((T_max + T_min) / 2) - T_base)
    """

    # Base temperatures (°C) per ICAR (Indian Council of Agricultural Research)
    BASE_TEMPERATURES: Dict[str, float] = {
        "wheat": 5.0,
        "paddy": 10.0,
        "rice": 10.0,
        "cotton": 12.0,
        "sugarcane": 15.0,
        "mustard": 5.0,
        "soybean": 10.0,
        "maize": 10.0,
        "gram": 7.0,
        "chana": 7.0,
        "bajra": 12.0
    }

    @classmethod
    def compute_daily_gdd(cls, crop: str, t_max: float, t_min: float) -> float:
        crop_key = crop.lower().strip()
        t_base = cls.BASE_TEMPERATURES.get(crop_key, 10.0)
        t_mean = (t_max + t_min) / 2.0
        return max(0.0, round(t_mean - t_base, 2))

    @classmethod
    def compute_accumulated_gdd(cls, crop: str, daily_temperatures: List[Dict[str, float]]) -> Dict[str, Any]:
        daily_vals = [
            cls.compute_daily_gdd(crop, d["t_max"], d["t_min"])
            for d in daily_temperatures
        ]
        total_gdd = sum(daily_vals)
        return {
            "crop": crop,
            "accumulated_gdd": round(total_gdd, 2),
            "daily_gdd_series": daily_vals,
            "base_temperature_used": cls.BASE_TEMPERATURES.get(crop.lower(), 10.0)
        }


gdd_calculator = GrowingDegreeDaysCalculator()
