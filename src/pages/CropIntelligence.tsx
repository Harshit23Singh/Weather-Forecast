import { useState } from 'react';
import { 
  Sprout, 
  Droplets, 
  ThermometerSun, 
  ShieldCheck, 
  AlertTriangle,
  ChevronDown,
  MapPin,
  CheckCircle2
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
import { useWeather } from '../context/WeatherContext';

interface CropConfig {
  name: string;
  stage: string;
  minTemp: number;
  maxTemp: number;
  minRain: number;
  maxRain: number;
  minHum: number;
  maxHum: number;
  waterNeed: 'Low' | 'Medium' | 'High';
  advice: (temp: number, rain: number, hum: number) => string;
}

const CROP_DATABASE: Record<string, CropConfig> = {
  'Wheat': {
    name: 'Wheat',
    stage: 'Flowering / Grain Filling',
    minTemp: 18,
    maxTemp: 26,
    minRain: 5,
    maxRain: 25,
    minHum: 50,
    maxHum: 70,
    waterNeed: 'Medium',
    advice: (temp, rain) => 
      rain > 5 
        ? 'Rainfall anticipated. Postpone light irrigation to prevent lodging during grain filling.'
        : temp > 30 
        ? 'High afternoon temperatures. Apply light evening irrigation to mitigate terminal heat stress.'
        : 'Weather conditions are optimal. Continue regular scouting for yellow rust and aphids.'
  },
  'Mustard': {
    name: 'Mustard',
    stage: 'Pod Formation',
    minTemp: 15,
    maxTemp: 25,
    minRain: 0,
    maxRain: 15,
    minHum: 45,
    maxHum: 65,
    waterNeed: 'Low',
    advice: (_, rain, hum) =>
      hum > 75 || rain > 3
        ? 'High humidity increases risk of white rust / Alternaria blight. Monitor closely and avoid nitrogenous fertilizers.'
        : 'Favorable conditions. Ensure pollinator activity is not disturbed by chemical spraying during peak morning hours.'
  },
  'Potato': {
    name: 'Potato',
    stage: 'Tuber Bulking',
    minTemp: 16,
    maxTemp: 23,
    minRain: 5,
    maxRain: 20,
    minHum: 60,
    maxHum: 80,
    waterNeed: 'Medium',
    advice: (temp, rain) =>
      rain > 10
        ? 'Excessive moisture can trigger late blight and tuber decay. Clear furrows and drain standing water.'
        : temp > 28
        ? 'Soil temperature rising. Maintain light surface moisture to keep ridge soil cool.'
        : 'Good vegetative and tuber development. Maintain optimal earthing-up.'
  },
  'Rice': {
    name: 'Rice',
    stage: 'Vegetative / Tillering',
    minTemp: 24,
    maxTemp: 34,
    minRain: 30,
    maxRain: 80,
    minHum: 70,
    maxHum: 90,
    waterNeed: 'High',
    advice: (_, rain) =>
      rain > 25
        ? 'Ample rainfall expected. Store surplus runoff in farm ponds and maintain bund height.'
        : 'Maintain 3-5 cm standing water layer in fields during active tillering.'
  },
  'Sugarcane': {
    name: 'Sugarcane',
    stage: 'Grand Growth',
    minTemp: 24,
    maxTemp: 38,
    minRain: 20,
    maxRain: 60,
    minHum: 60,
    maxHum: 85,
    waterNeed: 'High',
    advice: () => 'Maintain adequate trash mulching to conserve root zone moisture.'
  },
  'Vegetables': {
    name: 'Vegetables (Tomato/Chilli)',
    stage: 'Fruiting & Harvesting',
    minTemp: 18,
    maxTemp: 30,
    minRain: 5,
    maxRain: 20,
    minHum: 55,
    maxHum: 75,
    waterNeed: 'Medium',
    advice: (_, rain) =>
      rain > 10
        ? 'Stake heavy fruit-bearing branches and spray copper oxychloride if damping-off appears.'
        : 'Harvest mature fruits before afternoon heat to prolong shelf life.'
  }
};

export default function CropIntelligence() {
  const { location, weather } = useWeather();
  const [selectedCropKey, setSelectedCropKey] = useState<string>('Wheat');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const crop = CROP_DATABASE[selectedCropKey] || CROP_DATABASE['Wheat'];

  const curTemp = weather?.current.temperature ?? 28;
  const curRain = weather?.current.rainfall ?? 0;
  const curHum = weather?.current.humidity ?? 65;

  // Calculate suitability score (0 - 100%)
  const tempDiff = Math.max(0, curTemp < crop.minTemp ? crop.minTemp - curTemp : curTemp > crop.maxTemp ? curTemp - crop.maxTemp : 0);
  const humDiff = Math.max(0, curHum < crop.minHum ? crop.minHum - curHum : curHum > crop.maxHum ? curHum - crop.maxHum : 0);

  const score = Math.max(40, Math.min(98, Math.round(100 - tempDiff * 4 - humDiff * 0.8)));

  let healthStatus = 'Excellent';
  let healthColor = 'text-emerald-500';
  let riskBadge = 'Low';

  if (score < 65) {
    healthStatus = 'Stressed';
    healthColor = 'text-red-500';
    riskBadge = 'High';
  } else if (score < 80) {
    healthStatus = 'Moderate';
    healthColor = 'text-amber-500';
    riskBadge = 'Moderate';
  }

  const compatibilityData = [
    { label: 'Temperature', current: curTemp, optimalMin: crop.minTemp, optimalMax: crop.maxTemp, unit: '°C' },
    { label: 'Rainfall', current: curRain, optimalMin: crop.minRain, optimalMax: crop.maxRain, unit: 'mm' },
    { label: 'Humidity', current: curHum, optimalMin: crop.minHum, optimalMax: crop.maxHum, unit: '%' },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Crop Intelligence & Advisory</h1>
            <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Live Evaluation
            </span>
          </div>
          <p className="text-slate-500 mt-1">
            Real-time agro-climatic suitability and growth phase management for {location.panchayat || location.name}.
          </p>
        </div>
        
        {/* Crop Selector Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-3 bg-white border border-slate-200 px-4 py-2.5 rounded-2xl shadow-sm hover:bg-slate-50 transition-all min-w-[200px] justify-between"
          >
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-primary" />
              <span className="font-bold text-slate-800">{crop.name}</span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
              {Object.keys(CROP_DATABASE).map(cropName => (
                <button
                  key={cropName}
                  className={`w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors flex items-center justify-between ${
                    selectedCropKey === cropName ? 'bg-primary/10 text-primary font-bold' : 'text-slate-700'
                  }`}
                  onClick={() => {
                    setSelectedCropKey(cropName);
                    setIsDropdownOpen(false);
                  }}
                >
                  <span>{cropName}</span>
                  {selectedCropKey === cropName && <CheckCircle2 className="w-4 h-4 text-primary" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-3 text-emerald-600">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Crop Condition</h2>
          <p className={`text-3xl font-black ${healthColor}`}>{healthStatus}</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 text-blue-600">
            <Droplets className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Water Demand</h2>
          <p className="text-3xl font-black text-blue-600">{crop.waterNeed}</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-3 text-amber-600">
            <ThermometerSun className="w-8 h-8" />
          </div>
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Weather Suitability</h2>
          <div className="flex items-baseline gap-1">
            <p className="text-3xl font-black text-amber-500">{score}</p>
            <p className="text-lg font-bold text-slate-400">%</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current vs Optimal Range Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-800">Current vs Optimal Climate Range</h3>
              <p className="text-xs text-slate-500">Comparing live sensor feeds with ICAR agronomic thresholds</p>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={compatibilityData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fill: '#475569', fontWeight: 600 }} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="optimalMax" fill="#e2e8f0" radius={[0, 4, 4, 0]} barSize={22} name="Optimal Upper Limit" />
                <Bar dataKey="current" fill="#10b981" radius={[0, 4, 4, 0]} barSize={22} name="Live Reading" style={{ transform: 'translateY(-22px)' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-xs text-slate-500 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-slate-200 rounded-sm"></div> Optimal Range Upper Limit</div>
            <div className="flex items-center gap-2"><div className="w-3 h-3 bg-emerald-500 rounded-sm"></div> Live Field Value</div>
          </div>
        </div>

        {/* Advisory and Status */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-slate-800">Crop Phenology Status</h3>
              <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1">
                <MapPin className="w-3 h-3 text-primary" />
                {location.name}
              </span>
            </div>
             
            <div className="space-y-3.5">
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 text-sm font-medium">Selected Crop</span>
                <span className="font-bold text-slate-800">{crop.name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
                <span className="text-slate-500 text-sm font-medium">Growth Phase</span>
                <span className="font-bold text-primary">{crop.stage}</span>
              </div>
              <div className="flex justify-between items-center pb-1">
                <span className="text-slate-500 text-sm font-medium">Climatic Risk</span>
                <span className={`font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider ${
                  riskBadge === 'High' ? 'bg-red-100 text-red-700' :
                  riskBadge === 'Moderate' ? 'bg-amber-100 text-amber-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {riskBadge} Risk
                </span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 border border-emerald-200 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-bold text-emerald-900">Customized Advisory for {crop.name}</h3>
              </div>
              <p className="text-emerald-950 font-medium text-sm md:text-base leading-relaxed bg-white/70 p-4 rounded-2xl backdrop-blur-sm border border-emerald-100/60 shadow-sm">
                "{crop.advice(curTemp, curRain, curHum)}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
