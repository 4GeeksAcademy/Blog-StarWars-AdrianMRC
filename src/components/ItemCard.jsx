import { Link } from 'react-router-dom';

function ItemCard({ name, imageUrl, detailsUrl, isFavorite, onToggleFavorite, placeholderImg }) {
  return (
    <div className="card h-100">
      {/* Enlace al detalle del elemento */}
      <Link to={detailsUrl} className="item-card-link">
        <img
          src={imageUrl}
          className="card-img-top"
          alt={name}
          onError={e => (e.target.src = placeholderImg)}
        />
        <div className="card-body text-center">
          <h5 className="card-title">{name}</h5>
        </div>
      </Link>
      <div className="text-center mb-2">
        <button
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-warning'}`}
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? 'Quitar' : 'Favorito'}
        </button>
      </div>
    </div>
  );
}

ItemCard.defaultProps = {
  placeholderImg: 'https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/placeholder.jpg'
}

export default ItemCard;