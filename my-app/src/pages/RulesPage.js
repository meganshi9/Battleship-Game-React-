import styles from './RulesPage.module.css';
import rulesImage from '../assets/battleship_game.png';

function RulesPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>How to Play Battleships</h2>
      <p className={styles.text}>This game of guessing, strategy, and logical thought dates back to before World War I. Known worldwide, it can be played with just a pencil and two pieces of paper. It's a two-player game, popularized by board game manufacturers and even adapted into a Hollywood film.</p>
      
      <h3 className={styles.subtitle}>Start/Preparation</h3>
      <p className={styles.text}>Each player secretly places 5 ships of varying sizes (2 to 5 squares) on a 10x10 grid. Players also have a second blank grid to track their guesses. Ships include an aircraft carrier (5 squares), battleship (4 squares), submarine (3 squares), destroyer (3 squares), and patrol boat (2 squares).</p>
      
      <h3 className={styles.subtitle}>In Play</h3>
      <p className={styles.text}>Players take turns guessing coordinates (e.g., C3). A "hit" is called if part of a ship is hit, and both players mark their respective grids. Players continue guessing until they miss, after which the turn switches.</p>
      <img src={rulesImage} alt="Battleship In Play Example" className={styles.rulesImage} />
      
      <h3 className={styles.subtitle}>Victory</h3>
      <p className={styles.text}>The first player to locate and sink all their opponent's ships wins.</p>
      
      <h3 className={styles.subtitle}>Variations</h3>
      <p className={styles.text}>Many rule variations exist. In the "Salvo" version, players get as many guesses as they have ships remaining. As ships are sunk, the number of guesses per turn decreases.</p>
      
      <h3 className={styles.subtitle}>Credits</h3>
      <p className={styles.text}>Made by: <a href="mailto:aliceyu@yahoo.com">aliceyu@yahoo.com</a></p>
      <p className={styles.text}>GitHub: <a href="https://github.com/example" target="_blank">github.com/aliceyu</a></p>
      <p className={styles.text}>LinkedIn: <a href="https://linkedin.com/in/example" target="_blank">linkedin.com/in/aliceyu</a></p>
      
      <footer className={styles.footer}>
        <p>&copy; 2025 Battleship Game</p>
      </footer>
    </div>
  );
}

export default RulesPage;