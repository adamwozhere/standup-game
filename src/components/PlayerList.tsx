type Props = {
  players: string[];
  currentPlayerName: string | null;
};

export function PlayerList({ players, currentPlayerName }: Props) {
  return (
    <div className="player-list">
      <ul>
        {players.map((player) => (
          <li key={player} data-status={player === currentPlayerName ? 'current' : undefined}>
            {player}
          </li>
        ))}
      </ul>
    </div>
  );
}
