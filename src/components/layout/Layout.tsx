import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative z-50 animate-in slide-in-from-left duration-200 shadow-2xl h-full">
            <Sidebar isMobile={true} onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 w-full overflow-hidden">
        <Header onMenuToggle={() => setIsMobileMenuOpen(prev => !prev)} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 bg-slate-50/50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
