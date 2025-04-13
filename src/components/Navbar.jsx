import { Link } from 'react-router-dom';
import { parseFavUrl } from '../hooks/helpers/';
import SearchBar from './SearchBar';
import starwarsLogo from "../assets/img/starwars-logo.png";
import saber from "../assets/img/saber.svg";

export const NavbarFavoritos = ({ favorites, onRemoveFavorite }) => (
  <nav className="navbar navbar-dark bg-dark px-3 mb-4">
    <Link to="/" className="navbar-brand mb-0 h1">
      <img
        src={starwarsLogo}
        alt="Star Wars logo"
      />
    </Link>
    <SearchBar />
    <div className="dropdown ms-auto">
      <button className="sw-btn" data-bs-toggle="dropdown">
      <img src={saber} alt="" />
        Favoritos ({favorites.length})
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        {favorites.length === 0 && (
          <li><span className="dropdown-item-text text-muted">Sin favoritos</span></li>
        )}
        {favorites.map(fav => {
          const { type, uid } = parseFavUrl(fav.url);
          return (
            <li key={fav.url}>
              <div className="dropdown-item d-flex justify-content-between align-items-center">
                <Link
                  to={`/details/${type}/${uid}`}
                  className="text-decoration-none flex-grow-1"
                  style={{ color: 'inherit' }}
                >
                  {fav.name}
                </Link>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onRemoveFavorite(fav);
                  }}
                  className="btn btn-sm btn-danger ms-2"
                >
                  &times;
                </button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  </nav>
);
