import { 
  Network, 
  Map as MapIcon, 
  Database,
  ArrowRight
} from 'lucide-react';

export default function Methodology() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-16">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">System Methodology & Architecture</h1>
        <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto">
          Scientific data pipeline, spatial downscaling algorithms, and agro-meteorological intelligence powering Gram Mausam AI.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 space-y-12">
        
        {/* Why Downscaling */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-primary/10 p-3 rounded-2xl text-primary">
              <MapIcon className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800">Why Spatial Downscaling Matters</h2>
          </div>
          <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
            <p className="text-base md:text-lg leading-relaxed">
              Numerical Weather Prediction (NWP) models typically compute forecast variables at regional grid resolutions (e.g., 9 km × 9 km or 12 km × 12 km). While sufficient for macro synoptic weather patterns, this block-level resolution <strong className="text-slate-800">fails to resolve critical local microclimates</strong>.
            </p>
            <p className="text-base md:text-lg leading-relaxed">
              Within a single 9 km block, local elevation differences, soil moisture gradients, and vegetative cover cause significant micro-variations in temperature, humidity, and convective precipitation. A single uniform block advisory risks prescribing incorrect irrigation or spraying decisions.
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
            <h2 className="text-2xl font-bold text-slate-800">The Gram Mausam AI Pipeline</h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 font-bold text-lg shrink-0 z-10 border-4 border-white shadow-sm">1</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">Input: Coarse NWP Synoptic Data</h3>
                <p className="text-slate-600 text-sm">Ingests standard regional forecast models, including baseline surface temperature, precipitation probabilities, geopotential heights, and synoptic-scale wind patterns.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold text-lg shrink-0 z-10 border-4 border-white shadow-sm">2</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-3">Multi-Modal Static & Dynamic Data Fusion</h3>
                <p className="text-slate-600 text-sm mb-4">The synoptic forecast is fused with high-resolution environmental covariates:</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <Database className="w-5 h-5 text-indigo-500 mb-2" />
                    <h4 className="font-semibold text-slate-700 text-sm">Digital Elevation Model (DEM 30m)</h4>
                    <p className="text-xs text-slate-500 mt-1">Accounts for adiabatic lapse rates, slope aspect, and orographic precipitation triggers.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <MapIcon className="w-5 h-5 text-indigo-500 mb-2" />
                    <h4 className="font-semibold text-slate-700 text-sm">Land Surface Temperature & NDVI</h4>
                    <p className="text-xs text-slate-500 mt-1">Estimates vegetative transpiration, surface roughness, and localized albedo.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-lg shrink-0 z-10 border-4 border-white shadow-sm">3</div>
                <div className="w-0.5 bg-slate-200 h-full my-2"></div>
              </div>
              <div className="pb-8">
                <h3 className="text-lg font-bold text-slate-800 mb-2">High-Resolution Spatial Disaggregation</h3>
                <p className="text-slate-600 text-sm">Statistical downscaling and spatial interpolation models resolve non-linear microclimatic interactions, producing continuous 1 km² Panchayat weather fields.</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 font-bold text-lg shrink-0 z-10 border-4 border-white shadow-sm">4</div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">Prescriptive Agro-Meteorological Translation</h3>
                <p className="text-slate-600 text-sm">Downscaled forecasts are cross-referenced with crop phenology databases (crop variety, growth stage, root depth, pest thresholds) to output farm-ready actionable advisories.</p>
              </div>
            </div>
          </div>
        </section>

        <hr className="border-slate-100" />

        {/* Data Flow Diagram */}
        <section className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 text-center">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Operational Data Flow</h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-xs md:text-sm font-semibold text-slate-700">
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200 w-full md:w-auto">
              NWP Regional Models (9km)
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-indigo-200 w-full md:w-auto shadow-indigo-100">
              <span className="text-indigo-600 block mb-0.5 text-[10px] uppercase font-bold">Spatial Disaggregation</span>
              Multi-Layer Fusion Core
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-primary/30 w-full md:w-auto shadow-primary/10">
              <span className="text-primary block mb-0.5 text-[10px] uppercase font-bold">1 km² Micro-Grid</span>
              Gram Panchayat Stream
            </div>
            <ArrowRight className="w-5 h-5 text-slate-400 rotate-90 md:rotate-0" />
            <div className="bg-primary text-white p-3.5 rounded-xl shadow-lg w-full md:w-auto">
              Farmer Action Directives
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
