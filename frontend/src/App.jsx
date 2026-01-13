import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import DailyMission from './pages/DailyMission';
import SensoryNebula from './pages/SensoryNebula';
import PlanetMatcher from './pages/PlanetMatcher';
import AlienEmotions from './pages/AlienEmotions';
import SpaceSchool from './pages/SpaceSchool';
import ParentSettings from './pages/ParentSettings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/daily-mission" element={<DailyMission />} />
        <Route path="/sensory-nebula" element={<SensoryNebula />} />
        <Route path="/planet-matcher" element={<PlanetMatcher />} />
        <Route path="/alien-emotions" element={<AlienEmotions />} />
        <Route path="/space-school" element={<SpaceSchool />} />
        <Route path="/parent-settings" element={<ParentSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
