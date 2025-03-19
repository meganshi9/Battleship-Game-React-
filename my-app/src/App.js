import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import RulesPage from './pages/RulesPage';
import HighScoresPage from './pages/HighScoresPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-900 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game/normal" element={<GamePage mode="normal" />} />
          <Route path="/game/easy" element={<GamePage mode="easy" />} />
          <Route path="/rules" element={<RulesPage />} />
          <Route path="/highscores" element={<HighScoresPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

