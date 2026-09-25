import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Map, 
  Cpu, 
  Globe2, 
  Sprout, 
  ClipboardList, 
  AlertTriangle, 
  LineChart, 
  BookOpen,
  CloudSunRain
} from 'lucide-react';

const navItems = [
  { path: '/', icon: LayoutDashboard, label: 'Overview' },
  { path: '/explorer', icon: Map, label: 'Panchayat Explorer' },
  { path: '/downscale', icon: Cpu, label: 'Downscaling Engine' },
  { path: '/map', icon: Globe2, label: 'Weather Map' },
  { path: '/crop-intelligence', icon: Sprout, label: 'Crop Intelligence' },
  { path: '/advisory', icon: ClipboardList, label: 'Agro Advisory' },
  { path: '/alerts', icon: AlertTriangle, label: 'Risk & Alerts' },
  { path: '/historical', icon: LineChart, label: 'Historical Analysis' },
  { path: '/methodology', icon: BookOpen, label: 'Methodology' },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col shadow-sm">
      <div className="h-16 flex items-center px-6 border-b border-slate-100">
        <div className="flex items-center gap-2 text-primary">
          <CloudSunRain className="w-8 h-8" />
          <span className="font-bold text-xl tracking-tight text-slate-800">Mausam<span className="text-primary">Setu</span></span>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-500">
          <p className="font-semibold text-slate-700 mb-1">SIH Prototype</p>
          <p>Ministry of Earth Sciences & India Meteorological Department</p>
        </div>
      </div>
    </aside>
  );
}
