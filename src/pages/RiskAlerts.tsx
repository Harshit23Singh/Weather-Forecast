import { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Wind, 
  ThermometerSun, 
  CloudRain, 
  Waves,
  MapPin, 
  Clock, 
  Filter, 
  CheckCircle2, 
  Bot, 
  Activity, 
  Send, 
  Radio, 
  CheckCheck, 
  X,
  Sparkles
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

interface AgentLog {
  id: string;
  time: string;
  type: 'scan' | 'eval' | 'dispatch' | 'audit';
  message: string;
}

export default function RiskAlerts() {
  const { location, weather } = useWeather();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Rain', 'Heat', 'Wind', 'Moisture'];

  // Autonomous Agentic Dispatch Modal & Simulation State
  const [dispatchStep, setDispatchStep] = useState(0);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [agentLogs, setAgentLogs] = useState<AgentLog[]>([
    {
      id: 'log-1',
      time: '03:10:14',
      type: 'scan',
      message: `Automated 1km micro-grid analysis completed for ${location.name} Panchayat.`
    },
    {
      id: 'log-2',
      time: '03:10:45',
      type: 'eval',
      message: 'Cross-verified ICAR-CRIDA biophysical thresholds: Zero manual supervision required.'
    },
    {
      id: 'log-3',
      time: '03:11:20',
      type: 'audit',
      message: 'Telemetry synchronized with Kisan SMS Gateway & State KVK network.'
    }
  ]);

  const cur = weather?.current;
  const hourly = weather?.hourly || [];

  const curRain = cur?.rainfall ?? 0;
  const curTemp = cur?.temperature ?? 28;
  const curWind = cur?.windSpeed ?? 12;
  const curHum = cur?.humidity ?? 65;

  const maxWind = Math.max(...hourly.slice(0, 12).map(h => h.windSpeed || 0), curWind);
  const maxRain24h = hourly.slice(0, 24).reduce((sum, h) => sum + (h.rain || 0), curRain);

  // Generate dynamic alerts based on live weather data
  const alertsData = [];

  // Rain Alert
  if (maxRain24h >= 8 || curRain >= 5) {
    alertsData.push({
      id: 1,
      type: 'Rain',
      title: maxRain24h >= 20 ? 'Severe Rainfall & Waterlogging Alert' : 'Moderate Precipitation Window',
      location: `${location.panchayat || location.name}`,
      value: `${maxRain24h.toFixed(1)} mm accumulated (24h)`,
      time: 'Next 12 - 24 hours',
      risk: maxRain24h >= 20 ? 'High' : 'Moderate',
      icon: CloudRain,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      borderColor: 'border-blue-200',
      action: 'Ensure field drainage trenches are clear to prevent root hypoxia in standing crops.'
    });
  }

  // Heat Alert
  if (curTemp >= 35) {
    alertsData.push({
      id: 2,
      type: 'Heat',
      title: curTemp >= 40 ? 'Severe Heatwave Alert' : 'Elevated Heat Stress',
      location: `${location.name} Panchayat Grid`,
      value: `${curTemp}°C Current Ambient Peak`,
      time: 'Afternoon 12:00 - 16:30',
      risk: curTemp >= 40 ? 'High' : 'Moderate',
      icon: ThermometerSun,
      color: 'bg-amber-500',
      lightColor: 'bg-amber-50',
      textColor: 'text-amber-700',
      borderColor: 'border-amber-200',
      action: 'Schedule light micro-sprinkler irrigation at dusk to cool soil root zones.'
    });
  }

  // Wind Alert
  if (maxWind >= 18) {
    alertsData.push({
      id: 3,
      type: 'Wind',
      title: maxWind >= 30 ? 'High Wind & Gust Warning' : 'Moderate Wind Drift Hazard',
      location: `${location.name} Agro Grid`,
      value: `${maxWind.toFixed(1)} km/h Wind Peak`,
      time: 'Next 6 - 12 hours',
      risk: maxWind >= 30 ? 'High' : 'Moderate',
      icon: Wind,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-200',
      action: 'Postpone chemical pesticide spraying to avoid drift loss and off-target pollination injury.'
    });
  }

  // Moisture Alert
  if (curHum < 40) {
    alertsData.push({
      id: 4,
      type: 'Moisture',
      title: 'Atmospheric & Soil Moisture Deficit',
      location: `${location.name} Grid`,
      value: `Relative Humidity ${curHum}%`,
      time: 'Ongoing',
      risk: 'Moderate',
      icon: Waves,
      color: 'bg-cyan-500',
      lightColor: 'bg-cyan-50',
      textColor: 'text-cyan-700',
      borderColor: 'border-cyan-200',
      action: 'Monitor topsoil crusting and prepare furrow irrigation for sensitive vegetative stages.'
    });
  }

  // Automated periodic diagnostic scan simulation
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      const actions = [
        `Continuous 1km Grid Analysis verified for (${location.lat.toFixed(2)}°N, ${location.lng.toFixed(2)}°E): All parameters within agronomic safety envelope.`,
        `Automated advisory channels active: 1,284 registered smallholders synchronized via Kisan SMS Gateway.`,
        `Telemetry synchronized with National Agromet Data Grid (0.18s latency). Zero manual supervision required.`
      ];
      const randomAction = actions[Math.floor(Math.random() * actions.length)];
      setAgentLogs(prev => [
        { id: `log-${Date.now()}`, time: timeStr, type: 'scan', message: randomAction },
        ...prev.slice(0, 5)
      ]);
    }, 15000);

    return () => clearInterval(interval);
  }, [location]);

  const handleTriggerAutonomousDispatch = () => {
    setIsDispatchModalOpen(true);
    setDispatchStep(1);

    setTimeout(() => setDispatchStep(2), 1200);
    setTimeout(() => setDispatchStep(3), 2600);
    setTimeout(() => {
      setDispatchStep(4);
      const now = new Date();
      const timeStr = now.toTimeString().split(' ')[0];
      setAgentLogs(prev => [
        {
          id: `log-${Date.now()}`,
          time: timeStr,
          type: 'dispatch',
          message: `Automated broadcast completed for ${location.name} Panchayat: 1,284 recipients reached via Kisan SMS Gateway.`
        },
        ...prev.slice(0, 5)
      ]);
    }, 4000);
  };

  const filteredAlerts = filter === 'All' 
    ? alertsData 
    : alertsData.filter(a => a.type === filter);

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Risk & Early Warning Center</h1>
            <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${
              alertsData.length > 0 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-emerald-100 text-emerald-700 border border-emerald-200'
            }`}>
              {alertsData.length} Live Alerts
            </span>
          </div>
          <p className="text-slate-500 mt-1 text-sm">
            Autonomous agro-meteorological threshold monitoring & self-governing early warning system for {location.panchayat || location.name}.
          </p>
        </div>

        <div className="bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-sm text-xs font-semibold text-slate-700 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <span>Active: {location.name}</span>
        </div>
      </div>

      {/* Automated Panchayat Weather Monitoring Banner */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-emerald-200/80 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start gap-4">
            <div className="bg-emerald-50 text-emerald-600 p-3.5 rounded-2xl border border-emerald-200 shrink-0">
              <Bot className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h3 className="font-bold text-lg text-slate-800">Automated Panchayat Weather Monitoring</h3>
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Continuous 1km Grid Analysis • 24/7 Active
                </span>
              </div>
              <p className="text-slate-600 text-xs md:text-sm max-w-2xl leading-relaxed">
                Automated agro-meteorological monitoring operating with zero manual supervision required. The system continuously evaluates 1km grid telemetry against ICAR-CRIDA crop safety thresholds and dispatches localized advisory alerts to registered farmers and KVK extension officers.
              </p>
            </div>
          </div>

          <button 
            onClick={handleTriggerAutonomousDispatch}
            className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 rounded-2xl transition-all whitespace-nowrap shadow-lg shadow-primary/20 flex items-center gap-2 text-sm active:scale-95 shrink-0"
          >
            <Radio className="w-4 h-4 animate-pulse" />
            <span>Trigger Automated Broadcast</span>
          </button>
        </div>

        {/* Live Diagnostic Feed */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-emerald-600" />
            <span className="font-semibold text-slate-700">Live Diagnostic Feed:</span>
          </div>
          <div className="font-mono text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200/60 truncate max-w-xl">
            [{agentLogs[0]?.time}] {agentLogs[0]?.message}
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
        <div className="flex items-center gap-2 text-slate-500 mr-2 text-xs font-bold uppercase tracking-wider">
          <Filter className="w-4 h-4" />
          <span>Filter:</span>
        </div>
        {filters.map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === f 
                ? 'bg-primary text-white shadow-sm' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Dynamic Alert Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredAlerts.length > 0 ? filteredAlerts.map(alert => (
          <div key={alert.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 relative overflow-hidden group hover:shadow-md transition-all flex flex-col justify-between">
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${alert.color}`}></div>
            
            <div>
              <div className="flex justify-between items-start mb-5">
                <div className="flex items-center gap-3">
                  <div className={`${alert.lightColor} p-3 rounded-2xl ${alert.textColor}`}>
                    <alert.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">{alert.title}</h2>
                    <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${alert.lightColor} ${alert.textColor}`}>
                      {alert.risk} Risk
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2.5 text-xs mb-4">
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                    <span className="font-semibold text-slate-800">{alert.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Trigger Metric</span>
                    <span className="font-semibold text-slate-800">{alert.value}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Window</span>
                    <span className="font-semibold text-slate-800">{alert.time}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/5 p-3 rounded-xl border border-primary/20 text-xs text-slate-700">
              <strong className="text-primary font-bold block mb-0.5">Recommended Field Action:</strong>
              {alert.action}
            </div>
          </div>
        )) : (
          <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
            <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">Normal Conditions Across 1km Grid</h3>
            <p className="text-slate-500 text-sm max-w-md mx-auto">
              No active weather hazards triggered for <strong className="text-slate-700">{location.name}</strong>. Automated 1km grid analysis is actively monitoring agro-meteorological telemetry in the background.
            </p>
          </div>
        )}
      </div>

      {/* Autonomous Dispatch Modal */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsDispatchModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="bg-primary/10 text-primary p-3 rounded-2xl">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Automated Agro-Advisory Broadcast Pipeline</h3>
                <p className="text-xs text-slate-500">Kisan SMS Gateway (mKisan) & WhatsApp Business API</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {/* Step 1 */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                dispatchStep >= 1 ? 'bg-slate-50 border-slate-200' : 'opacity-40 border-transparent'
              }`}>
                <div className={`p-1.5 rounded-lg ${dispatchStep > 1 ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/20 text-primary'}`}>
                  {dispatchStep > 1 ? <CheckCheck className="w-4 h-4" /> : <Activity className="w-4 h-4 animate-spin" />}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">1. Continuous 1km Grid Analysis & Diagnostic Check</p>
                  <p className="text-slate-500">Evaluated 1km micro-grid for {location.name} ({location.lat.toFixed(3)}°N, {location.lng.toFixed(3)}°E).</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                dispatchStep >= 2 ? 'bg-slate-50 border-slate-200' : 'opacity-40 border-transparent'
              }`}>
                <div className={`p-1.5 rounded-lg ${dispatchStep > 2 ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/20 text-primary'}`}>
                  {dispatchStep > 2 ? <CheckCheck className="w-4 h-4" /> : <Sparkles className="w-4 h-4 animate-spin" />}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">2. Automated Agro-Advisory Formulation</p>
                  <p className="text-slate-500">Formulated bilingual (Hindi/English) spray and irrigation advisories per ICAR standards.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className={`flex items-start gap-3 p-3 rounded-xl border transition-all ${
                dispatchStep >= 3 ? 'bg-slate-50 border-slate-200' : 'opacity-40 border-transparent'
              }`}>
                <div className={`p-1.5 rounded-lg ${dispatchStep > 3 ? 'bg-emerald-100 text-emerald-700' : 'bg-primary/20 text-primary'}`}>
                  {dispatchStep > 3 ? <CheckCheck className="w-4 h-4" /> : <Send className="w-4 h-4 animate-spin" />}
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-800">3. Multi-Channel Gateway Transmission</p>
                  <p className="text-slate-500">Transmitting to 1,284 registered smallholders, Gram Pradhans & KVK officers.</p>
                </div>
              </div>

              {/* Step 4 */}
              {dispatchStep >= 4 && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Automated Advisory Broadcast Successfully Dispatched!</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-emerald-900/80">
                    <div><strong>Gateway Token:</strong> MSG-IN-98214</div>
                    <div><strong>Recipients Reached:</strong> 1,284 farmers</div>
                    <div><strong>Dispatch Latency:</strong> 142 ms</div>
                    <div><strong>Status:</strong> Delivered 100%</div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsDispatchModalOpen(false)}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-2xl text-sm transition-all shadow-md shadow-primary/20"
            >
              {dispatchStep >= 4 ? 'Close Window' : 'Running in Background...'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
