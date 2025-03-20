import EasyGame from "./EasyGame";
import NormalGame from "./NormalGame";

function GamePage({ mode }) {
  return mode === "easy" ? <EasyGame /> : <NormalGame />;
}

export default GamePage;
