import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import DownscaleEngine from './pages/DownscaleEngine';
import WeatherMap from './pages/WeatherMap';
import CropIntelligence from './pages/CropIntelligence';
import AgroAdvisory from './pages/AgroAdvisory';
import RiskAlerts from './pages/RiskAlerts';
import HistoricalAnalysis from './pages/HistoricalAnalysis';
import Methodology from './pages/Methodology';
import { WeatherProvider } from './context/WeatherContext';

function App() {
  return (
    <WeatherProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="explorer" element={<Explorer />} />
            <Route path="downscale" element={<DownscaleEngine />} />
            <Route path="map" element={<WeatherMap />} />
            <Route path="crop-intelligence" element={<CropIntelligence />} />
            <Route path="advisory" element={<AgroAdvisory />} />
            <Route path="alerts" element={<RiskAlerts />} />
            <Route path="historical" element={<HistoricalAnalysis />} />
            <Route path="methodology" element={<Methodology />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WeatherProvider>
  );
}

export default App;
