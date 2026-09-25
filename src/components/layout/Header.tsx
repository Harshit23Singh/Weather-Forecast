import { useState, useRef, useEffect } from 'react';
import { 
  Bell, 
  MapPin, 
  Search, 
  Menu, 
  RefreshCw, 
  Navigation, 
  ChevronDown, 
  X,
  Compass,
  CloudSunRain,
  LogOut,
  UserCheck,
  Shield
} from 'lucide-react';
import { useWeather } from '../../context/WeatherContext';
import { useAuth } from '../../context/AuthContext';
import { searchLocationsOnline, type LocationInfo } from '../../services/weatherService';

interface HeaderProps {
  onMenuToggle?: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  const { 
    location, 
    setLocation, 
    isLoading, 
    lastUpdated, 
    refreshWeather, 
    detectUserLocation, 
    isLocating,
    presetPanchayats 
  } = useWeather();

  const { user, loginWithGoogle, logout, loading: authLoading } = useAuth();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<LocationInfo[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close modals on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 1) {
      setSearchResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setIsSearching(true);
      const results = await searchLocationsOnline(searchQuery);
      setSearchResults(results);
      setIsSearching(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Syncing...';
    return lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-3 md:px-6 z-30 shadow-sm sticky top-0">
      <div className="flex items-center gap-2 md:gap-3">
        {/* Mobile Hamburger Button */}
        <button 
          onClick={onMenuToggle}
          aria-label="Open navigation menu"
          className="md:hidden text-slate-700 hover:text-slate-900 p-2 rounded-xl hover:bg-slate-100 active:scale-95 transition-all"
        >
          <Menu className="w-6 h-6 text-slate-800" />
        </button>

        {/* Mobile Brand Logo */}
        <div className="flex md:hidden items-center gap-1.5 text-primary mr-1">
          <CloudSunRain className="w-5 h-5 text-primary shrink-0" />
          <span className="font-bold text-sm tracking-tight text-slate-900">Gram Mausam AI</span>
        </div>
        
        {/* Location Dropdown & Selector */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm text-slate-700 bg-slate-100 hover:bg-slate-200/80 px-2.5 md:px-3.5 py-1.5 rounded-full border border-slate-200 transition-all font-medium"
          >
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary shrink-0" />
            <span className="font-bold text-slate-900 truncate max-w-[110px] sm:max-w-[160px] md:max-w-[200px]">
              {location.panchayat || location.name}
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              ({location.district || location.state || 'Live'})
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 md:w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-3 py-2 border-b border-slate-100 flex justify-between items-center">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Featured Agri Panchayats</p>
                <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Live Telemetry</span>
              </div>
              <div className="max-h-60 overflow-y-auto py-1 space-y-0.5">
                {presetPanchayats.map((p) => (
                  <button
                    key={p.name}
                    onClick={() => {
                      setLocation(p);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition-colors flex items-center justify-between ${
                      location.name === p.name 
                        ? 'bg-primary/10 text-primary font-bold' 
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <p className="font-semibold text-xs md:text-sm">{p.name}</p>
                      <p className="text-[11px] text-slate-400">{p.panchayat || p.block}, {p.district}</p>
                    </div>
                    {location.name === p.name && (
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                    )}
                  </button>
                ))}
              </div>

              <div className="p-2 pt-2 border-t border-slate-100 flex flex-col gap-1">
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    setIsSearchOpen(true);
                  }}
                  className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Search className="w-3.5 h-3.5 text-slate-500" />
                  Search Indian Panchayats / Districts
                </button>
                
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    detectUserLocation();
                  }}
                  disabled={isLocating}
                  className="w-full py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                >
                  <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
                  {isLocating ? 'Detecting GPS...' : 'Use My GPS Location'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Search Trigger Button */}
        <div className="relative" ref={searchRef}>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="hidden sm:flex items-center gap-2 text-xs text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full shadow-sm transition-colors font-medium"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span>Search Village, District, City...</span>
          </button>

          {/* Search Modal Dropdown */}
          {isSearchOpen && (
            <div className="absolute left-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <Search className="w-4 h-4 text-slate-400 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Type village, block, city (e.g. Malihabad, Karnal, Niphad)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full text-sm outline-none bg-transparent text-slate-800 placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {isSearching && (
                <div className="py-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-primary" />
                  Searching national database...
                </div>
              )}

              {!isSearching && searchResults.length > 0 && (
                <div className="max-h-64 overflow-y-auto py-2 space-y-1">
                  {searchResults.map((res, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setLocation(res);
                        setIsSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-sm hover:bg-primary/5 transition-colors flex items-center justify-between group"
                    >
                      <div>
                        <p className="font-semibold text-slate-800 group-hover:text-primary text-xs md:text-sm">{res.name}</p>
                        <p className="text-[11px] text-slate-400">
                          {[res.panchayat, res.district, res.state, res.country].filter(Boolean).join(', ')}
                        </p>
                      </div>
                      <Compass className="w-4 h-4 text-slate-300 group-hover:text-primary shrink-0" />
                    </button>
                  ))}
                </div>
              )}

              {!isSearching && searchQuery.length >= 1 && searchResults.length === 0 && (
                <div className="py-6 text-center text-xs text-slate-500">
                  No matches found. Try typing district or nearby town name.
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Live Status & Refresh Button */}
        <div className="hidden lg:flex items-center text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200/60">
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span>Live Ingestion: {formatLastUpdated()}</span>
          <button
            onClick={() => refreshWeather()}
            disabled={isLoading}
            title="Refresh Live Data"
            className="ml-2 p-1 hover:bg-slate-200/80 rounded-full transition-colors text-slate-600"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-primary' : ''}`} />
          </button>
        </div>

        {/* GPS Quick Button */}
        <button
          onClick={detectUserLocation}
          disabled={isLocating}
          title="Detect Current GPS Location"
          className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 px-2.5 md:px-3 py-1.5 rounded-full text-xs font-bold border border-slate-200 transition-colors"
        >
          <Navigation className={`w-3.5 h-3.5 text-primary ${isLocating ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">{isLocating ? 'Locating...' : 'My GPS'}</span>
        </button>

        {/* Notifications */}
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
        </button>
        
        {/* Google Authentication / User Profile */}
        <div className="relative" ref={userMenuRef}>
          {user ? (
            <div>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-primary/30 transition-all"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'User'}
                    className="w-8 h-8 rounded-full object-cover border border-slate-200"
                  />
                ) : (
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white font-black text-xs shadow-sm">
                    {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.displayName || 'User'}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                      />
                    ) : (
                      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-sm">
                        {user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                      </div>
                    )}
                    <div className="overflow-hidden">
                      <p className="font-bold text-slate-800 text-sm truncate">{user.displayName || 'Gram Mausam User'}</p>
                      <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    </div>
                  </div>

                  <div className="py-2 space-y-1 text-xs">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600 bg-slate-50 rounded-xl">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Role: <strong>Farmer / Advisory User</strong></span>
                    </div>
                    <div className="flex items-center gap-2 px-2 py-1.5 text-slate-600">
                      <Shield className="w-3.5 h-3.5 text-primary" />
                      <span>Auth: Google Verified</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        logout();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full py-2 px-3 bg-red-50 hover:bg-red-100 text-red-700 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => loginWithGoogle()}
              disabled={authLoading}
              className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm px-3 py-1.5 rounded-full text-xs font-bold transition-all active:scale-95"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign In</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
