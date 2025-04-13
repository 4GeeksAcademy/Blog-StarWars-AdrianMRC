import { Outlet } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useLoadData } from "../hooks/useLoadData";
import { NavbarFavoritos } from "../components/Navbar";
import FooterSable from "../components/Footer";
import StarBackground from "../components/StarBackground";
import { LoadingSpinner } from "../components/LoadingSpinner";

export const Layout = () => {
  const { store, dispatch } = useGlobalReducer();

  const loading = useLoadData(store, dispatch);

  const handleRemoveFavorite = (fav) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: fav });
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
        <Outlet />
      </div>
      <StarBackground />
      <FooterSable />
    </div>
  );
};