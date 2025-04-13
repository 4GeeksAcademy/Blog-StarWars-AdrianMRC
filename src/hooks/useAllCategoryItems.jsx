import useGlobalReducer from './useGlobalReducer';

/**
 * Fetcher universal para obtener TODO el contenido expandido de una categoría de SWAPI.
 * Usado en: Layout.jsx al iniciar la app.
 * Esta función NO es un hook.
 */
export async function fetchAllExpanded(category) {
  if (!category) {
    throw new Error("La categoría es requerida para fetchAllExpanded.");
  }

  let page = 1;
  const pageSize = 100;
  let all = [];
  let keepPaging = true;
  const maxPages = 50; // Límite máximo de páginas para evitar bucles infinitos

  try {
    while (keepPaging && page <= maxPages) {
      const res = await fetch(`https://www.swapi.tech/api/${category}?page=${page}&limit=${pageSize}&expanded=true`);
      
      if (!res.ok) {
        throw new Error(`Error al obtener datos de la categoría ${category}: ${res.statusText}`);
      }

      const data = await res.json();

      all = all.concat(data.results);

      if (data.results.length < pageSize) {
        keepPaging = false;
      } else {
        page++;
      }
    }
  } catch (error) {
    console.error("Error en fetchAllExpanded:", error);
    throw error; // Re-lanza el error para que el llamador lo maneje
  }

  return all;
}

/**
 * Hook React para acceder a la lista de items de la categoría global, y su estado de carga.
 * Usado en: Home.jsx, Details.jsx, cualquier lista de entidades del store.
 */
export function useAllCategoryItems(category) {
  if (!category) {
    throw new Error("La categoría es requerida para useAllCategoryItems.");
  }

  const { store } = useGlobalReducer();
  const items = store[category] || [];
  const loading = items.length === 0; // Considera agregar un estado explícito de carga en el store

  return { items, loading };
}