import React, { useState } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { useAllCategoryItems } from '../hooks/useAllCategoryItems';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { ACTIONS } from '../store';
import ItemCard from '../components/ItemCard';
import { getApiUrl, getDetailsURL, getImageUrl } from '../hooks/helpers'; // Ajusta la ruta según tu estructura

const TABS = [
  { key: 'people', label: 'Personajes' },
  { key: 'planets', label: 'Planetas' },
  { key: 'vehicles', label: 'Vehículos' }
];

const itemsPerPage = 9;

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [activeTab, setActiveTab] = useState('people');
  const [currentPage, setCurrentPage] = useState(1);

  const { items, loading } = useAllCategoryItems(activeTab);

  const pageCount = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Abstracción de favorito para SOLID y DRY
  const handleFav = (item) => {
    const favItem = {
      uid: item.uid,
      name: item.properties?.name ?? item.name,
      url: getApiUrl(activeTab, item.uid)
    };
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: favItem });
  };

  // Reset page cuando cambias tab
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" role="status" />
      </Container>
    );
  }

  return (
    <Container>
      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {TABS.map(({ key, label }) => (
          <li key={key} className="nav-item">
            <button
              className={`nav-link ${activeTab === key ? 'active' : ''}`}
              onClick={() => handleTabChange(key)}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>

      {/* Cards */}
      <div className="row">
        {currentItems.map(item => {
          const apiUrl = getApiUrl(activeTab, item.uid);
          const isFavorite = store.favorites.some(f => f.url === apiUrl);

          return (
            <div className="col-md-4 mb-4" key={item.uid}>
              <ItemCard
                name={item.properties?.name ?? item.name}
                imageUrl={getImageUrl(activeTab, item.uid)}
                detailsUrl={getDetailsURL(activeTab, item.uid)}
                isFavorite={isFavorite}
                onToggleFavorite={() => handleFav(item)}
              />
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {pageCount > 1 && (
        <nav>
          <ul className="pagination justify-content-center">
            {Array.from({ length: pageCount }, (_, idx) => (
              <li
                key={idx}
                className={`page-item ${currentPage === idx + 1 ? 'active' : ''}`}
              >
                <button
                  onClick={() => setCurrentPage(idx + 1)}
                  className="page-link"
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </Container>
  );
};

export default Home;
