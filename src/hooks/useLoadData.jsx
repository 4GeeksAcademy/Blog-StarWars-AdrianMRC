import { useEffect, useState } from "react";
import { fetchAllExpanded } from "./useAllCategoryItems";
import { ACTIONS } from "../store";

export const useLoadData = (store, dispatch) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        setLoading(true);
        const categories = [
          { key: "people", swapi: "people", action: ACTIONS.SET_PEOPLE },
          { key: "planets", swapi: "planets", action: ACTIONS.SET_PLANETS },
          { key: "vehicles", swapi: "vehicles", action: ACTIONS.SET_VEHICLES },
        ];

        for (const cat of categories) {
          if (!store[cat.key]?.length) {
            const localData = localStorage.getItem(cat.key);
            if (localData) {
              dispatch({ type: cat.action, payload: JSON.parse(localData) });
            } else {
              const data = await fetchAllExpanded(cat.swapi);
              dispatch({ type: cat.action, payload: data });
              localStorage.setItem(cat.key, JSON.stringify(data));
            }
          }
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        alert("Hubo un problema al cargar los datos. Intenta nuevamente más tarde.");
      } finally {
        setLoading(false);
      }
    };

    loadAllData();
  }, [store, dispatch]);

  return loading;
};