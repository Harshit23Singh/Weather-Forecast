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
  CloudSunRain,
  X,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  isMobile?: boolean;
  onClose?: () => void;
}

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

export default function Sidebar({ isMobile = false, onClose }: SidebarProps) {
  return (
    <aside className={`bg-white border-r border-slate-200 flex flex-col shadow-sm ${
      isMobile ? 'w-72 h-full' : 'w-64 hidden md:flex h-screen'
    }`}>
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-2.5 text-primary">
          <div className="bg-primary/10 p-1.5 rounded-xl">
            <CloudSunRain className="w-6 h-6 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">
            Gram <span className="text-primary font-black">Mausam AI</span>
          </span>
        </div>

        {isMobile && (
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3">
        <div className="mb-2 px-3">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Navigation</span>
        </div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (isMobile && onClose) {
                  onClose();
                }
              }}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-900'
                }`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-slate-100 shrink-0 space-y-2">
        <div className="bg-slate-900 text-white rounded-2xl p-3 border border-slate-800 space-y-1.5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Autonomous Agent</span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              24/7 ACTIVE
            </span>
          </div>
          <p className="text-[11px] text-slate-300 leading-tight">
            Self-Supervising Agro-Sentinel auto-dispatching alerts.
          </p>
        </div>

        <div className="bg-slate-50 rounded-2xl p-3 border border-slate-100 space-y-1">
          <div className="flex items-center gap-2 text-slate-800 font-bold text-xs">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>Gram Mausam AI v2.4</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-tight">
            1km² Physics-Informed Micro-Grid System
          </p>
        </div>
      </div>
    </aside>
  );
}
