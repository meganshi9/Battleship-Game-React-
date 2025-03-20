import { useState } from "react";
import styles from "./GamePage.module.css";

function EasyGame() {
  const BOARD_SIZE = 10;
  const [opponentBoard, setOpponentBoard] = useState(
    Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null))
  );

  const handleTileClick = (row, col) => {
    if (opponentBoard[row][col] !== null) return;
    const newBoard = opponentBoard.map((r) => [...r]);
    newBoard[row][col] = Math.random() > 0.5 ? "H" : "M"; 
    setOpponentBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Battleship - Free Play</h2>
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
      <button className={styles.resetButton} onClick={() => setOpponentBoard(Array(BOARD_SIZE).fill(null).map(() => Array(BOARD_SIZE).fill(null)))}>
        Reset
      </button>
    </div>
  );
}

export default EasyGame;