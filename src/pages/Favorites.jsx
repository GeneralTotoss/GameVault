import { useFavorites } from "../context/FavoritesContext";
import GameCard from "../components/GameCard";

function Favorites() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      <h1>Mes favoris</h1>

{favorites.length === 0 ? (
  <p className="empty-message">Aucun favori pour le moment.</p>
) : (
        <div className="games-grid">
          {favorites.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              showRemoveButton={true}
              onRemove={removeFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;