import numpy as np
from typing import Dict, Any, List


class ExtremeEventForecaster:
    """
    Forecasting model for sudden convective storms, heat dome anomalies,
    unseasonal hailstorms, and flash drought risk.
    Evaluates atmospheric thermodynamic instability indices (CAPE / Lifted Index approximation).
    """

    @staticmethod
    def evaluate_convective_and_heat_hazard(
        temp_max_c: float,
        dew_point_c: float,
        surface_pressure_hpa: float,
        wind_gust_kmh: float,
        precipitation_sum_7d: float
    ) -> Dict[str, Any]:
        """
        Calculates convective available potential energy proxy (CAPE) & drought indices.
        """
        # Thermodynamic buoyancy proxy
        # Approximation of Convective Available Potential Energy
        delta_t_dew = temp_max_c - dew_point_c
        cape_proxy = max(0.0, (temp_max_c * 40.0) - (delta_t_dew * 60.0) + (1013.25 - surface_pressure_hpa) * 15.0)

        # Heatwave severity Index
        heatwave_risk = "CRITICAL" if temp_max_c >= 42.0 else "ELEVATED" if temp_max_c >= 38.0 else "NORMAL"

        # Convective storm / Squall risk
        squall_risk = "HIGH" if (cape_proxy > 1500.0 and wind_gust_kmh > 35.0) else "MODERATE" if cape_proxy > 800.0 else "LOW"

        # Flash Drought Vulnerability (High thermal demand + prolonged zero rainfall)
        flash_drought = (temp_max_c > 36.0 and precipitation_sum_7d < 2.0 and delta_t_dew > 15.0)

        return {
            "convective_energy_cape_j_kg": round(cape_proxy, 1),
            "heatwave_severity": heatwave_risk,
            "squall_convective_risk": squall_risk,
            "flash_drought_vulnerability": flash_drought,
            "early_action_advisory": (
                "High convective squall potential. Secure orchard fruit nets and stake tall standing crops."
                if squall_risk == "HIGH"
                else "Severe heatwave condition. Maintain continuous mulching to prevent soil moisture cracking."
                if heatwave_risk == "CRITICAL"
                else "No extreme thermal or convective anomalies detected in 72h window."
            )
        }


extreme_event_forecaster = ExtremeEventForecaster()
