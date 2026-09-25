from pydantic import BaseModel, Field
from typing import List, Optional


class CurrentWeather(BaseModel):
    temperature: float = Field(..., description="Air temperature in Celsius")
    relative_humidity: float = Field(..., description="Relative humidity in percentage")
    apparent_temperature: float = Field(..., description="Feels-like temperature in Celsius")
    precipitation: float = Field(..., description="Precipitation in mm")
    rain: float = Field(..., description="Rain in mm")
    weather_code: int = Field(..., description="WMO weather interpretation code")
    surface_pressure: float = Field(..., description="Surface atmospheric pressure in hPa")
    wind_speed_10m: float = Field(..., description="Wind speed at 10m in km/h")
    wind_direction_10m: float = Field(..., description="Wind direction in degrees")
    uv_index: Optional[float] = Field(None, description="Ultraviolet index")
    soil_temperature_0cm: Optional[float] = Field(None, description="Surface soil temperature in Celsius")
    soil_moisture_0_to_1cm: Optional[float] = Field(None, description="Volumetric soil moisture m³/m³")


class HourlyWeather(BaseModel):
    time: List[str]
    temperature_2m: List[float]
    relative_humidity_2m: List[float]
    precipitation_probability: List[float]
    precipitation: List[float]
    rain: List[float]
    weather_code: List[int]
    surface_pressure: List[float]
    wind_speed_10m: List[float]
    soil_moisture_0_to_1cm: Optional[List[float]] = None
    et0_fao_evapotranspiration: Optional[List[float]] = None


class DailyWeather(BaseModel):
    time: List[str]
    weather_code: List[int]
    temperature_2m_max: List[float]
    temperature_2m_min: List[float]
    precipitation_sum: List[float]
    rain_sum: List[float]
    precipitation_probability_max: List[float]
    wind_speed_10m_max: List[float]
    uv_index_max: Optional[List[float]] = None
    et0_fao_evapotranspiration: Optional[List[float]] = None


class WeatherForecastResponse(BaseModel):
    latitude: float
    longitude: float
    elevation: float
    timezone: str
    current: CurrentWeather
    hourly: HourlyWeather
    daily: DailyWeather
