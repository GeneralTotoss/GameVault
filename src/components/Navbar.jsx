import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        TotoGames
      </Link>

      <div className="nav-links">
        <NavLink to="/">Accueil</NavLink>
        <NavLink to="/games">Jeux</NavLink>
        <NavLink to="/favorites">Favoris</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;