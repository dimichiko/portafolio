import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import StatsPage from './pages/StatsPage';

function App() {
  const [language, setLanguage] = useState<'es' | 'en'>('es');

  return (
    <Router>
      <div className="relative">
        <Routes>
          <Route path="/" element={<HomePage language={language} setLanguage={setLanguage} />} />
          <Route path="/stats" element={<StatsPage language={language} setLanguage={setLanguage} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
