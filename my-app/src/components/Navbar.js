import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className={styles.navbar}>
      <h1 className={styles.title}>Battleship</h1>
      <ul className={styles.navLinks}>
        <li><Link to="/" className={location.pathname === '/' ? styles.active : ''}>Home</Link></li>
        <li><Link to="/game/normal" className={location.pathname === '/game/normal' ? styles.active : ''}>Play Normal</Link></li>
        <li><Link to="/game/easy" className={location.pathname === '/game/easy' ? styles.active : ''}>Free Play</Link></li>
        <li><Link to="/rules" className={location.pathname === '/rules' ? styles.active : ''}>Rules</Link></li>
        <li><Link to="/highscores" className={location.pathname === '/highscores' ? styles.active : ''}>High Scores</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;