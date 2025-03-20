import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import RulesPage from "./pages/RulesPage";
import HighScoresPage from "./pages/HighScoresPage";
import { GameProvider } from "./context/GameContext";

function App() {
  return (
    <GameProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <div className="pt-20 flex justify-center">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game/normal" element={<GamePage mode="normal" />} />
              <Route path="/game/easy" element={<GamePage mode="easy" />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/highscores" element={<HighScoresPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </GameProvider>
  );
}

export default App;
