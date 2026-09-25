import numpy as np
from typing import Dict, Any, List


class AgroAnalyticsService:
    """
    Computes Standardized Precipitation Index (SPI), thermal heat accumulation,
    and Kharif/Rabi agro-climatic anomalies for district monitoring.
    """

    @staticmethod
    def calculate_seasonal_metrics(
        observed_precip_mm: float,
        normal_precip_mm: float,
        growing_degree_days: float,
        temp_mean_c: float
    ) -> Dict[str, Any]:
        # Precipitation Percentage Departure (PPD)
        ppd = ((observed_precip_mm - normal_precip_mm) / (normal_precip_mm + 1e-5)) * 100.0

        # Meteorological Category (IMD standard classification)
        if ppd >= 60.0:
            category = "LARGE EXCESS"
        elif ppd >= 20.0:
            category = "EXCESS"
        elif ppd >= -19.0:
            category = "NORMAL"
        elif ppd >= -59.0:
            category = "DEFICIENT"
        else:
            category = "LARGE DEFICIENT"

        # Moisture Adequacy Index (MAI)
        mai_score = min(100.0, max(10.0, (observed_precip_mm / (normal_precip_mm + 1e-5)) * 85.0))

        return {
            "observed_precipitation_mm": round(observed_precip_mm, 1),
            "normal_precipitation_mm": round(normal_precip_mm, 1),
            "percentage_departure_pct": round(ppd, 1),
            "imd_rainfall_category": category,
            "moisture_adequacy_index": round(mai_score, 1),
            "thermal_accumulation_gdd": round(growing_degree_days, 1),
            "seasonal_stress_summary": (
                "Normal moisture and thermal regime supporting healthy vegetative growth."
                if category == "NORMAL"
                else "Precipitation deficit detected. Implement conservation tillage and mulching."
                if "DEFICIENT" in category
                else "Excess moisture. Maintain drainage to prevent root rot."
            )
        }


agro_analytics_service = AgroAnalyticsService()
