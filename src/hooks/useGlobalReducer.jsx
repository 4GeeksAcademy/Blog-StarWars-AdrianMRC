// useGlobalReducer.jsx

import { useContext, useReducer, createContext } from "react";
import { storeReducer, initialStore } from "../store"; // Importa desde tu store.js

// Contexto global que ayudará a proveer y consumir el store
const StoreContext = createContext();

/**
 * Provider global de la store (wrapppea tu App).
 * Usado en: main.jsx o App.jsx
 */
export function StoreProvider({ children }) {
  // Inicializa el reducer con el estado inicial
  const [store, dispatch] = useReducer(storeReducer, initialStore);

  return (
    <StoreContext.Provider value={{ store, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

/**
 * Hook para acceder rápido al store global y dispatch.
 * Usado en: Home.jsx, Details.jsx, NavbarFavoritos.jsx, etc.
 */
export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useGlobalReducer must be used within a StoreProvider");
  }
  return context; // { store, dispatch }
}
