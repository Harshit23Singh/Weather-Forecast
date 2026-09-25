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

export default function DownscaleEngine() {
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const startSimulation = () => {
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
          return p + 2;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">MausamSetu Downscaling Engine</h1>
        <p className="text-lg text-slate-500">
          Transforming low-resolution block forecasts into high-resolution Panchayat intelligence through AI and spatial data fusion.
        </p>
        <div className="inline-block bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide border border-amber-200 shadow-sm">
          Prototype Simulation — Model integration planned for production
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200">
        
        {/* Pipeline Visual */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12 relative">
          {/* Connector Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-100 -translate-y-1/2 z-0"></div>
          
          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isProcessing || isComplete ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <CloudRain className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">IMD Forecast</p>
              <p className="text-xs text-slate-500">9km Resolution</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 25 || isComplete ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Database className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">Data Fusion</p>
              <p className="text-xs text-slate-500">Satellite, DEM, Soil</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 50 || isComplete ? 'bg-primary text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Cpu className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">AI Model</p>
              <p className="text-xs text-slate-500">Statistical Downscaling</p>
            </div>
          </div>

          <div className="z-10 flex flex-col items-center gap-3">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg transition-colors duration-500 ${progress > 85 || isComplete ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
              <Map className="w-10 h-10" />
            </div>
            <div className="text-center">
              <p className="font-bold text-slate-800">Panchayat Output</p>
              <p className="text-xs text-slate-500">1km Resolution</p>
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="max-w-xl mx-auto bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center">
          {!isProcessing && !isComplete && (
            <div className="space-y-6">
              <Layers className="w-16 h-16 text-slate-300 mx-auto" />
              <div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Ready for Downscaling</h3>
                <p className="text-slate-500 text-sm">Initialize the pipeline to transform block level NWP data into high-resolution local forecasts.</p>
              </div>
              <button 
                onClick={startSimulation}
                className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95 flex items-center justify-center gap-2 mx-auto"
              >
                <Activity className="w-5 h-5" />
                Run Downscaling Engine
              </button>
            </div>
          )}

          {isProcessing && (
            <div className="space-y-6">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="animate-spin w-full h-full text-primary/20" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75 text-primary" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-primary font-bold text-xl">
                  {progress}%
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-700 mb-2">Processing Data Fusion...</h3>
                <p className="text-slate-500 text-sm">
                  {progress < 30 ? 'Ingesting NWP Block Forecast...' : 
                   progress < 60 ? 'Applying Elevation & Terrain models...' : 
                   progress < 90 ? 'Running spatial interpolation...' : 
                   'Generating Panchayat grids...'}
                </p>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
              </div>
            </div>
          )}

          {isComplete && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">Downscaling Complete</h3>
                <p className="text-slate-600 font-medium">Resolution improved from 9km to 1km</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase mb-1">Input Grid</p>
                  <p className="text-xl font-bold text-slate-800">1 Block</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-xs text-slate-500 font-medium uppercase mb-1">Output Grids</p>
                  <p className="text-xl font-bold text-primary">128 Panchayats</p>
                </div>
              </div>

              <button 
                onClick={startSimulation}
                className="text-primary font-semibold hover:underline text-sm"
              >
                Run Another Simulation
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <Server className="w-8 h-8 text-blue-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Data Fusion Layer</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Combines global NWP data with high-resolution satellite imagery (NDVI, soil moisture), Digital Elevation Models (DEM), and historical weather patterns.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <Cpu className="w-8 h-8 text-indigo-500 mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Machine Learning</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Uses statistical downscaling techniques (like Random Forest or Deep Learning) to learn the complex relationships between local topography and microclimates.
          </p>
        </div>
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <BarChart4 className="w-8 h-8 text-primary mb-4" />
          <h3 className="text-lg font-bold text-slate-800 mb-2">Actionable Output</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            Generates precise, localized weather parameters that feed directly into our agro-meteorological advisory system for farmer-specific recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
