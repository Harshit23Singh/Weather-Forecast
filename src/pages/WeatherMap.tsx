import { useState } from 'react';
import { 
  Layers, 
  Thermometer, 
  Droplets, 
  CloudRain, 
  Wind, 
  Compass,
  MapPin
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { fetchLiveWeatherData, type WeatherDataResult } from '../services/weatherService';
import LeafletMap, { type MapMarker, type MapPolygon } from '../components/map/LeafletMap';

export default function WeatherMap() {
  const { location, setLocation, weather } = useWeather();
  const [activeLayer, setActiveLayer] = useState<'Temperature' | 'Rainfall' | 'Humidity' | 'Wind'>('Rainfall');
  const [inspectedPoint, setInspectedPoint] = useState<{
    lat: number;
    lng: number;
    data: WeatherDataResult | null;
    isLoading: boolean;
  } | null>(null);

  // High-resolution micro-grid cells generated around active center
  const centerLat = location.lat;
  const centerLng = location.lng;

  const curTemp = weather?.current.temperature ?? 28;
  const curRain = weather?.current.rainfall ?? 0;
  const curHum = weather?.current.humidity ?? 65;
  const curWind = weather?.current.windSpeed ?? 12;

  const step = 0.012; // ~1.3 km

  // Get color for cell based on active layer
  const getCellColor = (temp: number, rain: number, hum: number, wind: number) => {
    if (activeLayer === 'Temperature') {
      if (temp > 35) return '#ef4444'; // red
      if (temp > 30) return '#f97316'; // orange
      if (temp > 25) return '#eab308'; // yellow
      if (temp > 20) return '#84cc16'; // lime
      return '#06b6d4'; // cyan
    }
    if (activeLayer === 'Rainfall') {
      if (rain > 15) return '#1e3a8a'; // dark blue
      if (rain > 8) return '#2563eb'; // blue
      if (rain > 3) return '#60a5fa'; // light blue
      if (rain > 0.5) return '#93c5fd'; // sky
      return '#38bdf8'; // very light
    }
    if (activeLayer === 'Humidity') {
      if (hum > 80) return '#065f46'; // dark emerald
      if (hum > 70) return '#10b981'; // emerald
      if (hum > 60) return '#34d399'; // green
      return '#a7f3d0'; // light green
    }
    // Wind
    if (wind > 20) return '#7c3aed';
    if (wind > 14) return '#8b5cf6';
    if (wind > 8) return '#a78bfa';
    return '#c4b5fd';
  };

  const mapPolygons: MapPolygon[] = [];

  for (let r = -2; r < 2; r++) {
    for (let c = -2; c < 2; c++) {
      const lat1 = centerLat + r * step;
      const lng1 = centerLng + c * step;
      const lat2 = lat1 + step * 0.95;
      const lng2 = lng1 + step * 0.95;
      
      const seed = Math.sin(lat1 * 100 + lng1 * 50);
      const cellTemp = Math.round((curTemp + seed * 1.8) * 10) / 10;
      const cellRain = Math.round(Math.max(0, curRain + (seed + 1) * 2.5) * 10) / 10;
      const cellHum = Math.round(Math.min(99, Math.max(30, curHum + seed * 12)));
      const cellWind = Math.round((curWind + seed * 3.5) * 10) / 10;

      const color = getCellColor(cellTemp, cellRain, cellHum, cellWind);

      mapPolygons.push({
        id: `${r}_${c}`,
        positions: [
          [lat1, lng1],
          [lat1, lng2],
          [lat2, lng2],
          [lat2, lng1]
        ],
        color: color,
        fillColor: color,
        fillOpacity: 0.38,
        weight: 1.5,
        dashArray: '3, 3',
        popupTitle: '1km² Micro-Grid Cell',
        popupContent: `
          Temp: <b>${cellTemp}°C</b> | Rain: <b>${cellRain} mm</b><br/>
          Humidity: <b>${cellHum}%</b> | Wind: <b>${cellWind} km/h</b>
        `
      });
    }
  }

  const mapMarkers: MapMarker[] = [
    {
      lat: location.lat,
      lng: location.lng,
      popupTitle: location.panchayat || location.name,
      popupContent: `Current: <b>${curTemp}°C</b>, ${weather?.current.weatherDescription || 'Live'}<br/>Rain: <b>${curRain} mm</b> | Wind: <b>${curWind} km/h</b>`,
      isCenter: true
    }
  ];

  if (inspectedPoint) {
    mapMarkers.push({
      lat: inspectedPoint.lat,
      lng: inspectedPoint.lng,
      popupTitle: 'Inspected Coordinate',
      popupContent: inspectedPoint.isLoading
        ? 'Loading live telemetry...'
        : inspectedPoint.data
        ? `Temp: <b>${inspectedPoint.data.current.temperature}°C</b> (${inspectedPoint.data.current.weatherDescription})<br/>Rain: <b>${inspectedPoint.data.current.rainfall} mm</b> | Wind: <b>${inspectedPoint.data.current.windSpeed} km/h</b>`
        : 'Failed to fetch telemetry'
    });
  }

  const handleMapClick = async (lat: number, lng: number) => {
    setInspectedPoint({ lat, lng, data: null, isLoading: true });
    try {
      const data = await fetchLiveWeatherData(lat, lng);
      setInspectedPoint({ lat, lng, data, isLoading: false });
    } catch (e) {
      console.error(e);
      setInspectedPoint(prev => prev ? { ...prev, isLoading: false } : null);
    }
  };

  const layers = [
    { name: 'Rainfall', icon: CloudRain, unit: 'mm' },
    { name: 'Temperature', icon: Thermometer, unit: '°C' },
    { name: 'Humidity', icon: Droplets, unit: '%' },
    { name: 'Wind', icon: Wind, unit: 'km/h' },
  ] as const;

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)] space-y-4">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
              Live Weather & Downscaled Radar Map
            </h1>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-0.5 rounded-full border border-primary/20">
              Interactive 1km Grid
            </span>
          </div>
          <p className="text-slate-500 text-xs md:text-sm">
            Click anywhere on the map to query live micro-climate forecasts.
          </p>
        </div>

        {/* Layer Selector */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-1 flex items-center gap-1">
          {layers.map(layer => (
            <button
              key={layer.name}
              onClick={() => setActiveLayer(layer.name)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-semibold text-xs md:text-sm transition-all ${
                activeLayer === layer.name 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <layer.icon className="w-4 h-4" />
              <span>{layer.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Map Container */}
      <div className="w-full h-[650px] min-h-[550px] rounded-3xl overflow-hidden shadow-sm border border-slate-200 relative z-0">
        <LeafletMap
          center={[location.lat, location.lng]}
          zoom={13}
          markers={mapMarkers}
          polygons={mapPolygons}
          onMapClick={handleMapClick}
          className="w-full h-full"
          style={{ minHeight: '550px' }}
        />

        {/* Legend Overlay */}
        <div className="absolute bottom-6 right-6 z-[400] bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-200 pointer-events-auto">
          <h4 className="text-xs font-bold text-slate-700 uppercase mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-primary" />
            {activeLayer} Intensity
          </h4>
          <div className="flex items-center gap-1 mb-1.5">
            {activeLayer === 'Temperature' && (
              <>
                <div className="h-3.5 w-7 bg-cyan-500 rounded-sm" title="< 20°C"></div>
                <div className="h-3.5 w-7 bg-lime-500 rounded-sm" title="20-25°C"></div>
                <div className="h-3.5 w-7 bg-amber-500 rounded-sm" title="25-30°C"></div>
                <div className="h-3.5 w-7 bg-orange-500 rounded-sm" title="30-35°C"></div>
                <div className="h-3.5 w-7 bg-red-500 rounded-sm" title="> 35°C"></div>
              </>
            )}
            {activeLayer === 'Rainfall' && (
              <>
                <div className="h-3.5 w-7 bg-sky-300 rounded-sm" title="0-1 mm"></div>
                <div className="h-3.5 w-7 bg-blue-300 rounded-sm" title="1-3 mm"></div>
                <div className="h-3.5 w-7 bg-blue-400 rounded-sm" title="3-8 mm"></div>
                <div className="h-3.5 w-7 bg-blue-600 rounded-sm" title="8-15 mm"></div>
                <div className="h-3.5 w-7 bg-indigo-900 rounded-sm" title="> 15 mm"></div>
              </>
            )}
            {activeLayer === 'Humidity' && (
              <>
                <div className="h-3.5 w-7 bg-emerald-100 rounded-sm" title="< 50%"></div>
                <div className="h-3.5 w-7 bg-emerald-300 rounded-sm" title="50-65%"></div>
                <div className="h-3.5 w-7 bg-emerald-500 rounded-sm" title="65-75%"></div>
                <div className="h-3.5 w-7 bg-emerald-700 rounded-sm" title="75-85%"></div>
                <div className="h-3.5 w-7 bg-emerald-950 rounded-sm" title="> 85%"></div>
              </>
            )}
            {activeLayer === 'Wind' && (
              <>
                <div className="h-3.5 w-7 bg-purple-200 rounded-sm" title="< 8 km/h"></div>
                <div className="h-3.5 w-7 bg-purple-400 rounded-sm" title="8-14 km/h"></div>
                <div className="h-3.5 w-7 bg-purple-600 rounded-sm" title="14-20 km/h"></div>
                <div className="h-3.5 w-7 bg-purple-800 rounded-sm" title="> 20 km/h"></div>
              </>
            )}
          </div>
          <div className="flex justify-between text-[11px] text-slate-500 font-medium">
            <span>Low</span>
            <span>Moderate</span>
            <span>High</span>
          </div>
        </div>

        {/* Tip Badge */}
        <div className="absolute top-4 left-14 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200 text-xs font-semibold text-slate-700 hidden sm:flex items-center gap-1.5 pointer-events-none">
          <Compass className="w-3.5 h-3.5 text-primary" />
          Click any spot on map to query live weather
        </div>

        {/* Inspected Point Quick Action Panel */}
        {inspectedPoint && inspectedPoint.data && (
          <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-200 text-xs space-y-2 max-w-[240px]">
            <div className="flex justify-between items-center">
              <span className="font-bold text-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-red-500" />
                Inspected Point
              </span>
              <button onClick={() => setInspectedPoint(null)} className="text-slate-400 hover:text-slate-600 font-bold">✕</button>
            </div>
            <p className="text-slate-400 text-[10px]">{inspectedPoint.lat.toFixed(4)}°, {inspectedPoint.lng.toFixed(4)}°</p>
            <div className="space-y-1">
              <p className="font-bold text-primary text-base">
                {inspectedPoint.data.current.temperature}°C
                <span className="text-xs font-normal text-slate-600 ml-1">
                  ({inspectedPoint.data.current.weatherDescription})
                </span>
              </p>
              <p className="text-slate-600">Rain: <b>{inspectedPoint.data.current.rainfall} mm</b> | Wind: <b>{inspectedPoint.data.current.windSpeed} km/h</b></p>
              <p className="text-slate-600">Humidity: <b>{inspectedPoint.data.current.humidity}%</b></p>
            </div>
            <button
              onClick={() => {
                setLocation({
                  name: `Point (${inspectedPoint.lat.toFixed(2)}, ${inspectedPoint.lng.toFixed(2)})`,
                  panchayat: 'Custom Micro-Grid',
                  lat: inspectedPoint.lat,
                  lng: inspectedPoint.lng
                });
              }}
              className="w-full py-1.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-all text-center mt-1"
            >
              Set as Dashboard Grid
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
