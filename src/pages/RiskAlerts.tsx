import { useState } from 'react';
import { 
  AlertTriangle, 
  Wind, 
  ThermometerSun, 
  CloudRain, 
  Waves,
  MapPin, 
  Clock, 
  Filter,
  CheckCircle2,
  BellRing
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export default function RiskAlerts() {
  const { location, weather } = useWeather();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Rain', 'Heat', 'Wind', 'Moisture'];

  const cur = weather?.current;
  const hourly = weather?.hourly || [];

  const curRain = cur?.rainfall ?? 0;
  const curTemp = cur?.temperature ?? 28;
  const curWind = cur?.windSpeed ?? 12;
  const curHum = cur?.humidity ?? 65;

  const maxWind = Math.max(...hourly.slice(0, 12).map(h => h.windSpeed || 0), curWind);
  const maxRain24h = hourly.slice(0, 24).reduce((sum, h) => sum + (h.rain || 0), curRain);

  // Generate dynamic alerts based on live weather data
  const alertsData = [];

  // Rain Alert
  if (maxRain24h >= 8 || curRain >= 5) {
    alertsData.push({
      id: 1,
      type: 'Rain',
      title: maxRain24h >= 20 ? 'Severe Rainfall Warning' : 'Moderate Rainfall Inbound',
      location: `${location.panchayat || location.name}`,
      value: `${maxRain24h.toFixed(1)} mm next 24h`,
      time: 'Next 12 - 24 hours',
      risk: maxRain24h >= 20 ? 'High' : 'Moderate',
      icon: CloudRain,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200'
    });
  }

  // Heat Alert
  if (curTemp >= 35) {
    alertsData.push({
      id: 2,
      type: 'Heat',
      title: curTemp >= 40 ? 'Severe Heatwave Alert' : 'Elevated Heat Stress',
      location: `${location.name} Panchayat Grid`,
      value: `${curTemp}°C Current Peak`,
      time: 'Afternoon 12:00 - 16:30',
      risk: curTemp >= 40 ? 'High' : 'Moderate',
      icon: ThermometerSun,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200'
    });
  }

  // Wind Alert
  if (maxWind >= 18) {
    alertsData.push({
      id: 3,
      type: 'Wind',
      title: maxWind >= 30 ? 'High Wind & Gust Warning' : 'Moderate Gust Hazard',
      location: `${location.name} Agro Grid`,
      value: `${maxWind.toFixed(1)} km/h Wind Peak`,
      time: 'Next 6 - 12 hours',
      risk: maxWind >= 30 ? 'High' : 'Moderate',
      icon: Wind,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200'
    });
  }

  // Moisture Alert
  if (curHum < 40) {
    alertsData.push({
      id: 4,
      type: 'Moisture',
      title: 'Atmospheric & Soil Moisture Deficit',
      location: `${location.name} Grid`,
      value: `Relative Humidity ${curHum}%`,
      time: 'Ongoing',
      risk: 'Moderate',
      icon: Waves,
      color: 'bg-cyan-500',
      lightColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      borderColor: 'border-cyan-200'
    });
  }

  const filteredAlerts = filter === 'All' 
    ? alertsData 
    : alertsData.filter(a => a.type === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Risk & Early Warning Center</h1>
            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              alertsData.length > 0 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {alertsData.length} Live Alerts
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Real-time agro-meteorological threshold alarms for {location.panchayat || location.name}.
          </p>
        </div>

        <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Active: {location.name}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex items-center gap-2 text-slate-500 mr-2 text-xs font-bold uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Filter:</span>
        </div>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f 
                ? 'bg-slate-900 text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
          <div key={alert.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all">
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${alert.color}`}></div>
            
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-3">
                <div className={`${alert.lightColor} p-3 rounded-2xl ${alert.textColor}`}>
                  <alert.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">{alert.title}</h2>
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${alert.lightColor} ${alert.textColor}`}>
                    {alert.risk} Risk
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                  <span className="font-semibold text-slate-800">{alert.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Trigger Metric</span>
                  <span className="font-semibold text-slate-800">{alert.value}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Window</span>
                  <span className="font-semibold text-slate-800">{alert.time}</span>
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Normal Conditions</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              No active weather hazards triggered for <strong className="text-slate-700">{location.name}</strong>. All live parameters (Rainfall, Wind, Temp, Humidity) are currently within safe thresholds.
            </p>
          </div>
        )}
      </div>
      
      {/* SMS & Dissemination Banner */}
      <div className="bg-slate-900 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3.5 rounded-2xl text-amber-400">
            <BellRing className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Panchayat Early Warning Alert Dispatch</h3>
            <p className="text-slate-400 text-xs md:text-sm">
              Critical warnings are automatically broadcasted via SMS & WhatsApp to registered Gram Pradhans and KVK officers.
            </p>
          </div>
        </div>
        <button 
          onClick={() => alert(`Alert broadcast simulated for ${location.name} Panchayat!`)}
          className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-2xl transition-all whitespace-nowrap shadow-lg shadow-primary/20 text-sm"
        >
          Test SMS Broadcast
        </button>
      </div>
    </div>
  );
}
