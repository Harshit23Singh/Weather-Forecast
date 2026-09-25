import { searchLocalAgriDatabase, INDIAN_AGRI_LOCATIONS } from './indianLocationsData';

export interface CurrentWeatherData {
  time: string;
  temperature: number;
  feelsLike: number;
  humidity: number;
  rainfall: number;
  pressure: number;
  windSpeed: number;
  windDirection: number;
  weatherCode: number;
  weatherDescription: string;
  isDay: boolean;
  cloudCover: number;
  uvIndex?: number;
}

export interface HourlyForecastItem {
  time: string; // HH:mm
  fullTime: string; // ISO string
  temp: number;
  rain: number;
  rainProb: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  weatherDescription: string;
}

export interface DailyForecastItem {
  date: string;
  dayName: string;
  tempMax: number;
  tempMin: number;
  rainSum: number;
  rainProbMax: number;
  weatherCode: number;
  weatherDescription: string;
  windMax: number;
}

export interface LocationInfo {
  name: string;
  panchayat?: string;
  block?: string;
  district?: string;
  state?: string;
  country?: string;
  lat: number;
  lng: number;
}

export interface AgroAdvisoryItem {
  type: 'irrigation' | 'spraying' | 'disease' | 'harvest' | 'field_work' | 'temperature';
  status: 'positive' | 'warning' | 'danger' | 'info';
  title: string;
  summary: string;
  details: string[];
}

export interface WeatherDataResult {
  current: CurrentWeatherData;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  advisories: AgroAdvisoryItem[];
  elevation?: number;
  timezone?: string;
}

// Default regional presets
export const PRESET_PANCHAYATS: LocationInfo[] = INDIAN_AGRI_LOCATIONS.slice(0, 8);

export function getWeatherDescription(code: number): { description: string; iconType: string } {
  switch (code) {
    case 0:
      return { description: 'Clear sky', iconType: 'sun' };
    case 1:
      return { description: 'Mainly clear', iconType: 'sun-cloud' };
    case 2:
      return { description: 'Partly cloudy', iconType: 'cloud-sun' };
    case 3:
      return { description: 'Overcast', iconType: 'cloud' };
    case 45:
    case 48:
      return { description: 'Fog / Mist', iconType: 'fog' };
    case 51:
    case 53:
    case 55:
      return { description: 'Light Drizzle', iconType: 'drizzle' };
    case 56:
    case 57:
      return { description: 'Freezing Drizzle', iconType: 'drizzle' };
    case 61:
      return { description: 'Slight Rain', iconType: 'rain-light' };
    case 63:
      return { description: 'Moderate Rain', iconType: 'rain' };
    case 65:
      return { description: 'Heavy Rain', iconType: 'rain-heavy' };
    case 66:
    case 67:
      return { description: 'Freezing Rain', iconType: 'rain' };
    case 71:
    case 73:
    case 75:
      return { description: 'Snowfall', iconType: 'snow' };
    case 77:
      return { description: 'Snow grains', iconType: 'snow' };
    case 80:
      return { description: 'Slight Rain Showers', iconType: 'rain-light' };
    case 81:
      return { description: 'Moderate Rain Showers', iconType: 'rain' };
    case 82:
      return { description: 'Violent Rain Showers', iconType: 'rain-heavy' };
    case 85:
    case 86:
      return { description: 'Snow Showers', iconType: 'snow' };
    case 95:
      return { description: 'Thunderstorm', iconType: 'thunderstorm' };
    case 96:
    case 99:
      return { description: 'Thunderstorm with Hail', iconType: 'thunderstorm' };
    default:
      return { description: 'Fair', iconType: 'sun-cloud' };
  }
}

export function generateDynamicAdvisories(
  current: CurrentWeatherData,
  hourly: HourlyForecastItem[],
  daily: DailyForecastItem[]
): AgroAdvisoryItem[] {
  const next24hRain = hourly.slice(0, 24).reduce((sum, h) => sum + (h.rain || 0), 0);
  const maxRainProb24h = Math.max(...hourly.slice(0, 24).map(h => h.rainProb || 0), 0);
  const maxWindNext12h = Math.max(...hourly.slice(0, 12).map(h => h.windSpeed || 0), 0);
  const maxTemp3Days = Math.max(...daily.slice(0, 3).map(d => d.tempMax || 0), current.temperature);
  const minTemp3Days = Math.min(...daily.slice(0, 3).map(d => d.tempMin || 0), current.temperature);

  const advisories: AgroAdvisoryItem[] = [];

  // 1. Irrigation Advisory
  if (next24hRain >= 10 || maxRainProb24h >= 65) {
    advisories.push({
      type: 'irrigation',
      status: 'warning',
      title: 'Rain Inbound - Postpone Irrigation',
      summary: `Estimated ${next24hRain.toFixed(1)} mm rainfall expected within 24 hours (${maxRainProb24h}% probability).`,
      details: [
        'Postpone scheduled irrigation for standing crops to avoid root rot and nutrient leaching.',
        'Ensure field drainage channels and furrow outlets are cleared immediately.',
        'Conserve farm electricity and groundwater by utilizing natural precipitation.'
      ]
    });
  } else if (next24hRain >= 2 || maxRainProb24h >= 40) {
    advisories.push({
      type: 'irrigation',
      status: 'info',
      title: 'Light Showers Likely - Delay Full Irrigation',
      summary: `Light rainfall (${next24hRain.toFixed(1)} mm) predicted across the local agro-grid.`,
      details: [
        'Hold full irrigation for 24 hours and evaluate topsoil moisture.',
        'If soil moisture is depleted, provide light surface wetting only.'
      ]
    });
  } else {
    advisories.push({
      type: 'irrigation',
      status: 'positive',
      title: 'Optimal Irrigation Window',
      summary: 'Dry weather projected for the next 48-72 hours with minimal rain probability.',
      details: [
        'Proceed with planned irrigation schedules as per crop phenology requirements.',
        'Early morning or late evening drip/furrow irrigation is recommended to prevent evapotranspiration losses.'
      ]
    });
  }

  // 2. Chemical Spraying / Agro-chemical Advisory
  if (maxWindNext12h > 18) {
    advisories.push({
      type: 'spraying',
      status: 'danger',
      title: 'High Wind Alert - Avoid Spraying',
      summary: `Wind speeds reaching up to ${maxWindNext12h.toFixed(1)} km/h. High spray drift loss.`,
      details: [
        'Do not spray pesticides, insecticides, or foliar fertilizers due to high drift off-target risk.',
        'Wait for wind speeds to drop below 12 km/h (typically early morning).'
      ]
    });
  } else if (maxRainProb24h > 50 || next24hRain > 3) {
    advisories.push({
      type: 'spraying',
      status: 'warning',
      title: 'Rain Hazard - Postpone Foliar Sprays',
      summary: 'Precipitation expected in the next 12-24 hours will wash off applied chemicals.',
      details: [
        'Avoid foliar sprays until clear sky conditions are established.',
        'If urgent prophylactic spraying is necessary, mix a certified rain-fast adjuvant.'
      ]
    });
  } else {
    advisories.push({
      type: 'spraying',
      status: 'positive',
      title: 'Favorable Spraying Window',
      summary: `Calm wind conditions (${current.windSpeed.toFixed(1)} km/h) and dry weather.`,
      details: [
        'Ideal time for protective fungicide, insecticide, or micronutrient applications.',
        'Recommended application window: 07:00 AM - 10:30 AM or 04:30 PM - 06:30 PM.'
      ]
    });
  }

  // 3. Thermal / Heat & Cold Stress Advisory
  if (maxTemp3Days >= 36) {
    advisories.push({
      type: 'temperature',
      status: 'warning',
      title: 'Heat Stress Advisory',
      summary: `Afternoon peak temperatures reaching ${maxTemp3Days.toFixed(1)}°C over the next 3 days.`,
      details: [
        'Apply organic mulching (straw/stubble) in vegetable and horticultural beds to conserve soil moisture.',
        'Ensure livestock sheds are well-shaded and provide clean drinking water with electrolytes.',
        'Avoid transplanting tender seedlings during peak afternoon heat.'
      ]
    });
  } else if (minTemp3Days <= 6) {
    advisories.push({
      type: 'temperature',
      status: 'warning',
      title: 'Frost Risk Advisory',
      summary: `Night minimum temperatures dropping to ${minTemp3Days.toFixed(1)}°C.`,
      details: [
        'Give light irrigation during the evening to elevate root zone temperature against frost.',
        'Cover vulnerable nursery beds with thatch or polythene sheets at sunset.'
      ]
    });
  } else {
    advisories.push({
      type: 'field_work',
      status: 'positive',
      title: 'General Field Operations',
      summary: `Favorable thermal range (${minTemp3Days.toFixed(1)}°C - ${maxTemp3Days.toFixed(1)}°C).`,
      details: [
        'Optimal conditions for intercultural operations, weeding, fertilizer top-dressing, and harvest.',
        'Maintain regular field scouting for pests and nutritional deficiencies.'
      ]
    });
  }

  return advisories;
}

export async function fetchLiveWeatherData(lat: number, lng: number): Promise<WeatherDataResult> {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,precipitation,rain,weather_code,surface_pressure,cloud_cover,wind_speed_10m,wind_direction_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,precipitation_probability_max,wind_speed_10m_max&timezone=auto&forecast_days=7`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  const data = await response.json();

  // Current Weather
  const cur = data.current;
  const weatherDesc = getWeatherDescription(cur.weather_code);

  const current: CurrentWeatherData = {
    time: cur.time,
    temperature: Math.round(cur.temperature_2m * 10) / 10,
    feelsLike: Math.round(cur.apparent_temperature * 10) / 10,
    humidity: cur.relative_humidity_2m,
    rainfall: Math.round((cur.precipitation || cur.rain || 0) * 10) / 10,
    pressure: Math.round(cur.surface_pressure || 1012),
    windSpeed: Math.round(cur.wind_speed_10m * 10) / 10,
    windDirection: cur.wind_direction_10m,
    weatherCode: cur.weather_code,
    weatherDescription: weatherDesc.description,
    isDay: cur.is_day === 1,
    cloudCover: cur.cloud_cover,
    uvIndex: data.hourly?.uv_index ? data.hourly.uv_index[0] : 4
  };

  // Hourly Data (Next 24-48 hours)
  const hourlyTimes: string[] = data.hourly.time;
  const currentIsoHour = new Date(cur.time).toISOString().slice(0, 13);
  let startIndex = hourlyTimes.findIndex(t => t.startsWith(currentIsoHour));
  if (startIndex === -1) startIndex = 0;

  const hourly: HourlyForecastItem[] = [];
  const count = Math.min(24, hourlyTimes.length - startIndex);

  for (let i = 0; i < count; i++) {
    const idx = startIndex + i;
    const timeStr = hourlyTimes[idx];
    const dateObj = new Date(timeStr);
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const timeFormatted = `${hours}:00`;
    const wCode = data.hourly.weather_code[idx];

    hourly.push({
      time: timeFormatted,
      fullTime: timeStr,
      temp: Math.round(data.hourly.temperature_2m[idx] * 10) / 10,
      rain: Math.round((data.hourly.precipitation[idx] || data.hourly.rain[idx] || 0) * 10) / 10,
      rainProb: data.hourly.precipitation_probability[idx] || 0,
      humidity: data.hourly.relative_humidity_2m[idx],
      windSpeed: Math.round(data.hourly.wind_speed_10m[idx] * 10) / 10,
      weatherCode: wCode,
      weatherDescription: getWeatherDescription(wCode).description
    });
  }

  // Daily Data (7 Days)
  const daily: DailyForecastItem[] = [];
  const daysCount = data.daily.time.length;
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  for (let i = 0; i < daysCount; i++) {
    const dStr = data.daily.time[i];
    const dObj = new Date(dStr);
    const dayName = i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : dayNames[dObj.getDay()];
    const wCode = data.daily.weather_code[i];

    daily.push({
      date: dStr,
      dayName,
      tempMax: Math.round(data.daily.temperature_2m_max[i]),
      tempMin: Math.round(data.daily.temperature_2m_min[i]),
      rainSum: Math.round((data.daily.precipitation_sum[i] || 0) * 10) / 10,
      rainProbMax: data.daily.precipitation_probability_max[i] || 0,
      weatherCode: wCode,
      weatherDescription: getWeatherDescription(wCode).description,
      windMax: Math.round(data.daily.wind_speed_10m_max[i])
    });
  }

  // Dynamic Agro-Advisories
  const advisories = generateDynamicAdvisories(current, hourly, daily);

  return {
    current,
    hourly,
    daily,
    advisories,
    elevation: data.elevation,
    timezone: data.timezone
  };
}

export async function searchLocationsOnline(query: string): Promise<LocationInfo[]> {
  if (!query || query.trim().length < 1) return [];
  const trimmed = query.trim();

  // 1. Search high-resolution Indian agricultural database first
  const localMatches = searchLocalAgriDatabase(trimmed);

  // 2. Also search Open-Meteo Geocoding API
  try {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=6&language=en&format=json`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        const onlineResults: LocationInfo[] = data.results.map((item: any) => ({
          name: item.name,
          panchayat: `${item.name} Area Grid`,
          district: item.admin2 || item.admin3 || item.name,
          state: item.admin1,
          country: item.country,
          lat: item.latitude,
          lng: item.longitude
        }));

        // Deduplicate against local matches
        const existingNames = new Set(localMatches.map(m => m.name.toLowerCase()));
        const uniqueOnline = onlineResults.filter(o => !existingNames.has(o.name.toLowerCase()));

        return [...localMatches, ...uniqueOnline];
      }
    }
  } catch (err) {
    console.error('Error in online geocoding lookup:', err);
  }

  return localMatches;
}
