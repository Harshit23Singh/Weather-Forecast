import { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  CloudRain, 
  Wind, 
  Thermometer, 
  Droplets, 
  Sprout,
  AlertTriangle
} from 'lucide-react';

// Mock coordinates for Panchayats in Malihabad Block
const panchayats = [
  {
    id: 1,
    name: 'Aima',
    coordinates: [
      [26.95, 80.71], [26.95, 80.74], [26.92, 80.74], [26.92, 80.71]
    ] as [number, number][],
    temp: 29.8,
    rain: 17.4,
    humidity: 76,
    wind: 12,
    prob: 82,
    crop: 'Wheat',
    stage: 'Flowering',
    risk: 'Moderate',
    advisory: 'Rain expected within 24 hours. Avoid irrigation and postpone pesticide spraying.',
    color: '#3b82f6' // blue for rain
  },
  {
    id: 2,
    name: 'Bharawan',
    coordinates: [
      [26.92, 80.71], [26.92, 80.74], [26.89, 80.74], [26.89, 80.71]
    ] as [number, number][],
    temp: 31.1,
    rain: 9.0,
    humidity: 65,
    wind: 10,
    prob: 45,
    crop: 'Mustard',
    stage: 'Vegetative',
    risk: 'Low',
    advisory: 'Conditions are optimal. Proceed with scheduled activities.',
    color: '#22c55e' // green
  },
  {
    id: 3,
    name: 'Chandpur',
    coordinates: [
      [26.95, 80.68], [26.95, 80.71], [26.92, 80.71], [26.92, 80.68]
    ] as [number, number][],
    temp: 28.9,
    rain: 24.0,
    humidity: 82,
    wind: 18,
    prob: 95,
    crop: 'Wheat',
    stage: 'Flowering',
    risk: 'High',
    advisory: 'Heavy rain alert. Ensure proper field drainage immediately.',
    color: '#ef4444' // red
  },
  {
    id: 4,
    name: 'Lakhanpur',
    coordinates: [
      [26.92, 80.68], [26.92, 80.71], [26.89, 80.71], [26.89, 80.68]
    ] as [number, number][],
    temp: 30.4,
    rain: 6.0,
    humidity: 62,
    wind: 8,
    prob: 30,
    crop: 'Potato',
    stage: 'Tuber Initiation',
    risk: 'Low',
    advisory: 'Monitor soil moisture. Light irrigation may be needed tomorrow.',
    color: '#22c55e'
  }
];

export default function Explorer() {
  const [selectedPanchayat, setSelectedPanchayat] = useState(panchayats[0]);

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Panchayat Explorer</h1>
        <p className="text-slate-500 mt-1">Interactive high-resolution weather map for agro-advisory.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Map Container */}
        <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 relative min-h-[400px]">
          <MapContainer 
            center={[26.92, 80.71]} 
            zoom={13} 
            className="w-full h-full"
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            
            {panchayats.map((p) => (
              <Polygon
                key={p.id}
                positions={p.coordinates}
                pathOptions={{ 
                  color: p.color, 
                  weight: p.id === selectedPanchayat.id ? 4 : 2, 
                  fillOpacity: p.id === selectedPanchayat.id ? 0.4 : 0.2 
                }}
                eventHandlers={{
                  click: () => setSelectedPanchayat(p),
                }}
              >
                <Popup>
                  <div className="font-semibold">{p.name} Panchayat</div>
                  <div className="text-xs text-slate-500">Click to view details</div>
                </Popup>
              </Polygon>
            ))}
          </MapContainer>
          
          <div className="absolute top-4 right-4 z-[400] bg-white p-3 rounded-xl shadow-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Weather Risk</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> High Risk</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Rain Expected</div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Optimal</div>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="w-full lg:w-96 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 overflow-y-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-sm font-medium text-primary">Selected Panchayat</p>
              <h2 className="text-2xl font-bold text-slate-800">{selectedPanchayat.name}</h2>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider
              ${selectedPanchayat.risk === 'High' ? 'bg-red-100 text-red-700' : 
                selectedPanchayat.risk === 'Moderate' ? 'bg-amber-100 text-amber-700' : 
                'bg-green-100 text-green-700'}`}>
              {selectedPanchayat.risk} Risk
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Thermometer className="w-6 h-6 text-amber-500 mb-2" />
              <p className="text-2xl font-bold text-slate-800">{selectedPanchayat.temp}°C</p>
              <p className="text-xs text-slate-500 font-medium">Temperature</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <CloudRain className="w-6 h-6 text-blue-500 mb-2" />
              <p className="text-2xl font-bold text-slate-800">{selectedPanchayat.rain} mm</p>
              <p className="text-xs text-slate-500 font-medium">Rainfall</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Droplets className="w-6 h-6 text-cyan-500 mb-2" />
              <p className="text-2xl font-bold text-slate-800">{selectedPanchayat.humidity}%</p>
              <p className="text-xs text-slate-500 font-medium">Humidity</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <Wind className="w-6 h-6 text-slate-500 mb-2" />
              <p className="text-2xl font-bold text-slate-800">{selectedPanchayat.wind} km/h</p>
              <p className="text-xs text-slate-500 font-medium">Wind</p>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold text-slate-700">Rain Probability</p>
              <p className="text-sm font-bold text-blue-600">{selectedPanchayat.prob}%</p>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500 rounded-full" 
                style={{ width: `${selectedPanchayat.prob}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/20 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-primary/20 p-2 rounded-lg">
                <Sprout className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Crop Intelligence</p>
                <p className="font-bold text-slate-800">{selectedPanchayat.crop} <span className="text-slate-400 font-normal">({selectedPanchayat.stage})</span></p>
              </div>
            </div>
          </div>

          <div className={`${
            selectedPanchayat.risk === 'High' ? 'bg-red-50 border-red-200' :
            selectedPanchayat.risk === 'Moderate' ? 'bg-amber-50 border-amber-200' :
            'bg-green-50 border-green-200'
          } rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className={`w-5 h-5 ${
                selectedPanchayat.risk === 'High' ? 'text-red-500' :
                selectedPanchayat.risk === 'Moderate' ? 'text-amber-500' :
                'text-green-500'
              }`} />
              <h4 className="font-bold text-slate-800">Agro Advisory</h4>
            </div>
            <p className="text-sm text-slate-700 font-medium leading-relaxed">
              {selectedPanchayat.advisory}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
