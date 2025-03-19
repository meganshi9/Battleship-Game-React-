import { useState, useEffect } from 'react';
import styles from './GamePage.css';

const SHIP_SIZES = [5, 4, 3, 3, 2];

function GamePage({ mode }) {
  const [board, setBoard] = useState(
    Array(10).fill(null).map(() => Array(10).fill(null))
  );

  useEffect(() => {
    placeShips();
  }, []);

  const placeShips = () => {
    const newBoard = [...board.map(row => [...row])];
    SHIP_SIZES.forEach(size => {
      let placed = false;
      while (!placed) {
        const isHorizontal = Math.random() < 0.5;
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);

        if (canPlaceShip(newBoard, row, col, size, isHorizontal)) {
          for (let i = 0; i < size; i++) {
            if (isHorizontal) newBoard[row][col + i] = 'S';
            else newBoard[row + i][col] = 'S';
          }
          placed = true;
        }
      }
    });
    setBoard(newBoard);
  };

  const canPlaceShip = (board, row, col, size, isHorizontal) => {
    for (let i = 0; i < size; i++) {
      if (isHorizontal) {
        if (col + i >= 10 || board[row][col + i] !== null) return false;
      } else {
        if (row + i >= 10 || board[row + i][col] !== null) return false;
      }
    }
    return true;
  };

  const handleTileClick = (row, col) => {
    if (board[row][col] !== null && board[row][col] !== 'S') return;
    const newBoard = [...board.map(row => [...row])];
    newBoard[row][col] = board[row][col] === 'S' ? 'H' : 'X';
    setBoard(newBoard);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Battleship - {mode === 'normal' ? 'Normal Mode' : 'Free Play'}</h2>
      <div className={styles.board}>
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${styles.tile} ${
                cell === 'H' ? styles.hit : cell === 'X' ? styles.miss : ''
              }`}
              onClick={() => handleTileClick(rowIndex, colIndex)}
            >
              {cell === 'H' ? '✔' : cell === 'X' ? '✖' : ''}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default GamePage;
