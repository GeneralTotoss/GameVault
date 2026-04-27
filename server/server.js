import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config({ path: "./server/.env" });

const app = express();
const PORT = 3001;
const BASE_URL = "https://api.rawg.io/api";

app.use(cors());

app.get("/api/games", async (req, res) => {
  try {
    const { genre, ordering, page = 1 } = req.query;
    const today = new Date().toISOString().split("T")[0];

    let url = `${BASE_URL}/games?key=${process.env.RAWG_API_KEY}&page_size=20&page=${page}&dates=2000-01-01,${today}`;

    if (genre) {
      url += `&genres=${encodeURIComponent(genre)}`;
    }

    if (ordering) {
      url += `&ordering=${encodeURIComponent(ordering)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur lors du chargement des jeux",
      });
    }

    const data = await response.json();

    data.results = data.results.filter((game) => {
      const hasValidDate = !game.released || game.released <= today;
      const hasImage = game.background_image;
      return hasValidDate && hasImage;
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur",
    });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    const response = await fetch(
      `${BASE_URL}/genres?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur lors du chargement des genres",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur lors du chargement des genres",
    });
  }
});

app.get("/api/games/search", async (req, res) => {
  try {
    const search = req.query.q;
    const today = new Date().toISOString().split("T")[0];

    if (!search || !search.trim()) {
      return res.status(400).json({
        error: "Le terme de recherche est requis",
      });
    }

    const response = await fetch(
      `${BASE_URL}/games?key=${process.env.RAWG_API_KEY}&search=${encodeURIComponent(
        search
      )}&page_size=20&dates=2000-01-01,${today}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur lors de la recherche",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur lors de la recherche",
    });
  }
});

app.get("/api/games/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `${BASE_URL}/games/${id}?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur lors du chargement des détails du jeu",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur lors du chargement des détails du jeu",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});

app.get("/api/games/:id/screenshots", async (req, res) => {
  try {
    const { id } = req.params;

    const response = await fetch(
      `${BASE_URL}/games/${id}/screenshots?key=${process.env.RAWG_API_KEY}`
    );

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Erreur lors du chargement des captures d'écran",
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Erreur serveur lors du chargement des captures d'écran",
    });
  }
});