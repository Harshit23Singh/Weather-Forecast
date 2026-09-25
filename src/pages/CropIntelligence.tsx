import { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  ThermometerSun, 
  ShieldCheck, 
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const crops = ['Wheat', 'Rice', 'Maize', 'Potato', 'Sugarcane', 'Mustard', 'Pulses', 'Vegetables'];

const compatibilityData = [
  { name: 'Temp', current: 29, optimalMin: 20, optimalMax: 25, label: 'Temperature' },
  { name: 'Rain', current: 17, optimalMin: 10, optimalMax: 30, label: 'Rainfall' },
  { name: 'Hum', current: 76, optimalMin: 50, optimalMax: 70, label: 'Humidity' },
];

export default function CropIntelligence() {
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Crop Intelligence</h1>
          <p className="text-slate-500 mt-1">Weather compatibility and risk assessment for specific crops.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition-colors w-48 justify-between"
          >
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              <span className="font-semibold text-slate-700">{selectedCrop}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {crops.map(crop => (
                <button
                  key={crop}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${selectedCrop === crop ? 'bg-primary/5 text-primary font-semibold' : 'text-slate-700'}`}
                  onClick={() => {
                    setSelectedCrop(crop);
                    setIsDropdownOpen(false);
                  }}
                >
                  {crop}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600">
            <ShieldCheck className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Crop Health</h2>
          <p className="text-3xl font-black text-green-500">Good</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600">
            <Droplets className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Water Requirement</h2>
          <p className="text-3xl font-black text-blue-500">Medium</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-4 text-amber-600">
            <ThermometerSun className="w-10 h-10" />
          </div>
          <h2 className="text-xl font-bold text-slate-800 mb-1">Weather Suitability</h2>
          <div className="flex items-baseline gap-1">
            <p className="text-4xl font-black text-amber-500">82</p>
            <p className="text-xl font-bold text-slate-400">%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Current Conditions vs Optimal Range</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={compatibilityData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#e2e8f0" />
                <XAxis type="number" hide />
                <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 14, fill: '#475569', fontWeight: 600 }} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="optimalMax" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={24} name="Optimal Max" />
                <Bar dataKey="current" fill="#10b981" radius={[0, 4, 4, 0]} barSize={24} name="Current Condition" style={{ transform: 'translateY(-24px)' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-slate-500 flex items-center justify-center gap-4">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Optimal Range</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Current Value</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-800">Crop Status</h3>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Aima Panchayat</span>
             </div>
             
             <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Selected Crop</span>
                  <span className="font-bold text-slate-800 text-lg">{selectedCrop}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <span className="text-slate-500 font-medium">Growth Stage</span>
                  <span className="font-bold text-primary">Flowering Stage</span>
                </div>
                <div className="flex justify-between items-center pb-1">
                  <span className="text-slate-500 font-medium">Weather Risk</span>
                  <span className="font-bold text-amber-500 bg-amber-50 px-3 py-1 rounded-full text-sm">Low-Moderate</span>
                </div>
             </div>
          </div>

          <div className="bg-emerald-50 rounded-3xl p-6 border border-emerald-100 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Sprout className="w-32 h-32 text-emerald-900" />
             </div>
             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="w-5 h-5 text-emerald-600" />
                  <h3 className="text-lg font-bold text-emerald-800">Recommended Action</h3>
                </div>
                <p className="text-emerald-900 font-medium text-lg leading-relaxed bg-white/50 p-4 rounded-xl backdrop-blur-sm">
                  “Rainfall is expected tomorrow. Soil moisture will reach optimal levels naturally. Avoid irrigation today to prevent potential waterlogging during the sensitive flowering stage.”
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
