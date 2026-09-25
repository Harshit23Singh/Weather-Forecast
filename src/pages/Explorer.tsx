import { useState, useEffect } from 'react';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Sprout, 
  AlertTriangle,
  RefreshCw,
  Compass
} from 'lucide-react';
import { useWeather } from '../context/WeatherContext';
import { fetchLiveWeatherData, type WeatherDataResult } from '../services/weatherService';
import LeafletMap, { type MapPolygon, type MapMarker } from '../components/map/LeafletMap';

interface PanchayatZone {
  id: number;
  name: string;
  lat: number;
  lng: number;
  crop: string;
  stage: string;
  coordinates: [number, number][];
}

const PANCHAYAT_ZONES: PanchayatZone[] = [
  {
    id: 1,
    name: 'Aima',
    lat: 26.935,
    lng: 80.725,
    crop: 'Wheat (PBW 550)',
    stage: 'Crown Root Initiation',
    coordinates: [
      [26.95, 80.71], [26.95, 80.74], [26.92, 80.74], [26.92, 80.71]
    ]
  },
  {
    id: 2,
    name: 'Bharawan',
    lat: 26.905,
    lng: 80.725,
    crop: 'Mustard (Pusa Bold)',
    stage: 'Pod Formation',
    coordinates: [
      [26.92, 80.71], [26.92, 80.74], [26.89, 80.74], [26.89, 80.71]
    ]
  },
  {
    id: 3,
    name: 'Chandpur',
    lat: 26.935,
    lng: 80.695,
    crop: 'Wheat (HD 2967)',
    stage: 'Tillering',
    coordinates: [
      [26.95, 80.68], [26.95, 80.71], [26.92, 80.71], [26.92, 80.68]
    ]
  },
  {
    id: 4,
    name: 'Lakhanpur',
    lat: 26.905,
    lng: 80.695,
    crop: 'Potato (Kufri Jyoti)',
    stage: 'Tuber Initiation',
    coordinates: [
      [26.92, 80.68], [26.92, 80.71], [26.89, 80.71], [26.89, 80.68]
    ]
  }
];

export default function Explorer() {
  const { setLocation } = useWeather();
  const [selectedZone, setSelectedZone] = useState<PanchayatZone>(PANCHAYAT_ZONES[0]);
  const [zoneWeather, setZoneWeather] = useState<WeatherDataResult | null>(null);
  const [isLoadingZone, setIsLoadingZone] = useState<boolean>(true);

  // Fetch live weather specifically for the selected panchayat coordinates
  useEffect(() => {
    let isMounted = true;
    setIsLoadingZone(true);
    fetchLiveWeatherData(selectedZone.lat, selectedZone.lng)
      .then(res => {
        if (isMounted) {
          setZoneWeather(res);
          setIsLoadingZone(false);
        }
      })
      .catch(err => {
        console.error('Error fetching panchayat weather:', err);
        if (isMounted) setIsLoadingZone(false);
      });

    return () => {
      isMounted = false;
    };
  }, [selectedZone]);

  const cur = zoneWeather?.current;
  const rainProb = zoneWeather?.hourly?.[0]?.rainProb ?? 15;
  const advisory = zoneWeather?.advisories?.[0];

  // Dynamic risk calculation from live readings
  let riskLevel = 'Low';
  let riskColor = 'bg-green-100 text-green-700 border-green-200';

  if ((cur?.rainfall ?? 0) > 10 || rainProb > 60 || (cur?.windSpeed ?? 0) > 20) {
    riskLevel = 'High';
    riskColor = 'bg-red-100 text-red-700 border-red-200';
  } else if ((cur?.rainfall ?? 0) > 2 || rainProb > 35 || (cur?.temperature ?? 0) > 34) {
    riskLevel = 'Moderate';
    riskColor = 'bg-amber-100 text-amber-700 border-amber-200';
  }

  const handleSelectZone = (zone: PanchayatZone) => {
    setSelectedZone(zone);
    setLocation({
      name: zone.name,
      panchayat: `${zone.name} Gram Panchayat`,
      block: 'Malihabad',
      district: 'Lucknow',
      lat: zone.lat,
      lng: zone.lng
    });
  };

  const mapPolygons: MapPolygon[] = PANCHAYAT_ZONES.map((p) => {
    const isSelected = p.id === selectedZone.id;
    return {
      id: p.id,
      positions: p.coordinates,
      color: isSelected ? '#10b981' : '#64748b',
      fillColor: isSelected ? '#10b981' : '#94a3b8',
      weight: isSelected ? 3 : 1.5,
      fillOpacity: isSelected ? 0.4 : 0.15,
      popupTitle: `${p.name} Panchayat`,
      popupContent: `Major Crop: <b>${p.crop}</b><br/>Growth: ${p.stage}<br/><i>Click to select</i>`,
      onClick: () => handleSelectZone(p)
    };
  });

  const mapMarkers: MapMarker[] = [
    {
      lat: selectedZone.lat,
      lng: selectedZone.lng,
      popupTitle: `${selectedZone.name} Panchayat Center`,
      popupContent: `Live Temp: <b>${cur?.temperature ?? '--'}°C</b><br/>Rain: <b>${cur?.rainfall ?? 0} mm</b>`,
      isCenter: true
    }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-7.5rem)] space-y-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 tracking-tight">
            Panchayat Explorer
          </h1>
          <p className="text-slate-500 text-xs md:text-sm">
            Live micro-climate weather telemetry and crop advisories for individual Gram Panchayats.
          </p>
        </div>

        {/* Quick Panchayat Buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
          {PANCHAYAT_ZONES.map(z => (
            <button
              key={z.id}
              onClick={() => handleSelectZone(z)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                selectedZone.id === z.id 
                  ? 'bg-primary text-white shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Map Container */}
        <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 relative min-h-[500px] h-[550px]">
          <LeafletMap
            center={[selectedZone.lat, selectedZone.lng]}
            zoom={13}
            markers={mapMarkers}
            polygons={mapPolygons}
            className="w-full h-full"
            style={{ minHeight: '500px' }}
          />
          
          <div className="absolute top-4 right-4 z-[400] bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-slate-100 pointer-events-none">
            <h4 className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Micro-Grid Status</h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Selected Active Zone</div>
              <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> Neighboring Panchayat</div>
            </div>
          </div>

          <div className="absolute top-4 left-14 z-[400] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md border border-slate-200 text-xs font-semibold text-slate-700 hidden sm:flex items-center gap-1.5 pointer-events-none">
            <Compass className="w-3.5 h-3.5 text-primary" />
            Click any polygon on map to inspect Panchayat
          </div>
        </div>

        {/* Live Info Panel */}
        <div className="w-full lg:w-96 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Micro-Climate Stream</p>
                <h2 className="text-2xl font-bold text-slate-800">{selectedZone.name} Panchayat</h2>
                <p className="text-xs text-slate-400">Malihabad Block, Lucknow</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${riskColor}`}>
                {riskLevel} Risk
              </div>
            </div>

            {isLoadingZone ? (
              <div className="py-12 text-center text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-primary" />
                <p className="text-xs">Fetching live Panchayat readings...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border border-slate-100">
                    <Thermometer className="w-5 h-5 text-amber-500 mb-1" />
                    <p className="text-2xl font-bold text-slate-800">{cur?.temperature ?? '--'}°C</p>
                    <p className="text-[11px] text-slate-500 font-medium">Temperature</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border border-slate-100">
                    <CloudRain className="w-5 h-5 text-blue-500 mb-1" />
                    <p className="text-2xl font-bold text-slate-800">{cur?.rainfall ?? 0} mm</p>
                    <p className="text-[11px] text-slate-500 font-medium">Rainfall</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border border-slate-100">
                    <Droplets className="w-5 h-5 text-cyan-500 mb-1" />
                    <p className="text-2xl font-bold text-slate-800">{cur?.humidity ?? '--'}%</p>
                    <p className="text-[11px] text-slate-500 font-medium">Humidity</p>
                  </div>
                  <div className="bg-slate-50 rounded-2xl p-3.5 flex flex-col items-center justify-center text-center border border-slate-100">
                    <Wind className="w-5 h-5 text-indigo-500 mb-1" />
                    <p className="text-2xl font-bold text-slate-800">{cur?.windSpeed ?? '--'} km/h</p>
                    <p className="text-[11px] text-slate-500 font-medium">Wind</p>
                  </div>
                </div>

                <div className="mb-6 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <div className="flex justify-between items-center mb-1.5">
                    <p className="text-xs font-semibold text-slate-700">Precipitation Probability</p>
                    <p className="text-xs font-bold text-blue-600">{rainProb}%</p>
                  </div>
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-500" 
                      style={{ width: `${rainProb}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-primary/5 rounded-2xl p-4 border border-primary/20 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/20 p-2.5 rounded-xl text-primary shrink-0">
                      <Sprout className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 font-medium">Panchayat Crop Status</p>
                      <p className="font-bold text-slate-800 text-sm">{selectedZone.crop}</p>
                      <p className="text-xs text-slate-500">{selectedZone.stage}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
                  <div className="flex items-center gap-2 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wide">
                      {advisory?.title || 'Localized Agro Advisory'}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 font-medium leading-relaxed">
                    {advisory?.summary || 'Normal field conditions. Maintain regular monitoring.'}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
