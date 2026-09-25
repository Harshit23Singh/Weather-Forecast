import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  type LocationInfo, 
  type WeatherDataResult, 
  PRESET_PANCHAYATS, 
  fetchLiveWeatherData 
} from '../services/weatherService';

interface WeatherContextType {
  location: LocationInfo;
  setLocation: (loc: LocationInfo) => void;
  weather: WeatherDataResult | null;
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  refreshWeather: () => Promise<void>;
  detectUserLocation: () => Promise<void>;
  isLocating: boolean;
  presetPanchayats: LocationInfo[];
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'gram_mausam_selected_location';

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocationState] = useState<LocationInfo>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return PRESET_PANCHAYATS[0]; // Default: Aima, Malihabad
  });

  const [weather, setWeather] = useState<WeatherDataResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const loadWeather = useCallback(async (loc: LocationInfo) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchLiveWeatherData(loc.lat, loc.lng);
      setWeather(data);
      setLastUpdated(new Date());
    } catch (err: any) {
      console.error('Failed to fetch weather data:', err);
      setError(err?.message || 'Failed to fetch live weather data. Check your network.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const setLocation = (loc: LocationInfo) => {
    setLocationState(loc);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(loc));
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    loadWeather(location);
    // Refresh weather every 10 minutes automatically
    const timer = setInterval(() => {
      loadWeather(location);
    }, 10 * 60 * 1000);
    return () => clearInterval(timer);
  }, [location, loadWeather]);

  const refreshWeather = async () => {
    await loadWeather(location);
  };

  const detectUserLocation = async () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const userLoc: LocationInfo = {
          name: 'My Live Location',
          panchayat: 'Detected Panchayat / Area',
          district: 'Local Grid',
          lat,
          lng
        };
        setLocation(userLoc);
        setIsLocating(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsLocating(false);
        alert('Could not determine your GPS location. Please ensure location permission is allowed.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        weather,
        isLoading,
        error,
        lastUpdated,
        refreshWeather,
        detectUserLocation,
        isLocating,
        presetPanchayats: PRESET_PANCHAYATS
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export function useWeather() {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
}
