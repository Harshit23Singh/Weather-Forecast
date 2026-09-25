import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  CloudLightning,
  MapPin, 
  TrendingUp, 
  AlertCircle, 
  Sun,
  CloudSun,
  Cloud,
  CheckCircle2,
  RefreshCw,
  Gauge,
  ArrowRight,
  Layers,
  Bot,
  Radio
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Link } from 'react-router-dom';
import { useWeather } from '../context/WeatherContext';
import LeafletMap, { type MapMarker, type MapCircle } from '../components/map/LeafletMap';

export default function Dashboard() {
  const { location, weather, isLoading, error, refreshWeather } = useWeather();

  const current = weather?.current;
  const hourly = weather?.hourly || [];
  const primaryAdvisory = weather?.advisories?.[0];

  // Helper to render weather icon
  const renderWeatherIcon = (code: number = 0, className: string = 'w-12 h-12') => {
    if (code === 0) return <Sun className={className} />;
    if (code === 1 || code === 2) return <CloudSun className={className} />;
    if (code === 3 || code === 45 || code === 48) return <Cloud className={className} />;
    if (code >= 51 && code <= 82) return <CloudRain className={className} />;
    if (code >= 95) return <CloudLightning className={className} />;
    return <CloudSun className={className} />;
  };

  const mapMarkers: MapMarker[] = [
    {
      lat: location.lat,
      lng: location.lng,
      popupTitle: location.panchayat || location.name,
      popupContent: `Temp: <b>${current?.temperature ?? '--'}°C</b> (${current?.weatherDescription || 'Live'})<br/>Rain: <b>${current?.rainfall ?? 0} mm</b> | Wind: <b>${current?.windSpeed ?? 0} km/h</b>`,
      isCenter: true
    }
  ];

  const mapCircles: MapCircle[] = [
    {
      lat: location.lat,
      lng: location.lng,
      radius: 1800,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.18
    }
  ];

  if (isLoading && !weather) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div className="relative">
          <RefreshCw className="w-12 h-12 text-primary animate-spin" />
        </div>
        <p className="text-slate-600 font-semibold text-lg">Fetching live satellite & NWP weather data...</p>
        <p className="text-slate-400 text-sm">Connecting to Open-Meteo High-Resolution Ensemble Models</p>
      </div>
    );
  }

  if (error && !weather) {
    return (
      <div className="max-w-md mx-auto my-16 bg-white p-8 rounded-3xl border border-red-200 text-center shadow-lg">
        <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Weather Stream Unavailable</h2>
        <p className="text-slate-600 text-sm mb-6">{error}</p>
        <button
          onClick={() => refreshWeather()}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl shadow transition-all"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Synoptic
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Hyperlocal Weather Intelligence & Agro-Meteorological Advisory • {location.state || 'India'}
          </p>
        </div>
        
        <div className="bg-white px-4 py-2.5 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-3">
          <div className="bg-primary/10 p-2.5 rounded-xl">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Active Micro-Grid</p>
            <p className="font-bold text-slate-800">
              {location.panchayat || location.name}, {location.district || location.block || 'Zone'}
            </p>
          </div>
        </div>
      </div>

      {/* Automated Panchayat Weather Monitoring Bar */}
      <div className="bg-white rounded-2xl p-3.5 text-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm border border-emerald-200/80 text-xs">
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-50 text-emerald-600 p-1.5 rounded-lg border border-emerald-200">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900">Automated Panchayat Weather Monitoring: </span>
            <span className="text-slate-600">Continuous 1km Grid Analysis active. Zero manual supervision required.</span>
          </div>
        </div>
        <Link 
          to="/alerts" 
          className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-3.5 py-1.5 rounded-xl border border-emerald-200 transition-colors whitespace-nowrap"
        >
          <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
          <span>Monitor Panchayat Forecast</span>
          <ArrowRight className="w-3 h-3 text-emerald-600" />
        </Link>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Active Micro-Grid', value: `${location.name}`, icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Coordinates', value: `${location.lat.toFixed(2)}°, ${location.lng.toFixed(2)}°`, icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Forecast Resolution', value: '1 km²', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Live Humidity', value: `${current?.humidity ?? 65}%`, icon: Droplets, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Surface Pressure', value: `${current?.pressure ?? 1012} hPa`, icon: Gauge, color: 'text-amber-500', bg: 'bg-amber-50' },
          { label: 'Cloud Cover', value: `${current?.cloudCover ?? 20}%`, icon: CloudRain, color: 'text-cyan-500', bg: 'bg-cyan-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-md transition-shadow">
            <div className={`${kpi.bg} p-3 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <p className="text-lg font-bold text-slate-800 truncate max-w-full">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-primary via-emerald-700 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-primary/20 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-6 opacity-15 pointer-events-none">
            {renderWeatherIcon(current?.weatherCode, 'w-48 h-48')}
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-primary-foreground/80 font-medium text-sm">Live Observation</p>
                <h2 className="text-3xl font-bold mt-0.5">{location.name}</h2>
                <p className="text-xs text-primary-foreground/70">
                  Lat: {location.lat.toFixed(3)}° • Lon: {location.lng.toFixed(3)}°
                </p>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                {current?.isDay ? 'Daytime' : 'Night'}
              </div>
            </div>

            <div className="flex items-center gap-5 mb-8">
              <div className="text-6xl font-black tracking-tighter">
                {current ? Math.round(current.temperature) : '--'}°C
              </div>
              <div className="text-primary-foreground/90 font-medium">
                <p className="text-xl font-bold">{current?.weatherDescription || 'Clear'}</p>
                <p className="text-sm text-primary-foreground/75 font-normal">
                  Feels like {current ? Math.round(current.feelsLike) : '--'}°C
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Humidity</p>
                  <p className="font-bold text-base">{current?.humidity ?? '--'}%</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Wind className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Wind Speed</p>
                  <p className="font-bold text-base">{current?.windSpeed ?? '--'} km/h</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Precipitation</p>
                  <p className="font-bold text-base">{current?.rainfall ?? 0} mm</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-emerald-200 shrink-0" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Air Pressure</p>
                  <p className="font-bold text-base">{current?.pressure ?? 1012} hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Interactive Map Preview Card on Dashboard */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-slate-800">Live Panchayat Weather Map</h3>
                <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  OpenStreetMap Live
                </span>
              </div>
              <p className="text-xs text-slate-500">Real-time geospatial telemetry for {location.name} (1km grid resolution)</p>
            </div>
            <Link
              to="/map"
              className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Screen Map</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Interactive Leaflet Map Container */}
          <div className="w-full h-72 rounded-2xl overflow-hidden border border-slate-200 relative shadow-inner">
            <LeafletMap
              center={[location.lat, location.lng]}
              zoom={12}
              markers={mapMarkers}
              circles={mapCircles}
              className="w-full h-full"
              style={{ minHeight: '288px' }}
            />

            {/* Quick Map Overlay Badge */}
            <div className="absolute bottom-3 left-3 z-[400] bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow border border-slate-200 text-[11px] font-semibold text-slate-700 flex items-center gap-1.5 pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GPS Grid: {location.lat.toFixed(3)}°N, {location.lng.toFixed(3)}°E</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's 24-Hour Live Forecast Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">24-Hour Live Weather Trend</h3>
              <p className="text-xs text-slate-500">Hourly Temperature (°C) & Rainfall (mm)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span>Temperature</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                <span>Rainfall (mm)</span>
              </div>
            </div>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourly} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.7}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <Tooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1">
                          <p className="font-bold text-amber-400">{label} — {data.weatherDescription}</p>
                          <p className="text-slate-200">Temp: <span className="font-bold text-white">{data.temp}°C</span></p>
                          <p className="text-slate-200">Rain: <span className="font-bold text-blue-400">{data.rain} mm</span> ({data.rainProb}% prob)</p>
                          <p className="text-slate-200">Wind: <span className="font-bold text-white">{data.windSpeed} km/h</span></p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" strokeWidth={2.5} fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRain)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dynamic Agro-Advisory based on Live Readings */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-4">
            <div className={`p-3 rounded-2xl ${
              primaryAdvisory?.status === 'warning' ? 'bg-amber-100 text-amber-600' :
              primaryAdvisory?.status === 'danger' ? 'bg-red-100 text-red-600' :
              'bg-emerald-100 text-emerald-600'
            }`}>
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">
                {primaryAdvisory?.title || 'Live Agro-Meteorological Advisory'}
              </h3>
              <p className="text-xs text-slate-500">Automated AI Guidance for {location.name}</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mb-4">
            <p className="text-slate-800 font-medium text-base leading-relaxed">
              "{primaryAdvisory?.summary || 'Weather conditions are stable across this panchayat grid.'}"
            </p>
          </div>
          
          <div className="space-y-2.5">
            {(primaryAdvisory?.details || [
              'Continue scheduled seasonal agricultural operations.',
              'Monitor morning soil moisture before irrigating.',
              'Check for regular pest presence on crop leaves.'
            ]).map((action, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 bg-emerald-100 text-emerald-600 rounded-full p-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <p className="text-slate-700 text-sm font-medium">{action}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
