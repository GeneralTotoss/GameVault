export async function fetchPopularGames(
  genre = "",
  ordering = "",
  page = 1
) {
  const params = new URLSearchParams();

  if (genre) params.append("genre", genre);
  if (ordering) params.append("ordering", ordering);
  params.append("page", page);

  const url = `http://localhost:3001/api/games?${params.toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des jeux");
  }

  return await response.json();
}

export async function fetchGenres() {
  const response = await fetch("http://localhost:3001/api/genres");

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des genres");
  }

  const data = await response.json();
  return data.results;
}

export async function searchGames(query) {
  const response = await fetch(
    `http://localhost:3001/api/games/search?q=${encodeURIComponent(query)}`
  );

  if (!response.ok) {
    throw new Error("Erreur lors de la recherche");
  }

  const data = await response.json();
  return data.results;
}

export async function fetchGameDetails(id) {
  const response = await fetch(`http://localhost:3001/api/games/${id}`);

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des détails du jeu");
  }

  return await response.json();
}

export async function fetchGameScreenshots(id) {
  const response = await fetch(
    `http://localhost:3001/api/games/${id}/screenshots`
  );

  if (!response.ok) {
    throw new Error("Erreur lors du chargement des captures d'écran");
  }

  const data = await response.json();
  return data.results;
}