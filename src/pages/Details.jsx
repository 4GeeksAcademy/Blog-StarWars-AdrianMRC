import { useParams, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { getImageUrl, getApiUrl, getDetailsURL } from '../hooks/helpers';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DetailImage from '../components/DetailImage';

/**
 * Muestra el detalle de un ítem (persona, planeta o vehículo) de SW.
 */
const Details = () => {
    const { type, uid } = useParams();
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();

    // Mapear la URL a la key del store (characters -> people)
    const storeCategory = type === 'characters' ? 'people' : type;
    const items = store[storeCategory] || [];

    // Buscar el ítem por uid
    const idx = items.findIndex(it => it.uid === uid);
    const item = items[idx];

    if (!item) {
        return <div className="container mt-5 text-center"><h2>No se encontró el ítem solicitado.</h2></div>;
    }

    const next = idx < items.length - 1 ? items[idx + 1] : null;
    const prev = idx > 0 ? items[idx - 1] : null;


    // Usa helpers para URL de imagen y de favorito
    const imageUrl = getImageUrl(type, uid);
    const apiUrl = getApiUrl(storeCategory, uid);

    const itemData = {
        url: apiUrl,
        name: item.properties?.name ?? item.name,
        uid
    };

    const isFavorite = store.favorites.some(f => f.url === apiUrl);

    const handleToggleFavorite = () => {
        dispatch({ type: 'TOGGLE_FAVORITE', payload: itemData });
    };

    return (
        <div className="container-center">
            <div className="detail-box">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    {prev ? (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(getDetailsURL(type, prev.uid))}
                            title="Anterior"
                        >
                            <FaArrowLeft /> {prev.properties?.name || prev.name}
                        </button>
                    ) : <span />}
                    {next ? (
                        <button
                            className="btn btn-outline-secondary"
                            onClick={() => navigate(getDetailsURL(type, next.uid))}
                            title="Siguiente"
                        >
                            {next.properties?.name || next.name} <FaArrowRight />
                        </button>
                    ) : <span />}
                </div>
                <h1>{item.properties?.name ?? item.name}</h1>
                <DetailImage src={imageUrl} alt={item.properties?.name ?? item.name} uid={uid} />
                <div className="mb-3 d-flex justify-content-center gap-2">
                    <button
                        className={`btn ${isFavorite ? 'btn-danger' : 'btn-outline-warning'}`}
                        onClick={handleToggleFavorite}
                    >
                        {isFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos'}
                    </button>
                    <button onClick={() => navigate("/")} className="btn btn-secondary">
                        &larr; Volver a Home
                    </button>
                </div>
                <ul className="list-unstyled text-start mx-auto" style={{ maxWidth: 500 }}>
                    {Object.entries(item.properties).map(([key, value]) => (
                        <li key={key}><strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Details;
