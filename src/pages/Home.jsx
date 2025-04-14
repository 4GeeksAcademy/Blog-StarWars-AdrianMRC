import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';
import { getImageUrl, getDetailsURL, getApiUrl } from '../hooks/helpers';
import ItemCard from '../components/ItemCard';

const TABS = [
  { key: 'people', label: 'Personajes' },
  { key: 'planets', label: 'Planetas' },
  { key: 'vehicles', label: 'Vehículos' },
];

const itemsPerPage = 9;

const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const { onTrigger } = useOutletContext(); 
  const [activeTab, setActiveTab] = useState('people');
  const [currentPage, setCurrentPage] = useState(1);

  const items = store[activeTab] || [];
  const pageCount = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); 
    onTrigger(); // Notifica al Layout que debe actualizar el trigger
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    onTrigger(); 
  };

  const handleFav = (item) => {
    const favItem = {
      uid: item.uid,
      name: item.properties?.name ?? item.name,
      url: getApiUrl(activeTab, item.uid),
    };
    dispatch({ type: 'TOGGLE_FAVORITE', payload: favItem });
  };

  return (
    <div>
      {/* Tabs */}
      <ul className="nav nav-tabs mb-3">
        {TABS.map(({ key, label }) => (
          <li key={key} className="nav-item">
            <button
              className={`nav-link ${activeTab === key ? 'active' : ''}`}
              onClick={() => handleTabChange(key)}
            >
              {label} ({store.favorites.filter((f) => f.url.includes(key)).length})
            </button>
          </li>
        ))}
      </ul>

      {/* Items */}
      <div className="row justify-content-center g-3 mx-0">
        {currentItems.map((item) => {
          const isFavorite = store.favorites.some(
            (f) => f.url === getApiUrl(activeTab, item.uid)
          );

          return (
            <div className="col-md-4 d-flex justify-content-center mb-3" key={item.uid}>
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
                  onClick={() => handlePageChange(idx + 1)}
                  className="page-link"
                >
                  {idx + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
};

export default Home;