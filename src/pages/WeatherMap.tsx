import { useState } from 'react';
import { Layers, Thermometer, Droplets, CloudRain, Wind } from 'lucide-react';

export default function WeatherMap() {
  const [activeLayer, setActiveLayer] = useState('Rainfall');
  
  const layers = [
    { name: 'Temperature', icon: Thermometer, colors: ['bg-yellow-200', 'bg-amber-400', 'bg-orange-500', 'bg-red-500', 'bg-red-700'] },
    { name: 'Rainfall', icon: CloudRain, colors: ['bg-blue-100', 'bg-blue-300', 'bg-blue-500', 'bg-blue-700', 'bg-indigo-900'] },
    { name: 'Humidity', icon: Droplets, colors: ['bg-green-100', 'bg-green-300', 'bg-emerald-500', 'bg-emerald-700', 'bg-teal-900'] },
    { name: 'Wind', icon: Wind, colors: ['bg-slate-100', 'bg-slate-300', 'bg-slate-400', 'bg-slate-600', 'bg-slate-800'] },
  ];

  const currentColors = layers.find(l => l.name === activeLayer)?.colors || layers[1].colors;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Full Weather Map</h1>
          <p className="text-slate-500 mt-1">Visualize high-resolution downscaled data across the block.</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex">
          <button className="px-4 py-1.5 rounded-lg font-semibold text-sm bg-slate-100 text-slate-800">
            Panchayat View
          </button>
          <button className="px-4 py-1.5 rounded-lg font-medium text-sm text-slate-500 hover:text-slate-800 transition-colors">
            Block View
          </button>
        </div>
      </div>

      <div className="flex-1 flex gap-6 min-h-0 relative">
        {/* Layer Controls - Absolute positioned on map */}
        <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-md rounded-2xl p-3 shadow-lg border border-slate-200 flex flex-col gap-2">
          <h4 className="text-xs font-bold text-slate-500 uppercase px-2 mb-1 flex items-center gap-2">
            <Layers className="w-3 h-3" /> Map Layers
          </h4>
          {layers.map(layer => (
            <button
              key={layer.name}
              onClick={() => setActiveLayer(layer.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-colors text-sm font-medium ${
                activeLayer === layer.name 
                  ? 'bg-primary text-white shadow-md' 
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <layer.icon className="w-4 h-4" />
              {layer.name}
            </button>
          ))}
        </div>

        {/* Legend - Absolute positioned */}
        <div className="absolute bottom-4 right-4 z-10 bg-white/90 backdrop-blur-md rounded-xl p-4 shadow-lg border border-slate-200">
          <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">{activeLayer} Intensity</h4>
          <div className="flex items-center gap-1 mb-2">
            {currentColors.map((color, i) => (
              <div key={i} className={`h-4 w-10 ${color} rounded-sm`}></div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-slate-500 font-medium">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        {/* Simulated Map Background */}
        <div className="flex-1 bg-[#e5e7eb] rounded-3xl overflow-hidden relative border border-slate-300">
          {/* Simulated Grids representing downscaled data */}
          <div className="absolute inset-0 grid grid-cols-8 grid-rows-6 gap-0.5 p-0.5 opacity-80">
            {Array.from({ length: 48 }).map((_, i) => {
              // Generate some random looking patterns based on index
              const intensity = (Math.sin(i * 0.5) + Math.cos(i * 0.8) + 2) / 4; // value between 0 and 1
              let colorClass = currentColors[0];
              if (intensity > 0.8) colorClass = currentColors[4];
              else if (intensity > 0.6) colorClass = currentColors[3];
              else if (intensity > 0.4) colorClass = currentColors[2];
              else if (intensity > 0.2) colorClass = currentColors[1];
              
              return (
                <div 
                  key={i} 
                  className={`${colorClass} hover:opacity-75 transition-opacity cursor-crosshair relative group rounded-sm`}
                >
                  <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50">
                    Cell {i+1}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <h2 className="text-3xl font-black text-slate-800/20 rotate-[-15deg]">SIH PROTOTYPE DEMO</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
