import { CloudRain, Sun, Wind, CheckCircle2, AlertTriangle, Info, ThermometerSun } from 'lucide-react';

export default function AgroAdvisory() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Agro-Meteorological Advisory</h1>
          <p className="text-slate-500 mt-1">What should the farmer do based on high-resolution forecasts?</p>
        </div>
        <div className="bg-primary/10 text-primary px-4 py-2 rounded-xl font-semibold border border-primary/20">
          Target: Aima Panchayat
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Rain Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-blue-500 border-x border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <CloudRain className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Rain Advisory</h2>
          </div>
          
          <div className="bg-blue-50 rounded-xl p-4 mb-6 border border-blue-100">
            <p className="text-blue-800 text-sm font-medium">
              “Moderate to heavy rainfall (17.4 mm) is expected in Aima Panchayat within the next 24 hours.”
            </p>
          </div>

          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Recommended Actions:
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-blue-500 font-bold">✓</span> Delay irrigation to save water and prevent waterlogging.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-blue-500 font-bold">✓</span> Avoid pesticide spraying to prevent runoff.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-blue-500 font-bold">✓</span> Ensure field drainage channels are clear.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-blue-500 font-bold">✓</span> Harvest mature crops immediately if possible.
            </li>
          </ul>
        </div>

        {/* Heat Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-amber-500 border-x border-b border-slate-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-amber-100 p-3 rounded-full text-amber-600">
              <ThermometerSun className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Heat Advisory</h2>
          </div>
          
          <div className="bg-amber-50 rounded-xl p-4 mb-6 border border-amber-100">
            <p className="text-amber-800 text-sm font-medium">
              “Temperature may exceed 36°C during afternoon hours in the next 3 days.”
            </p>
          </div>

          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-500" /> Recommended Actions:
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-amber-500 font-bold">✓</span> Irrigate crops during early morning or late evening.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-amber-500 font-bold">✓</span> Increase livestock water availability and provide shade.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-amber-500 font-bold">✓</span> Avoid heavy field operations during peak afternoon.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-amber-500 font-bold">✓</span> Apply light mulch to retain soil moisture.
            </li>
          </ul>
        </div>

        {/* Wind Advisory Card */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border-t-4 border-t-slate-500 border-x border-b border-slate-200 opacity-70 hover:opacity-100 transition-opacity">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-slate-100 p-3 rounded-full text-slate-600">
              <Wind className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">Wind Advisory</h2>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-200">
            <p className="text-slate-700 text-sm font-medium">
              “Wind speeds expected to remain normal around 12-14 km/h.”
            </p>
          </div>

          <h3 className="font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-slate-400" /> General Guidelines:
          </h3>
          <ul className="space-y-3">
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-slate-400 font-bold">•</span> Wind conditions are favorable for spraying operations.
            </li>
            <li className="flex gap-3 text-sm text-slate-600">
              <span className="text-slate-400 font-bold">•</span> No immediate threat to tall crops or temporary structures.
            </li>
          </ul>
        </div>

      </div>

      {/* Comparison highlighting the need for downscaling */}
      <div className="bg-indigo-900 rounded-3xl p-8 text-white mt-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <AlertTriangle className="w-48 h-48" />
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Why Panchayat-Level Matters</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-indigo-200 leading-relaxed">
                If we used the standard Block-level forecast, the entire Malihabad block would receive the same advisory: <strong className="text-white">"Light rain expected, light irrigation recommended."</strong>
              </p>
              <p className="text-indigo-200 leading-relaxed">
                Because of our downscaling engine, we know Aima Panchayat will receive <strong className="text-red-400">heavy rain</strong> (17.4mm) while Lakhanpur will only receive <strong className="text-emerald-400">light rain</strong> (6.0mm). 
              </p>
              <p className="font-semibold text-white bg-white/10 p-4 rounded-xl border border-white/20">
                This prevents farmers in Aima from wasting water and risking waterlogged crops.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-medium">Block Forecast</span>
                  <span className="bg-slate-700 px-3 py-1 rounded-full text-sm">Irrigate Lightly</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="font-medium text-red-300">Aima Panchayat</span>
                  <span className="bg-red-500/20 text-red-200 border border-red-500/30 px-3 py-1 rounded-full text-sm font-bold">DO NOT Irrigate</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-emerald-300">Lakhanpur Panchayat</span>
                  <span className="bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 px-3 py-1 rounded-full text-sm font-bold">Irrigate Normally</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
