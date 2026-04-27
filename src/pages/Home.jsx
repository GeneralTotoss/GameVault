import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-badge">Catalogue gaming interactif</p>
          <h1>Découvre, explore et sauvegarde tes jeux préférés</h1>
          <p className="hero-text">
            GameVault te permet de parcourir des centaines de jeux vidéo,
            consulter leurs détails, effectuer des recherches et créer ta
            propre liste de favoris.
          </p>

          <div className="hero-actions">
            <Link to="/games" className="hero-button primary">
              Explorer les jeux
            </Link>
            <Link to="/favorites" className="hero-button secondary">
              Voir mes favoris
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <h3>Fonctionnalités</h3>
          <ul>
            <li>Recherche dynamique de jeux</li>
            <li>Fiches détaillées par jeu</li>
            <li>Ajout et retrait des favoris</li>
            <li>Navigation simple et rapide</li>
          </ul>
        </div>
      </section>

      <section className="home-sections">
        <div className="info-card">
          <h2>Recherche rapide</h2>
          <p>
            Trouve un jeu par son nom et consulte ses informations principales
            en quelques secondes.
          </p>
        </div>

        <div className="info-card">
          <h2>Détails complets</h2>
          <p>
            Visualise la note, les genres, les plateformes, les développeurs et
            la description d’un jeu.
          </p>
        </div>

        <div className="info-card">
          <h2>Favoris persistants</h2>
          <p>
            Sauvegarde les jeux que tu aimes et retrouve-les même après avoir
            rechargé la page.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Home;