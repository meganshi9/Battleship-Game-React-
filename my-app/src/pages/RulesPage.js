import styles from './RulesPage.css';

function RulesPage() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Game Rules</h2>
      <p className={styles.text}>
        Battleship is a strategy game where you must locate and destroy your opponent's fleet before they sink yours.
      </p>
      <h3 className={styles.subtitle}>How to Play:</h3>
      <ul className={styles.list}>
        <li>Each player has a 10x10 grid where they place 5 ships of different sizes.</li>
        <li>Players take turns guessing coordinates to hit enemy ships.</li>
        <li>A hit is marked, and the player continues until they miss.</li>
        <li>The game ends when all ships of one player are destroyed.</li>
      </ul>
      <h3 className={styles.subtitle}>Winning the Game:</h3>
      <p className={styles.text}>The first player to sink all enemy ships wins!</p>
      <footer className={styles.footer}>&copy; 2025 Battleship Game</footer>
    </div>
  );
}

export default RulesPage;