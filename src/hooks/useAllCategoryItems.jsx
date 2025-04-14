import useGlobalReducer from './useGlobalReducer';

/**
 * Se utiliza para obtenerlos desde la API y almacenarlos en el localStorage para futuras consultas
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
  const maxPages = 50;

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
    throw error;
  }

  return all;
}

/**
 * Hook React para acceder a la lista de items de la categoría global, y su estado de carga.
 */
export function useAllCategoryItems(category) {
  if (!category) {
    throw new Error("La categoría es requerida para useAllCategoryItems.");
  }

  const { store } = useGlobalReducer();
  const items = store[category] || [];
  const loading = items.length === 0;

  return { items, loading };
}