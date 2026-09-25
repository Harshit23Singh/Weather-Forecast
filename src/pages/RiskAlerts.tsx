import { useState } from 'react';
import { 
  AlertTriangle, 
  Wind, 
  ThermometerSun, 
  CloudRain, 
  Waves,
  MapPin,
  Clock,
  Filter
} from 'lucide-react';

const alertsData = [
  {
    id: 1,
    type: 'Rain',
    title: 'Heavy Rainfall',
    location: 'Aima Panchayat',
    value: '32 mm',
    time: 'Next 18 hours',
    risk: 'High',
    icon: CloudRain,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  {
    id: 2,
    type: 'Heat',
    title: 'Heat Stress',
    location: 'Bharawan Panchayat',
    value: '38°C',
    time: 'Tomorrow 13:00-16:00',
    risk: 'Moderate',
    icon: ThermometerSun,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  },
  {
    id: 3,
    type: 'Wind',
    title: 'Strong Wind',
    location: 'Chandpur Panchayat',
    value: '31 km/h',
    time: 'Next 6 hours',
    risk: 'High',
    icon: Wind,
    color: 'bg-red-500',
    lightColor: 'bg-red-50',
    textColor: 'text-red-700',
    borderColor: 'border-red-200'
  },
  {
    id: 4,
    type: 'Crop Stress',
    title: 'Water Deficit',
    location: 'Lakhanpur Panchayat',
    value: 'Soil Moisture < 20%',
    time: 'Current',
    risk: 'Moderate',
    icon: Waves,
    color: 'bg-amber-500',
    lightColor: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200'
  }
];

export default function RiskAlerts() {
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Rain', 'Heat', 'Wind', 'Flood', 'Crop Stress'];

  const filteredAlerts = filter === 'All' 
    ? alertsData 
    : alertsData.filter(a => a.type === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 tracking-tight flex items-center gap-3">
            Risk & Alert Center
            <span className="bg-red-100 text-red-600 text-sm px-3 py-1 rounded-full font-bold">
              {alertsData.length} Active
            </span>
          </h1>
          <p className="text-slate-500 mt-1">High-resolution early warnings for targeted Panchayats.</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center gap-2 text-slate-500 mr-2">
          <Filter className="w-5 h-5" />
          <span className="text-sm font-semibold">Filter:</span>
        </div>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
              filter === f 
                ? 'bg-slate-800 text-white' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
          <div key={alert.id} className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-shadow`}>
            {/* Risk Indicator Line */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${alert.color}`}></div>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className={`${alert.lightColor} p-3 rounded-2xl ${alert.textColor}`}>
                  <alert.icon className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-800">{alert.title}</h2>
                  <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${alert.lightColor} ${alert.textColor}`}>
                    {alert.risk} Risk
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <MapPin className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Location</p>
                  <p className="font-semibold text-slate-800">{alert.location}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <AlertTriangle className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Expected</p>
                  <p className="font-semibold text-slate-800">{alert.value}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Clock className="w-5 h-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase">Timeframe</p>
                  <p className="font-semibold text-slate-800">{alert.time}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button className="text-primary font-semibold text-sm hover:underline flex items-center gap-1">
                View Panchayat Details <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        )) : (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Active {filter} Alerts</h3>
            <p className="text-slate-500">Conditions are currently normal for this category.</p>
          </div>
        )}
      </div>
      
      <div className="bg-slate-800 rounded-3xl p-6 text-white flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="bg-white/10 p-3 rounded-full">
             <AlertTriangle className="w-6 h-6 text-amber-400" />
          </div>
          <div>
            <h3 className="font-bold text-lg">Alert Propagation System</h3>
            <p className="text-slate-400 text-sm">Alerts are automatically forwarded to local Gram Panchayat officials.</p>
          </div>
        </div>
        <button className="bg-white text-slate-900 font-bold px-6 py-2.5 rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap">
          Configure SMS Alerts
        </button>
      </div>
    </div>
  );
}
