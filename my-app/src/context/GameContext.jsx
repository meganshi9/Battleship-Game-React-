// GameContext.js
import React, { createContext, useState, useEffect, useContext } from "react";

export const GameContext = createContext();

const SHIP_SIZES = [5, 4, 3, 3, 2];
const BOARD_SIZE = 10;

//Bonus: local storage
const STORAGE_KEY = "battleshipGameState";
//Local state
function loadState() {
  const state = localStorage.getItem(STORAGE_KEY);
  return state ? JSON.parse(state) : null;
}

function saveState(state) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clearState() {
  localStorage.removeItem(STORAGE_KEY);
}

function createEmptyBoard() {
  return Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));
}

export function GameProvider({ children }) {
  //Create player board
  const [playerBoard, setPlayerBoard] = useState(createEmptyBoard());
  //Create ai board
  const [aiBoard, setAiBoard] = useState(createEmptyBoard());
  //Current turn
  const [currentTurn, setCurrentTurn] = useState("player");
  //Game status
  const [gameOver, setGameOver] = useState(false);
  //Set a winner
  const [winner, setWinner] = useState(null);
  //Set a timer
  const [timer, setTimer] = useState(0);
  //Bonus: check if player's turn
  const [isPlacingShips, setIsPlacingShips] = useState(true);
  //Ship list
  const [shipsToPlace, setShipsToPlace] = useState(
    SHIP_SIZES.map((size, index) => ({
      id: index,
      size,
      orientation: "horizontal", // initial stage
    }))
  );

  // Place ships randomly. applied on aiboard
  const placeShipsOnBoard = (board) => {
    const newBoard = board.map((row) => [...row]);
    SHIP_SIZES.forEach((size) => {
      let placed = false;
      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(
          Math.random() * (isHorizontal ? BOARD_SIZE : BOARD_SIZE - size + 1)
        );
        const col = Math.floor(
          Math.random() * (isHorizontal ? BOARD_SIZE - size + 1 : BOARD_SIZE)
        );
        if (canPlaceShip(newBoard, row, col, size, isHorizontal)) {
          for (let i = 0; i < size; i++) {
            if (isHorizontal) newBoard[row][col + i] = "S";
            else newBoard[row + i][col] = "S";
          }
          placed = true;
        }
      }
    });
    return newBoard;
  };
  //Check if cell is vacant
  const canPlaceShip = (board, row, col, size, isHorizontal) => {
    for (let i = 0; i < size; i++) {
      const r = row + (isHorizontal ? 0 : i);
      const c = col + (isHorizontal ? i : 0);
      if (r >= 10 || c >= 10 || board[r][c] !== null) return false;
    }
    return true;
  };

  //Initialize boards
  const initGame = () => {
    const savedState = loadState();
    if (
      savedState &&
      !savedState.gameOver &&
      savedState.aiBoard &&
      savedState.aiBoard.some((row) => row.includes("S"))
    ) {
      setPlayerBoard(savedState.playerBoard);
      setAiBoard(savedState.aiBoard);
      setCurrentTurn(savedState.currentTurn);
      setTimer(savedState.timer);
      setGameOver(savedState.gameOver);
      setWinner(savedState.winner);
      setIsPlacingShips(savedState.isPlacingShips || false);
      setShipsToPlace(savedState.shipsToPlace || []);
    } else {
      setPlayerBoard(createEmptyBoard()); //only provide empty board for player to drag
      setAiBoard(placeShipsOnBoard(createEmptyBoard()));
      setCurrentTurn("player");
      setGameOver(false);

      setWinner(null);
      setIsPlacingShips(true); // Start drag mode
      setShipsToPlace(
        SHIP_SIZES.map((size, index) => ({
          id: index,
          size,
          orientation: "horizontal",
        }))
      );
      //After drag and drop, start a timer
      setTimer(0);
    }
  };

  //Handle drag and drop
  const handleShipDrop = (ship, row, col) => {
    if (!isPlacingShips) return false;
    const newBoard = playerBoard.map((r) => [...r]);
    const isHorizontal = ship.orientation === "horizontal";
    if (!canPlaceShip(newBoard, row, col, ship.size, isHorizontal)) {
      // Invalid placement
      return false;
    }
    // Mark ship position
    for (let i = 0; i < ship.size; i++) {
      if (isHorizontal) newBoard[row][col + i] = "S";
      else newBoard[row + i][col] = "S";
    }
    setPlayerBoard(newBoard);
    // remove this board
    setShipsToPlace((prev) => {
      const updated = prev.filter((s) => s.id !== ship.id);
      //If all ships are placed, end drag and drop
      if (updated.length === 0) {
        setIsPlacingShips(false);
        setTimer(0);
      }
      return updated;
    });
    return true;
  };

  const rotateShip = (shipId) => {
    setShipsToPlace((prev) =>
      prev.map((s) =>
        s.id === shipId
          ? {
              ...s,
              orientation:
                s.orientation === "horizontal" ? "vertical" : "horizontal",
            }
          : s
      )
    );
  };
  //Handle player moves
  const handlePlayerMove = (row, col) => {
    if (isPlacingShips) return; //attack is not allowed during drag turn
    if (currentTurn !== "player" || gameOver) return;
    const newAiBoard = aiBoard.map((row) => [...row]);
    // Avoid repeated clicks
    if (newAiBoard[row][col] === "H" || newAiBoard[row][col] === "M") return;
    if (newAiBoard[row][col] === "S") {
      newAiBoard[row][col] = "H"; // targeted
    } else {
      newAiBoard[row][col] = "M"; // untargeted
    }
    setAiBoard(newAiBoard);
    // Check if all ships are hitted
    if (checkAllShipsSunk(newAiBoard)) {
      setGameOver(true);
      // Player win. Set a winning banner
      setWinner("player");
      clearState();
      return;
    }
    // Switch to ai
    setCurrentTurn("ai");
    setTimeout(aiMove, 1000);
  };

  //Handle ai moves
  const aiMove = () => {
    if (gameOver || isPlacingShips) return;
    const newPlayerBoard = playerBoard.map((row) => [...row]);
    let availableMoves = [];
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (newPlayerBoard[r][c] !== "H" && newPlayerBoard[r][c] !== "M") {
          availableMoves.push({ r, c });
        }
      }
    }
    if (availableMoves.length === 0) return;
    const move =
      availableMoves[Math.floor(Math.random() * availableMoves.length)];
    const { r, c } = move;
    if (newPlayerBoard[r][c] === "S") {
      newPlayerBoard[r][c] = "H";
    } else if (newPlayerBoard[r][c] === null) {
      newPlayerBoard[r][c] = "M";
    }
    setPlayerBoard(newPlayerBoard);
    // Check if all player's ships are sunk
    if (checkAllShipsSunk(newPlayerBoard)) {
      setGameOver(true);
      // AI win. Set a winning banner
      setWinner("ai");
      clearState();
      return;
    }
    // Switch to player's turn
    setCurrentTurn("player");
  };
  //Check if all ships are sunk
  const checkAllShipsSunk = (board) => {
    for (let r = 0; r < BOARD_SIZE; r++) {
      for (let c = 0; c < BOARD_SIZE; c++) {
        if (board[r][c] === "S") {
          return false;
        }
      }
    }
    return true;
  };

  //Reset Game
  const resetGame = () => {
    clearState();
    initGame();
  };

  //Timer logic
  useEffect(() => {
    let timerInterval;
    //start a timer when game is not over and all ships are placed
    if (!gameOver && !isPlacingShips) {
      timerInterval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [gameOver, isPlacingShips]);
  //Save data to local storage
  useEffect(() => {
    const state = {
      playerBoard,
      aiBoard,
      currentTurn,
      timer,
      gameOver,
      winner,
      isPlacingShips,
      shipsToPlace,
    };
    saveState(state);
  }, [
    playerBoard,
    aiBoard,
    currentTurn,
    timer,
    gameOver,
    winner,
    isPlacingShips,
    shipsToPlace,
  ]);

  // Initialize game
  useEffect(() => {
    initGame();
  }, []);

  return (
    <GameContext.Provider
      value={{
        playerBoard,
        aiBoard,
        currentTurn,
        timer,
        gameOver,
        winner,
        handlePlayerMove,
        resetGame,
        initGame,
        isPlacingShips,
        shipsToPlace,
        handleShipDrop,
        rotateShip,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

// Hook
export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameContext must be used within a GameProvider");
  }
  return context;
}
