import math


class SolarRadiationModel:
    """
    Computes extraterrestrial solar radiation (Ra) and clear-sky solar radiation (Rso)
    based on FAO Irrigation and Drainage Paper No. 56.
    """

    @staticmethod
    def extraterrestrial_radiation(lat_deg: float, day_of_year: int) -> float:
        """
        Calculate extraterrestrial radiation Ra in MJ / m^2 / day.
        """
        lat_rad = math.radians(lat_deg)
        dr = 1 + 0.033 * math.cos(2 * math.pi * day_of_year / 365)
        solar_dec = 0.409 * math.sin((2 * math.pi * day_of_year / 365) - 1.39)

        # Sunset hour angle
        tan_lat_dec = -math.tan(lat_rad) * math.tan(solar_dec)
        tan_lat_dec = max(-1.0, min(1.0, tan_lat_dec))
        ws = math.acos(tan_lat_dec)

        g_sc = 0.0820  # Solar constant MJ / m^2 / min
        ra = (24 * 60 / math.pi) * g_sc * dr * (
            ws * math.sin(lat_rad) * math.sin(solar_dec)
            + math.cos(lat_rad) * math.cos(solar_dec) * math.sin(ws)
        )
        return max(0.0, ra)

    @staticmethod
    def clear_sky_radiation(ra: float, elevation_m: float) -> float:
        """Calculate clear-sky solar radiation Rso (MJ / m^2 / day)."""
        return (0.75 + 2e-5 * elevation_m) * ra
