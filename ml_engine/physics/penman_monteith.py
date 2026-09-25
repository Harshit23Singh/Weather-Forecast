import math
from typing import Dict, Any
from ml_engine.physics.radiation_model import SolarRadiationModel


class FAO56PenmanMonteith:
    """
    Standard FAO-56 Penman-Monteith Reference Evapotranspiration (ETo) Model.
    Calculates reference grass evapotranspiration rate (mm/day) using aerodynamic resistance,
    net radiation, surface pressure, and atmospheric psychrometric balance.
    """

    @staticmethod
    def calculate_eto(
        temp_mean_c: float,
        temp_max_c: float,
        temp_min_c: float,
        humidity_mean_pct: float,
        wind_speed_2m_ms: float,
        solar_radiation_mj_m2: float,
        elevation_m: float,
        lat_deg: float,
        day_of_year: int
    ) -> Dict[str, Any]:
        # 1. Atmospheric Pressure (P in kPa)
        p = 101.3 * math.pow((293.0 - 0.0065 * elevation_m) / 293.0, 5.26)

        # 2. Psychrometric Constant (gamma in kPa / °C)
        gamma = 0.000665 * p

        # 3. Slope of Vapor Pressure Curve (delta in kPa / °C)
        delta = (4098.0 * (0.6108 * math.exp((17.27 * temp_mean_c) / (temp_mean_c + 237.3)))) / math.pow(temp_mean_c + 237.3, 2)

        # 4. Saturation Vapor Pressure (es in kPa)
        es_tmax = 0.6108 * math.exp((17.27 * temp_max_c) / (temp_max_c + 237.3))
        es_tmin = 0.6108 * math.exp((17.27 * temp_min_c) / (temp_min_c + 237.3))
        es = (es_tmax + es_tmin) / 2.0

        # 5. Actual Vapor Pressure (ea in kPa)
        ea = (humidity_mean_pct / 100.0) * es

        # 6. Net Radiation (Rn in MJ / m^2 / day)
        # Net solar radiation (Rns) with standard albedo 0.23 for reference grass
        albedo = 0.23
        rns = (1.0 - albedo) * solar_radiation_mj_m2

        # Net longwave radiation (Rnl)
        sigma = 4.903e-9  # Stefan-Boltzmann constant MJ / (K^4 * m^2 * day)
        t_max_k = temp_max_c + 273.16
        t_min_k = temp_min_c + 273.16
        
        ra = SolarRadiationModel.extraterrestrial_radiation(lat_deg, day_of_year)
        rso = SolarRadiationModel.clear_sky_radiation(ra, elevation_m)
        cloud_factor = 1.35 * (solar_radiation_mj_m2 / max(0.1, rso)) - 0.35
        cloud_factor = max(0.05, min(1.0, cloud_factor))

        rnl = sigma * ((math.pow(t_max_k, 4) + math.pow(t_min_k, 4)) / 2.0) * (0.34 - 0.14 * math.sqrt(ea)) * cloud_factor
        rn = rns - rnl

        # Soil Heat Flux Density (G ≈ 0 for daily intervals)
        g = 0.0

        # 7. FAO-56 Penman-Monteith Equation
        # ETo = (0.408 * delta * (Rn - G) + gamma * (900 / (T + 273)) * u2 * (es - ea)) / (delta + gamma * (1 + 0.34 * u2))
        u2 = wind_speed_2m_ms
        numerator_rad = 0.408 * delta * (rn - g)
        numerator_aero = gamma * (900.0 / (temp_mean_c + 273.0)) * u2 * (es - ea)
        denominator = delta + gamma * (1.0 + 0.34 * u2)

        eto_mm_day = (numerator_rad + numerator_aero) / denominator
        eto_mm_day = max(0.0, eto_mm_day)

        return {
            "eto_reference_mm_day": round(eto_mm_day, 2),
            "net_radiation_mj_m2": round(rn, 2),
            "vapor_pressure_deficit_kpa": round(es - ea, 3),
            "atmospheric_pressure_kpa": round(p, 2),
            "psychrometric_constant": round(gamma, 4),
            "aerodynamic_component": round(numerator_aero / denominator, 2),
            "radiation_component": round(numerator_rad / denominator, 2)
        }


fao_penman_monteith = FAO56PenmanMonteith()
