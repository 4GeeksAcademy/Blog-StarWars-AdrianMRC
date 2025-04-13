import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchAllExpanded } from '../hooks/useAllCategoryItems';
import { ACTIONS } from "../store";
import { NavbarFavoritos } from "../components/Navbar"; // o tu ruta
import  FooterSable  from "../components/Footer";
import StarBackground from "../components/StarBackground";


export const Layout = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState(true);

  // <-- AÑADE ESTA FUNCIÓN
  const handleRemoveFavorite = (fav) => {
    dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: fav });
  };

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(store.favorites));
  }, [store.favorites]);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      const categories = [
        { key: "people", swapi: "people", action: ACTIONS.SET_PEOPLE },
        { key: "planets", swapi: "planets", action: ACTIONS.SET_PLANETS },
        { key: "vehicles", swapi: "vehicles", action: ACTIONS.SET_VEHICLES },
      ];

      for (const cat of categories) {
        if (!store[cat.key] || store[cat.key].length === 0) {
          let localData = localStorage.getItem(cat.key);
          if (localData) {
            dispatch({ type: cat.action, payload: JSON.parse(localData) });
          } else {
            const data = await fetchAllExpanded(cat.swapi);
            dispatch({ type: cat.action, payload: data });
            localStorage.setItem(cat.key, JSON.stringify(data));
          }
        }
      }
      setLoading(false);
    };

    loadAllData();
  }, [dispatch, store.people, store.planets, store.vehicles]);

  if (
    loading ||
    !store.people || store.people.length === 0 ||
    !store.planets || store.planets.length === 0 ||
    !store.vehicles || store.vehicles.length === 0
  ) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <NavbarFavoritos
          favorites={store.favorites}
          onRemoveFavorite={handleRemoveFavorite}
        />
        <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
          <div className="text-center">
            <div className="spinner-border mb-3" role="status" />
            <div>Cargando datos del universo Star Wars...</div>
          </div>
        </div>
        <FooterSable />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarFavoritos
        favorites={store.favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <div className="flex-grow-1">
        <Outlet />
      </div>
      <StarBackground />
      <FooterSable />
    </div>
  );
};
