import { Link } from 'react-router-dom';
import styles from './HomePage.css';
import battleshipImage from '../assets/Battleship.jpg'; 

function HomePage() {
  return (
    <div className={styles.container}>
      <img src={battleshipImage} alt="Battleship Logo" className={styles.image} />
      <h1 className={styles.title}>Battleship</h1>
      <p className={styles.description}>Find and destroy your opponent's fleet before they destroy yours!</p>
      <div className={styles.buttonContainer}>
        <Link to="/game/normal" className={styles.button}>Play Normal</Link>
        <Link to="/game/easy" className={styles.button}>Free Play</Link>
        <Link to="/rules" className={styles.button}>Game Rules</Link>
        <Link to="/highscores" className={styles.button}>High Scores</Link>
      </div>
      <footer className={styles.footer}>&copy; 2025 Battleship Game</footer>
    </div>
  );
}

export default HomePage;

