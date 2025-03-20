import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';
import battleshipImage from '../assets/Battleship.jpg';

function HomePage() {
  return (
    <div className={styles.container}>
      <header className={styles.homeHeader}>
        <h2>Welcome to Battleship!</h2>
        <p>Choose a game mode to start playing.</p>
        <img src={battleshipImage} alt="Battleship Game" className={styles.heroImage} />
      </header>
      <footer className={styles.footer}>
        <p>&copy; 2025 Battleship Game</p>
      </footer>
    </div>
  );
}

export default HomePage;