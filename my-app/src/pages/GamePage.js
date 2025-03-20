// src/pages/GamePage.js
import React from "react";
import { useGameContext } from "../context/GameContext";
import EasyGame from "./EasyGame";
import NormalGame from "./NormalGame";
import ShipPlacement from "./ShipPlacement"; // drag and drop

function GamePage({ mode }) {
  const { isPlacingShips } = useGameContext();

  if (mode === "easy") {
    return <EasyGame />;
  } else {
    // Normal mode
    return isPlacingShips ? <ShipPlacement /> : <NormalGame />;
  }
}

export default GamePage;
