import { 
  Network, 
  Map as MapIcon, 
  Cpu, 
  Database,
  ArrowRight
} from 'lucide-react';

export default function Methodology() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Methodology</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          Understanding the science and data pipeline behind MausamSetu's high-resolution forecasting.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-12">
        
        {/* Why Downscaling */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <MapIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Why Downscaling?</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p className="text-lg leading-relaxed">
              Global and regional Numerical Weather Prediction (NWP) models typically provide forecasts at a coarse resolution (e.g., 9 km x 9 km or larger). While useful for general weather trends, this block-level resolution <strong className="text-slate-800">fails to capture critical local microclimates</strong>.
            </p>
            <p className="text-lg leading-relaxed">
              Within a single 9 km block, there can be significant variations in topography, land cover, and soil types, leading to vastly different weather conditions between neighboring Panchayats. A single block-level advisory might instruct all farmers to irrigate, wasting water for some and damaging crops for others.
            </p>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* The Pipeline */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
              <Network className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">The MausamSetu Pipeline</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xl shrink-0 z-10 border-4 border-white shadow-sm">1</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">Input: Coarse NWP Data</h3>
                <p className="text-slate-600">We ingest standard block-level forecast data from IMD models, including base temperature, precipitation probabilities, and synoptic scale wind patterns.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-xl shrink-0 z-10 border-4 border-white shadow-sm">2</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-3">Multi-modal Data Fusion</h3>
                <p className="text-slate-600 mb-4">The low-resolution forecast is fused with high-resolution static and dynamic environmental datasets:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Database className="w-5 h-5 text-indigo-500 mb-2" />
                    <h4 className="font-semibold text-slate-700">Digital Elevation Model (DEM)</h4>
                    <p className="text-sm text-slate-500 mt-1">Accounts for temperature lapse rates and orographic rainfall effects.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <MapIcon className="w-5 h-5 text-indigo-500 mb-2" />
                    <h4 className="font-semibold text-slate-700">Land Use / Land Cover</h4>
                    <p className="text-sm text-slate-500 mt-1">Determines surface albedo and evapotranspiration potential.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-xl shrink-0 z-10 border-4 border-white shadow-sm">3</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">AI-Driven Spatial Downscaling</h3>
                <p className="text-slate-600">Using statistical machine learning models (such as Random Forests or localized Convolutional Neural Networks), the system learns the non-linear relationships between the coarse forecast and local topographical features to predict weather variables at a 1 km x 1 km grid resolution.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-xl shrink-0 z-10 border-4 border-white shadow-sm">4</div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Agro-Meteorological Translation</h3>
                <p className="text-slate-600">The high-resolution weather data is intersected with crop intelligence databases (crop type, growth stage, soil type) to generate hyper-specific, actionable advisories for individual Panchayats.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Data Flow Diagram */}
        <section className="bg-slate-50 rounded-3xl p-8 border border-slate-200 text-center">
          <h2 className="text-xl font-bold text-slate-800 mb-8">Conceptual Data Flow</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm font-semibold text-slate-700">
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto">
              NWP Block Forecast
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-200 w-full md:w-auto shadow-indigo-100">
              <span className="text-indigo-600 block mb-1 text-xs">AI Downscaling Engine</span>
              Data Fusion Model
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white p-4 rounded-xl shadow-sm border border-primary/30 w-full md:w-auto shadow-primary/10">
              <span className="text-primary block mb-1 text-xs">1km Resolution</span>
              Panchayat Forecast
            </div>
            <ArrowRight className="w-6 h-6 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-amber-500 text-white p-4 rounded-xl shadow-lg w-full md:w-auto">
              Farmer Advisory
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
