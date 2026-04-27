const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("VITE_API_BASE_URL est manquante.");
}

async function fetchFromApi(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`);

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status}`);
  }

  return await response.json();
}

export async function fetchPopularGames(genre = "", ordering = "", page = 1) {
  const params = new URLSearchParams();

  if (genre) params.append("genre", genre);
  if (ordering) params.append("ordering", ordering);
  params.append("page", page);

  return await fetchFromApi(`/api/games?${params.toString()}`);
}

export async function fetchGenres() {
  const data = await fetchFromApi("/api/genres");
  return data.results;
}

export async function searchGames(query) {
  const data = await fetchFromApi(
    `/api/games/search?q=${encodeURIComponent(query)}`
  );
  return data.results;
}

export async function fetchGameDetails(id) {
  return await fetchFromApi(`/api/games/${id}`);
}

export async function fetchGameScreenshots(id) {
  const data = await fetchFromApi(`/api/games/${id}/screenshots`);
  return data.results;
}