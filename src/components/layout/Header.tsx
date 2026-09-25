import { Bell, MapPin, Search, Menu, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 z-10 shadow-sm">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-slate-500 hover:text-slate-700">
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden md:flex items-center gap-2 text-sm text-slate-600 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-slate-800">Demo Location:</span> Malihabad, Lucknow, UP
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center text-xs text-slate-500 mr-2">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Last Updated: 12 minutes ago
        </div>

        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors">
          <span>Farmer Mode</span>
          <div className="w-8 h-4 bg-primary/20 rounded-full relative">
            <div className="w-4 h-4 bg-white rounded-full absolute left-0 shadow-sm border border-slate-200"></div>
          </div>
        </div>

        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
        </button>
        
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
