import { Link } from "react-router-dom";

function GameCard({ game, showRemoveButton = false, onRemove }) {
  return (
    <div className="game-card">
      <Link to={`/games/${game.id}`} className="game-card-link">
        <img src={game.background_image} alt={game.name} />
        <h3>{game.name}</h3>
        <p>
          Metacritic : {game.metacritic ?? "N/A"}
        </p>
        {game.released && <p>Date de sortie : {game.released}</p>}
      </Link>

      {showRemoveButton && (
        <button onClick={() => onRemove(game.id)}>Retirer</button>
      )}
    </div>
  );
}

export default GameCard;