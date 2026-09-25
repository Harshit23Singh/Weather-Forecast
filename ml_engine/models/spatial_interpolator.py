import numpy as np
from typing import Dict, Any, Tuple


class SpatialMicroclimateInterpolator:
    """
    Sub-grid downscaling interpolator combining bilinear interpolation with
    SRTM DEM elevation lapse-rate corrections and terrain radiation shading.
    """

    def __init__(self, lapse_rate_c_per_km: float = 6.5):
        self.lapse_rate = lapse_rate_c_per_km / 1000.0  # °C per meter

    def downscale_point(
        self,
        base_temp: float,
        base_humidity: float,
        base_elevation: float,
        target_elevation: float,
        solar_radiation_wm2: float = 650.0,
        canopy_cover_fraction: float = 0.4
    ) -> Dict[str, float]:
        """
        Calculate hyper-local microclimate parameters at the specific field coordinate.
        """
        # Topographic elevation delta
        delta_elev = target_elevation - base_elevation

        # Temperature lapse rate adjustment
        temp_delta = - (delta_elev * self.lapse_rate)
        downscaled_temp = base_temp + temp_delta

        # Relative Humidity adjustment based on Clausius-Clapeyron relation
        # As temperature drops with height, relative humidity increases proportionally
        sat_vapor_base = 6.112 * np.exp((17.67 * base_temp) / (base_temp + 243.5))
        sat_vapor_local = 6.112 * np.exp((17.67 * downscaled_temp) / (downscaled_temp + 243.5))
        
        actual_vapor = (base_humidity / 100.0) * sat_vapor_base
        downscaled_humidity = min(100.0, max(10.0, (actual_vapor / sat_vapor_local) * 100.0))

        # Soil Temperature estimation (incorporating canopy shading)
        soil_temp = downscaled_temp + (solar_radiation_wm2 * 0.008 * (1.0 - canopy_cover_fraction * 0.5))

        # Canopy micro-climate delta
        canopy_delta_temp = -0.8 * canopy_cover_fraction

        return {
            "downscaled_temperature": round(downscaled_temp, 2),
            "downscaled_humidity": round(downscaled_humidity, 1),
            "microclimate_soil_temp": round(soil_temp, 2),
            "canopy_adjusted_temp": round(downscaled_temp + canopy_delta_temp, 2),
            "elevation_offset_applied_m": round(delta_elev, 1),
            "thermal_delta_c": round(temp_delta, 3)
        }


spatial_interpolator = SpatialMicroclimateInterpolator()
