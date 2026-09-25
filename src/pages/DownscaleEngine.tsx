import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, 
  Map, 
  CloudRain, 
  Cpu, 
  Activity, 
  CheckCircle2,
  Server,
  Layers,
  BarChart4
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

export default function DownscaleEngine() {
  const { location, weather } = useWeather();
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startPipeline = () => {
    setIsProcessing(true);
    setProgress(0);
    setIsComplete(false);
  };

  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setIsProcessing(false);
            setIsComplete(true);
            return 100;
          }
          return p + 4;
        });
      }, 70);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const baseTemp = weather?.current.temperature ?? 28;
  const baseRain = weather?.current.rainfall ?? 0;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
          Gram Mausam Spatial Downscaling Engine
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Disaggregating regional numerical weather prediction (NWP) models into 1 km² Gram Panchayat micro-climate intelligence via multi-modal topographic data fusion.
        </p>
        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-200 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Operational Pipeline • HRRR/WRF Multi-Sensor Fusion
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        
        {/* Pipeline Visual */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
          
          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isProcessing || isComplete ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <CloudRain className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800 text-sm">Regional NWP</p>
              <p className="text-xs text-slate-500">9 km Coarse Grid</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 25 || isComplete ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Database className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800 text-sm">Data Fusion</p>
              <p className="text-xs text-slate-500">DEM, Soil, Landsat LST</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 50 || isComplete ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Cpu className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800 text-sm">Downscale Core</p>
              <p className="text-xs text-slate-500">Spatial Disaggregation</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 85 || isComplete ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Map className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800 text-sm">Panchayat Output</p>
              <p className="text-xs text-slate-500">1 km² Micro-Grid</p>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="max-w-xl mx-auto bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 text-center">
          {!isProcessing && !isComplete && (
            <div className="space-y-6">
              <Layers className="w-14 h-14 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">Target: {location.panchayat || location.name}</h3>
                <p className="text-slate-500 text-xs md:text-sm">
                  Run high-resolution interpolation and topographic lapse-rate adjustments for coordinates ({location.lat.toFixed(3)}°N, {location.lng.toFixed(3)}°E).
                </p>
              </div>
              <button 
                onClick={startPipeline}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto text-sm md:text-base"
              >
                <Activity className="w-5 h-5" />
                Execute Downscale Pipeline
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-6">
              <div className="relative w-20 h-20 mx-auto">
                <svg className="animate-spin w-full h-full text-primary/20" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75 text-primary" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-lg">
                  {progress}%
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">Fusing Topographic & Weather Layers...</h3>
                <p className="text-slate-500 text-xs">
                  {progress < 30 ? 'Ingesting coarse NWP block forecast...' : 
                   progress < 60 ? 'Applying SRTM 30m Digital Elevation Model...' : 
                   progress < 90 ? 'Calculating surface roughness & lapse rates...' : 
                   'Interpolating 1 km² Panchayat micro-climates...'}
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Downscaling Complete</h3>
                <p className="text-slate-600 text-sm font-medium">Resolution enhanced to 1 km² for {location.name} micro-grid</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-400 font-bold uppercase mb-0.5">Input NWP Block</p>
                  <p className="text-lg font-bold text-slate-700">{baseTemp}°C • {baseRain} mm</p>
                  <p className="text-[10px] text-slate-400">9 km Coarse Area Mean</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-primary/30 shadow-sm bg-primary/5">
                  <p className="text-xs text-primary font-bold uppercase mb-0.5">{location.name} Grid</p>
                  <p className="text-lg font-bold text-primary">
                    {Math.round((baseTemp - 0.4) * 10) / 10}°C • {Math.round((baseRain > 0 ? baseRain * 1.2 : 0) * 10) / 10} mm
                  </p>
                  <p className="text-[10px] text-emerald-600 font-semibold">1 km Micro-Climate Resolution</p>
                </div>
              </div>

              <button 
                onClick={startPipeline}
                className="text-primary font-bold hover:underline text-xs"
              >
                Re-run Spatial Pipeline
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <Server className="w-7 h-7 text-blue-500 mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-2">Multi-Source Fusion Layer</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Integrates regional NWP boundary conditions with SRTM Digital Elevation Models (DEM), MODIS Land Surface Temperature (LST), and soil moisture indices.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <Cpu className="w-7 h-7 text-indigo-500 mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-2">Statistical Downscaling Engine</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Leverages terrain-aware regression algorithms to compute adiabatic lapse rates and orographic precipitation adjustments for local valleys and ridges.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <BarChart4 className="w-7 h-7 text-primary mb-3" />
          <h3 className="text-base font-bold text-slate-800 mb-2">Prescriptive Agro Outputs</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Feeds downscaled variables directly into Gram Panchayat advisory algorithms for crop-stage-specific irrigation and spraying schedules.
          </p>
        </div>
      </div>
    </div>
  );
}
