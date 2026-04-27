import { useEffect, useState } from "react";
import { fetchPopularGames, fetchGenres, searchGames } from "../services/rawgApi";
import GameCard from "../components/GameCard";

function Games() {
  const [games, setGames] = useState([]);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [formError, setFormError] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedOrdering, setSelectedOrdering] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadInitialData() {
      try {
        setError("");
        setLoading(true);

        const [gamesResponse, genresData] = await Promise.all([
          fetchPopularGames("", "", 1),
          fetchGenres(),
        ]);

        setGames(gamesResponse.results);
        setGenres(genresData);
        setHasMore(!!gamesResponse.next);
        setPage(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  useEffect(() => {
    async function loadFilteredGames() {
      if (searchTerm.trim()) return;

      try {
        setError("");
        setLoading(true);

        const response = await fetchPopularGames(
          selectedGenre,
          selectedOrdering,
          1
        );

        setGames(response.results);
        setHasMore(!!response.next);
        setPage(1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadFilteredGames();
  }, [selectedGenre, selectedOrdering]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError("");

    if (!searchTerm.trim()) {
      setFormError("Veuillez entrer un nom de jeu.");
      return;
    }

    try {
      setLoading(true);
      const results = await searchGames(searchTerm);
      setGames(results);
      setHasMore(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async () => {
    setSearchTerm("");
    setFormError("");
    setError("");
    setSelectedGenre("");
    setSelectedOrdering("");

    try {
      setLoading(true);
      const response = await fetchPopularGames("", "", 1);
      setGames(response.results);
      setHasMore(!!response.next);
      setPage(1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = page + 1;

      const response = await fetchPopularGames(
        selectedGenre,
        selectedOrdering,
        nextPage
      );

      setGames((prev) => [...prev, ...response.results]);
      setHasMore(!!response.next);
      setPage(nextPage);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div>
      <h1>Catalogue de jeux</h1>
      <p className="section-title">
        Découvre les jeux populaires et recherche tes favoris.
      </p>

      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          placeholder="Rechercher un jeu..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Rechercher</button>
        <button type="button" onClick={handleReset}>
          Réinitialiser
        </button>
      </form>

      <div className="filters-bar">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">Tous les genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.slug}>
              {genre.name}
            </option>
          ))}
        </select>

        <select
          value={selectedOrdering}
          onChange={(e) => setSelectedOrdering(e.target.value)}
        >
          <option value="">Tri par défaut</option>
          <option value="-metacritic">Metacritic élevé</option>
          <option value="metacritic">Metacritic faible</option>
          <option value="-released">Plus récents</option>
          <option value="released">Plus anciens</option>
          <option value="name">Nom A-Z</option>
          <option value="-name">Nom Z-A</option>
        </select>
      </div>

      {formError && <p className="form-error">{formError}</p>}
      {loading && <p>Chargement des jeux...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <>
          <div className="games-grid">
            {games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>

          {hasMore && !searchTerm.trim() && (
            <div className="load-more-container">
              <button onClick={handleLoadMore} disabled={loadingMore}>
                {loadingMore ? "Chargement..." : "Charger plus"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Games;