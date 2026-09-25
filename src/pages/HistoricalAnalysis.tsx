import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { Filter, Calendar, MapPin, Download } from 'lucide-react';

const historicalData = [
  { year: '2019', rain: 820, avgTemp: 26.4, extremes: 4 },
  { year: '2020', rain: 910, avgTemp: 26.2, extremes: 2 },
  { year: '2021', rain: 780, avgTemp: 26.7, extremes: 6 },
  { year: '2022', rain: 850, avgTemp: 26.5, extremes: 3 },
  { year: '2023', rain: 720, avgTemp: 27.1, extremes: 8 },
  { year: '2024', rain: 890, avgTemp: 26.8, extremes: 5 },
  { year: '2025', rain: 840, avgTemp: 26.9, extremes: 4 },
];

const monthlyRainData = [
  { month: 'Jan', current: 15, historical: 12 },
  { month: 'Feb', current: 20, historical: 18 },
  { month: 'Mar', current: 10, historical: 15 },
  { month: 'Apr', current: 5, historical: 8 },
  { month: 'May', current: 40, historical: 45 },
  { month: 'Jun', current: 150, historical: 130 },
  { month: 'Jul', current: 280, historical: 310 },
  { month: 'Aug', current: 250, historical: 290 },
  { month: 'Sep', current: 180, historical: 160 },
  { month: 'Oct', current: 60, historical: 55 },
  { month: 'Nov', current: 10, historical: 12 },
  { month: 'Dec', current: 5, historical: 8 },
];

export default function HistoricalAnalysis() {
  const [selectedPanchayat, setSelectedPanchayat] = useState('Aima');

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Historical Analysis</h1>
          <p className="text-slate-500 mt-1">Analyze long-term climate trends and micro-climate shifts.</p>
        </div>
        
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-slate-600 font-semibold shadow-sm hover:bg-slate-50 transition-colors flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            {selectedPanchayat}
          </button>
          <button className="bg-white border border-slate-200 p-2 rounded-xl text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <Filter className="w-5 h-5" />
          </button>
          <button className="bg-primary text-white p-2 rounded-xl shadow-sm hover:bg-primary/90 transition-colors">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rainfall Trend */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Annual Rainfall Trend (2019-2025)</h3>
            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">mm / year</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="rain" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4, fill: '#3b82f6' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Trend */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Average Annual Temperature</h3>
            <span className="text-xs font-bold bg-amber-50 text-amber-600 px-2 py-1 rounded-full">°C</span>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={historicalData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={['dataMin - 0.5', 'dataMax + 0.5']} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Line type="monotone" dataKey="avgTemp" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#f59e0b' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Current Year vs Historical Avg */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Monthly Precipitation: Current Year vs 10-Year Average
            </h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRainData} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                <Bar dataKey="current" name="2026 Prediction (mm)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="historical" name="10-Year Average (mm)" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
