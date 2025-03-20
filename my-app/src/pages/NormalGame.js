import { useState, useEffect } from "react";
import styles from "./GamePage.module.css";

function NormalGame() {
  const PLAYER_ROWS = 9;
  const BOARD_COLS = 10;
  const SHIP_SIZES = [5, 4, 3, 3, 2];
  const [playerBoard, setPlayerBoard] = useState([]);
  const [opponentBoard, setOpponentBoard] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(true);
  const [timer, setTimer] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    startNewGame();
  }, []);

  useEffect(() => {
    if (!playerTurn && !gameOver) {
      setTimeout(() => aiTurn(), 1000);
    }
  }, [playerTurn, gameOver]);

  useEffect(() => {
    if (!gameOver) {
      const interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameOver]);

  const startNewGame = () => {
    setPlayerBoard(generateBoard(false));
    setOpponentBoard(generateBoard(true)); 
    setGameOver(false);
    setMessage("");
    setPlayerTurn(true);
    setTimer(0);
  };

  const generateBoard = (hideShips) => {
    const board = Array(PLAYER_ROWS).fill(null).map(() => Array(BOARD_COLS).fill(null));
    SHIP_SIZES.forEach((size) => placeShip(board, size, hideShips));
    return board;
  };

  const placeShip = (board, size, hideShips) => {
    let placed = false;
    while (!placed) {
      const isHorizontal = Math.random() < 0.5;
      const row = Math.floor(Math.random() * (isHorizontal ? PLAYER_ROWS : PLAYER_ROWS - size + 1));
      const col = Math.floor(Math.random() * (isHorizontal ? BOARD_COLS - size + 1 : BOARD_COLS));
      
      let fits = true;
      for (let i = 0; i < size; i++) {
        if (board[row + (isHorizontal ? 0 : i)][col + (isHorizontal ? i : 0)] !== null) {
          fits = false;
          break;
        }
      }
      
      if (fits) {
        for (let i = 0; i < size; i++) {
          board[row + (isHorizontal ? 0 : i)][col + (isHorizontal ? i : 0)] = "S";
        }
        placed = true;
      }
    }
  };

  const handleTileClick = (row, col) => {
    if (!playerTurn || opponentBoard[row][col] === "X" || opponentBoard[row][col] === "O" || gameOver) return;
    
    const newBoard = opponentBoard.map((r) => [...r]);
    newBoard[row][col] = opponentBoard[row][col] === "S" ? "H" : "M"; 
    setOpponentBoard(newBoard);
    checkForWin(newBoard, "Player");

    setPlayerTurn(false);
  };

  const aiTurn = () => {
    if (gameOver) return;

    let row, col;
    do {
      row = Math.floor(Math.random() * PLAYER_ROWS);
      col = Math.floor(Math.random() * BOARD_COLS);
    } while (playerBoard[row][col] === "H" || playerBoard[row][col] === "M");

    const newBoard = playerBoard.map((r) => [...r]);
    newBoard[row][col] = playerBoard[row][col] === "S" ? "H" : "M";
    setPlayerBoard(newBoard);
    checkForWin(newBoard, "AI");
    setPlayerTurn(true);
  };

  const checkForWin = (board, player) => {
    const allShipsSunk = !board.some(row => row.includes("S"));
    if (allShipsSunk) {
      setGameOver(true);
      setMessage(`Game over! ${player} Won!`);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{message || "Battleship - Normal Mode"}</h2>
      <p className={styles.timer}>Time: {timer}s</p>
      <div className={styles.boards}>
        <div>
          <h3>Your Board</h3>
          <div className={styles.board}>
            {playerBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div key={`${rowIndex}-${colIndex}`} className={`${styles.tile} ${cell === "H" ? styles.hit : cell === "M" ? styles.miss : ""}`}>
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <h3>Opponent's Board</h3>
          <div className={styles.board}>
            {opponentBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.tile} ${cell === "H" ? styles.hit : cell === "M" ? styles.miss : ""}`}
                  onClick={() => handleTileClick(rowIndex, colIndex)}
                >
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button className={styles.resetButton} onClick={startNewGame}>
        Reset
      </button>
    </div>
  );
}

export default NormalGame;
