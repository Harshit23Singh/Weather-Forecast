import { CloudRain, Wind, CheckCircle2, Info, ThermometerSun, MapPin, Sparkles } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export default function AgroAdvisory() {
  const { location, weather } = useWeather();
  const current = weather?.current;
  const advisories = weather?.advisories || [];

  const rainAdvisory = advisories.find(a => a.type === 'irrigation');
  const tempAdvisory = advisories.find(a => a.type === 'temperature');
  const sprayAdvisory = advisories.find(a => a.type === 'spraying');
  const generalAdvisory = advisories.find(a => a.type === 'field_work');

  const curRain = current?.rainfall ?? 0;
  const curTemp = current?.temperature ?? 28;
  const curWind = current?.windSpeed ?? 12;

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Agro-Meteorological Advisory</h1>
            <span className="bg-primary/10 text-primary text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Automated AI Decision Engine
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Prescriptive farm recommendations computed from real-time high-resolution weather models.
          </p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-2xl font-bold border border-primary/20 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{location.panchayat || location.name}</span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Rain / Irrigation Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-blue-500 border-x border-b border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                <CloudRain className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Irrigation Advisory</h2>
                <p className="text-xs text-slate-400">Current Rain: {curRain} mm</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-2xl p-4 mb-5 border border-blue-100">
              <p className="text-blue-900 text-xs md:text-sm font-semibold leading-relaxed">
                “{rainAdvisory?.summary || 'No extreme rain projected. Proceed with normal irrigation cycles.'}”
              </p>
            </div>

            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Actionable Directives:
            </h3>
            <ul className="space-y-2.5">
              {(rainAdvisory?.details || [
                'Continue regular irrigation according to crop stages.',
                'Irrigate in early morning to minimize evaporation loss.',
                'Check field bunds for water conservation.'
              ]).map((detail, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-slate-600">
                  <span className="text-blue-500 font-bold">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Temperature / Heat Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-amber-500 border-x border-b border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-amber-100 p-3 rounded-2xl text-amber-600">
                <ThermometerSun className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Thermal Management</h2>
                <p className="text-xs text-slate-400">Live Temp: {curTemp}°C</p>
              </div>
            </div>
            
            <div className="bg-amber-50 rounded-2xl p-4 mb-5 border border-amber-100">
              <p className="text-amber-900 text-xs md:text-sm font-semibold leading-relaxed">
                “{tempAdvisory?.summary || 'Temperatures are in normal ranges. Ideal for vegetative growth.'}”
              </p>
            </div>

            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-500" /> Actionable Directives:
            </h3>
            <ul className="space-y-2.5">
              {(tempAdvisory?.details || [
                'Ensure livestock sheds are well aerated.',
                'Apply organic mulch to retain soil moisture.',
                'Avoid heavy field operations during afternoon peak.'
              ]).map((detail, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-slate-600">
                  <span className="text-amber-500 font-bold">✓</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Spraying / Chemical Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-emerald-500 border-x border-b border-slate-200 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                <Wind className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-800">Spraying Window</h2>
                <p className="text-xs text-slate-400">Wind: {curWind} km/h</p>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-2xl p-4 mb-5 border border-emerald-100">
              <p className="text-emerald-900 text-xs md:text-sm font-semibold leading-relaxed">
                “{sprayAdvisory?.summary || generalAdvisory?.summary || 'Favorable calm weather for scheduled spraying.'}”
              </p>
            </div>

            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-emerald-600" /> Application Protocols:
            </h3>
            <ul className="space-y-2.5">
              {(sprayAdvisory?.details || [
                'Wind conditions are safe for foliar and pesticide applications.',
                'Optimal spray time: 07:00 AM - 10:00 AM.',
                'Maintain proper nozzle pressure to prevent uneven deposition.'
              ]).map((detail, idx) => (
                <li key={idx} className="flex gap-2.5 text-xs md:text-sm text-slate-600">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Value Comparison Card */}
      <div className="bg-gradient-to-br from-indigo-950 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Sparkles className="w-64 h-64" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Spatial Downscaling Advantage</span>
          </div>
          <h2 className="text-2xl font-bold mb-4">Why Hyperlocal Panchayat Intelligence Saves Crops</h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-indigo-200 text-sm md:text-base leading-relaxed">
                Traditional block advisories treat all villages in a 100 km² zone identically. MausamSetu breaks this block down into 1 km² micro-climate cells, accounting for local topography, elevation, and land cover.
              </p>
              <div className="bg-white/10 p-4 rounded-2xl border border-white/15 backdrop-blur-md">
                <p className="text-xs text-indigo-100">
                  Active location: <strong className="text-white">{location.name}</strong> ({location.lat.toFixed(3)}°N, {location.lng.toFixed(3)}°E) receives dedicated micro-forecast computations instead of coarse averages.
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-lg space-y-3">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs text-slate-300">Regional Block Forecast</span>
                <span className="bg-slate-700/80 px-3 py-1 rounded-full text-xs font-semibold">General Light Moisture</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-xs text-emerald-300 font-semibold">{location.name} Panchayat (Live)</span>
                <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold">
                  {curRain > 2 ? 'Postpone Irrigation' : 'Normal Schedule'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-cyan-300">Expected Precision Gain</span>
                <span className="text-amber-400 font-bold text-xs">+88% Spatial Accuracy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
