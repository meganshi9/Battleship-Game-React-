import styles from './HighScoresPage.css';

function HighScoresPage() {
  const scores = [
    { rank: 1, name: 'Player1', wins: 15, losses: 5 },
    { rank: 2, name: 'Player2', wins: 12, losses: 8 },
    { rank: 3, name: 'Player3', wins: 10, losses: 10 },
    { rank: 4, name: 'Player4', wins: 8, losses: 12 },
    { rank: 5, name: 'Player5', wins: 6, losses: 14 },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>High Scores</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Games Won</th>
            <th>Games Lost</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score) => (
            <tr key={score.rank}>
              <td>{score.rank}</td>
              <td>{score.name}</td>
              <td>{score.wins}</td>
              <td>{score.losses}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className={styles.footer}>&copy; 2025 Battleship Game</footer>
    </div>
  );
}

export default HighScoresPage;