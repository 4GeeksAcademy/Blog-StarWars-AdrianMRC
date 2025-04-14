import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useLoadData } from "../hooks/useLoadData";
import { NavbarFavoritos } from "../components/Navbar";
import FooterSable from "../components/Footer";
import StarBackground from "../components/StarBackground";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Layout = () => {
  const { store, dispatch } = useGlobalReducer();
  const loading = useLoadData(store, dispatch);

  const location = useLocation();
  const [trigger, setTrigger] = useState(0);

  useEffect(() => {
    setTrigger((prev) => prev + 1);
  }, [location]);

  const handleRemoveFavorite = (fav) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: fav });
  };

  const handleTrigger = () => {
    setTrigger((prev) => prev + 1); // Incrementa el trigger manualmente
  };

  if (loading) {
    return (
      <LoadingSpinner
        favorites={store.favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <NavbarFavoritos
        favorites={store.favorites}
        onRemoveFavorite={handleRemoveFavorite}
      />
      <div className="flex-grow-1">
        <Outlet context={{ onTrigger: handleTrigger }} />
      </div>
      <StarBackground minStars={1500} maxStars={4000} trigger={trigger} />
      <FooterSable />
    </div>
  );
};