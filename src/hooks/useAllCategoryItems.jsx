// useAllCategoryItems.jsx

import useGlobalReducer from './useGlobalReducer';

/**
 * Fetcher universal para obtener TODO el contenido expandido de una categoría de SWAPI.
 * Usado en: Layout.jsx al iniciar la app.
 * Esta función NO es un hook.
 */
export async function fetchAllExpanded(category) {
  // Descarga todos los items de una categoría SWAPI con paginado
  let page = 1;
  const pageSize = 100;
  let all = [];
  let keepPaging = true;

  while (keepPaging) {
    const res = await fetch(`https://www.swapi.tech/api/${category}?page=${page}&limit=${pageSize}&expanded=true`);
    const data = await res.json();

    all = all.concat(data.results);

    if (data.results.length < pageSize) {
      keepPaging = false;
    } else {
      page++;
    }
  }

  return all;
}

/**
 * Hook React para acceder a la lista de items de la categoría global, y su estado de carga.
 * Usado en: Home.jsx, Details.jsx, cualquier lista de entidades del store.
 */
export function useAllCategoryItems(category) {
  const { store } = useGlobalReducer();
  const items = store[category] || [];
  const loading = items.length === 0;
  return { items, loading };
}
