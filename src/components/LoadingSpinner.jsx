import React from "react";
import { NavbarFavoritos } from "./Navbar";
import FooterSable from "./Footer";

export const LoadingSpinner = ({ favorites, onRemoveFavorite }) => (
  <div className="d-flex flex-column min-vh-100">
    <NavbarFavoritos favorites={favorites} onRemoveFavorite={onRemoveFavorite} />
    <div className="flex-grow-1 d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
      <div className="text-center">
        <div className="spinner-border mb-3" role="status" />
        <div>Cargando datos del universo Star Wars...</div>
      </div>
    </div>
    <FooterSable />
  </div>
);