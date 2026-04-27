import { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchGameDetails, fetchGameScreenshots } from "../services/rawgApi";
import { useFavorites } from "../context/FavoritesContext";

function GameDetails() {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const [game, setGame] = useState(null);
  const [screenshots, setScreenshots] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isImageOpen, setIsImageOpen] = useState(false);

  const thumbsRef = useRef(null);

const handleThumbsWheel = (e) => {
  if (!thumbsRef.current) return;

  if (e.deltaY !== 0) {
    e.preventDefault();
    e.stopPropagation();
    thumbsRef.current.scrollLeft += e.deltaY;
  }
};

  useEffect(() => {
    async function loadGame() {
      try {
        setError("");
        setLoading(true);

        const [gameData, screenshotsData] = await Promise.all([
          fetchGameDetails(id),
          fetchGameScreenshots(id),
        ]);

        setGame(gameData);
        setScreenshots(screenshotsData);
        setSelectedImage(
          screenshotsData[0]?.image || gameData.background_image || null
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadGame();
  }, [id]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setIsImageOpen(false);
      }
    }

    if (isImageOpen) {
      window.addEventListener("keydown", onKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isImageOpen]);

  if (loading) {
    return <p>Chargement des détails du jeu...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!game) {
    return <p>Jeu introuvable.</p>;
  }

  const isFavorite = favorites.some((item) => item.id === game.id);

  return (
    <div className="game-details">
      <Link to="/games" className="back-link">
        ← Retour au catalogue
      </Link>

      <img
        src={game.background_image}
        alt={game.name}
        className="game-details-image"
      />

      <h1>{game.name}</h1>

      <button
        onClick={() =>
          isFavorite ? removeFavorite(game.id) : addFavorite(game)
        }
      >
        {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      </button>

      <p>
        <strong>Metacritic :</strong> {game.metacritic ?? "N/A"}
      </p>

      <p>
        <strong>Date de sortie :</strong> {game.released || "Inconnue"}
      </p>

      <p>
        <strong>Plateformes :</strong>{" "}
        {game.platforms?.map((p) => p.platform.name).join(", ") || "Inconnues"}
      </p>

      <p>
        <strong>Genres :</strong>{" "}
        {game.genres?.map((g) => g.name).join(", ") || "Inconnus"}
      </p>

      <p>
        <strong>Développeurs :</strong>{" "}
        {game.developers?.map((d) => d.name).join(", ") || "Inconnus"}
      </p>

      <p>
        <strong>Éditeurs :</strong>{" "}
        {game.publishers?.map((p) => p.name).join(", ") || "Inconnus"}
      </p>

      <p>
        <strong>Description :</strong>
      </p>
      <p>{game.description_raw || "Aucune description disponible."}</p>

      {screenshots.length > 0 && (
        <section className="gallery-section">
          <h2>Galerie</h2>

          <div className="gallery-main">
            <img
              src={selectedImage}
              alt={`Capture principale de ${game.name}`}
              className="gallery-main-image"
              onClick={() => setIsImageOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setIsImageOpen(true);
                }
              }}
            />
          </div>

          <div
            className="gallery-thumbs"
            ref={thumbsRef}
            onWheel={handleThumbsWheel}
            
          >
            {screenshots.slice(0, 8).map((shot) => (
              <button
                key={shot.id}
                type="button"
                className={`gallery-thumb ${
                  selectedImage === shot.image ? "active" : ""
                }`}
                onClick={() => setSelectedImage(shot.image)}
                aria-label={`Afficher la capture ${shot.id}`}
              >
                <img src={shot.image} alt={`Capture de ${game.name}`} />
              </button>
            ))}
          </div>
        </section>
      )}

      {isImageOpen && (
        <div
          className="image-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Image agrandie"
          onClick={() => setIsImageOpen(false)}
        >
          <button
            type="button"
            className="image-modal-close"
            aria-label="Fermer l'image"
            onClick={() => setIsImageOpen(false)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt={`Image agrandie de ${game.name}`}
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default GameDetails;