import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Eye, 
  CloudLightning,
  MapPin,
  TrendingUp,
  AlertCircle,
  Cpu
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const forecastData = [
  { time: '00:00', temp: 24, rain: 0 },
  { time: '04:00', temp: 22, rain: 0 },
  { time: '08:00', temp: 26, rain: 2 },
  { time: '12:00', temp: 31, rain: 5 },
  { time: '16:00', temp: 29, rain: 12 },
  { time: '20:00', temp: 26, rain: 4 },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Hyperlocal Weather Intelligence & Agro-Meteorological Advisory</p>
        </div>
        
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-lg">
            <MapPin className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Selected Panchayat</p>
            <p className="font-semibold text-slate-800">Aima, Malihabad</p>
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Panchayats Covered', value: '128', icon: MapPin, color: 'text-blue-500', bg: 'bg-blue-50' },
          { label: 'Blocks', value: '12', icon: Eye, color: 'text-indigo-500', bg: 'bg-indigo-50' },
          { label: 'Forecast Resolution', value: '1 km', icon: TrendingUp, color: 'text-green-500', bg: 'bg-green-50' },
          { label: 'Forecast Accuracy', value: '92.4%', icon: Eye, color: 'text-emerald-500', bg: 'bg-emerald-50' },
          { label: 'Active Alerts', value: '7', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-50' },
          { label: 'Advisory Generated', value: '342', icon: CloudLightning, color: 'text-amber-500', bg: 'bg-amber-50' },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center group hover:shadow-md transition-shadow">
            <div className={`${kpi.bg} p-3 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
              <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
            </div>
            <p className="text-2xl font-bold text-slate-800">{kpi.value}</p>
            <p className="text-xs text-slate-500 mt-1 font-medium">{kpi.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Current Weather Card */}
        <div className="lg:col-span-1 bg-gradient-to-br from-primary to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20">
            <CloudLightning className="w-48 h-48" />
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-primary-foreground/80 font-medium">Current Weather</p>
                <h2 className="text-3xl font-bold mt-1">Aima</h2>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium">
                Today
              </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="text-6xl font-bold tracking-tighter">29°</div>
              <div className="text-primary-foreground/90 text-lg font-medium">
                Partly Cloudy
                <p className="text-sm font-normal text-primary-foreground/70">Feels like 32°</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Droplets className="w-5 h-5 text-emerald-200" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Humidity</p>
                  <p className="font-semibold">72%</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Wind className="w-5 h-5 text-emerald-200" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Wind</p>
                  <p className="font-semibold">14 km/h</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <CloudRain className="w-5 h-5 text-emerald-200" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Rainfall</p>
                  <p className="font-semibold">4.2 mm</p>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 flex items-center gap-3">
                <Thermometer className="w-5 h-5 text-emerald-200" />
                <div>
                  <p className="text-xs text-primary-foreground/70">Pressure</p>
                  <p className="font-semibold">1008 hPa</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Downscale Visualization Preview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Forecast Transformation</h3>
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wide">
              Downscale Demo
            </span>
          </div>

          <div className="flex-1 flex flex-col md:flex-row items-center justify-between gap-6 relative">
            {/* Block Level */}
            <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-200 w-full">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-slate-400" />
                <h4 className="font-semibold text-slate-700">Block Forecast</h4>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Resolution</span>
                  <span className="font-medium">9x9 km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Area Avg Temp</span>
                  <span className="font-medium">31°C</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Area Avg Rain</span>
                  <span className="font-medium">12 mm</span>
                </div>
              </div>
              <div className="w-full aspect-square bg-slate-200 rounded-lg overflow-hidden grid grid-cols-3 grid-rows-3 gap-0.5">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className="bg-blue-300/30 w-full h-full"></div>
                ))}
              </div>
            </div>

            {/* AI Engine Arrow */}
            <div className="flex flex-col items-center z-10 shrink-0">
              <div className="bg-primary/10 p-3 rounded-full text-primary animate-pulse">
                <Cpu className="w-6 h-6" />
              </div>
              <p className="text-xs font-bold text-primary mt-2">MausamSetu AI</p>
              <div className="h-0.5 w-16 bg-gradient-to-r from-transparent via-primary to-transparent my-2 hidden md:block"></div>
            </div>

            {/* Panchayat Level */}
            <div className="flex-1 bg-primary/5 rounded-2xl p-5 border border-primary/20 w-full shadow-[0_0_20px_rgba(20,184,101,0.1)]">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-4 h-4 text-primary" />
                <h4 className="font-semibold text-primary">Panchayat Forecast</h4>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Resolution</span>
                  <span className="font-medium text-primary">1x1 km</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Local Temp</span>
                  <span className="font-medium">29.8°C</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Local Rain</span>
                  <span className="font-medium text-blue-600">17.4 mm</span>
                </div>
              </div>
              <div className="w-full aspect-square bg-slate-200 rounded-lg overflow-hidden grid grid-cols-3 grid-rows-3 gap-0.5 relative">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`w-full h-full ${i === 4 ? 'bg-blue-500 ring-2 ring-primary ring-inset z-10' : 'bg-blue-300/30'}`}></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Forecast Chart */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold text-slate-800 mb-6">Today's Weather Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#f59e0b" fillOpacity={1} fill="url(#colorTemp)" />
                <Area type="monotone" dataKey="rain" stroke="#3b82f6" fillOpacity={1} fill="url(#colorRain)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Advisory */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-amber-100 p-3 rounded-full text-amber-600">
              <CloudRain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800">Critical Advisory</h3>
              <p className="text-sm text-slate-500">For Aima Panchayat</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6">
            <p className="text-slate-800 font-medium text-lg leading-relaxed">
              "Moderate to heavy rainfall is expected within the next 24 hours. Local variations indicate up to 17.4 mm in this specific grid."
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-slate-700 font-medium">Delay irrigation for the next 48 hours</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-slate-700 font-medium">Avoid pesticide spraying today</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 bg-green-100 text-green-600 rounded-full p-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <p className="text-slate-700 font-medium">Ensure drainage channels are clear</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
