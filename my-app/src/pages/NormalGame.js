// NormalGame.js（改写后的示例）
import React from "react";
import { useGameContext } from "../context/GameContext";
import styles from "./GamePage.module.css";

function NormalGame() {
  const {
    playerBoard,
    aiBoard,
    currentTurn,
    timer,
    gameOver,
    winner,
    handlePlayerMove,
    resetGame,
  } = useGameContext();

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        {gameOver
          ? `Game Over! ${winner} Won!`
          : `Current Turn: ${currentTurn}`}
      </h2>
      <p className={styles.timer}>Time: {timer}s</p>
      <div className={styles.boards}>
        <div>
          <h3>Your Board</h3>
          <div className={styles.board}>
            {playerBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.tile} ${
                    cell === "H" ? styles.hit : cell === "M" ? styles.miss : ""
                  }`}
                >
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <h3>Opponent's Board</h3>
          <div className={styles.board}>
            {aiBoard.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`${styles.tile} ${
                    cell === "H" ? styles.hit : cell === "M" ? styles.miss : ""
                  }`}
                  onClick={() => handlePlayerMove(rowIndex, colIndex)}
                >
                  {cell === "H" ? "💥" : cell === "M" ? "⚪" : ""}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <button className={styles.resetButton} onClick={resetGame}>
        Reset
      </button>
    </div>
  );
}

export default NormalGame;
