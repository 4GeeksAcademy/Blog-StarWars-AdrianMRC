const typeMap = {
    people: 'characters',
    planets: 'planets',
    vehicles: 'vehicles',
};
/**
 * Extrae el tipo de entidad SWAPI en formato UI (characters, planets, vehicles) desde una URL SWAPI.
 * Usado en: NavbarFavoritos.jsx, ItemCard.jsx (cuando quieres saber a qué tipo corresponde un URL de favorito).
 */
export function extractType(url) {
    const key = Object.keys(typeMap).find(type => url.includes(type));
    return key ? typeMap[key] : '';
}

/**
 * Extrae el tipo de entidad SWAPI en formato API (people, planets, vehicles) desde una URL SWAPI.
 * Usado para: lógica interna, lookups, al leer favoritos del store/localStorage.
 */
export function getType(url) {
    const types = ['people', 'planets', 'vehicles'];
    return types.find(type => url.includes(type)) || '';
}

/**
 * Extrae el UID (ID) al final de una URL SWAPI.
 * Usado en: NavbarFavoritos.jsx, ItemCard.jsx, detalles/favoritos.
 */
export function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

/**
 * Genera el URL de imagen SW por categoría y UID.
 * Usado en: ItemCard.jsx, Home.jsx (cuando quieres mostrar la imagen del ítem SW).
 */
export function getImageUrl(category, uid) {
    const folder = category === "people" ? "characters" : category;
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;
}

/**
 * Genera el URL API SWAPI por categoría y UID.
 * Usado al crear objeto favorito en Home.jsx/store.
 */
export function getApiUrl(category, uid) {
    return `https://www.swapi.tech/api/${category}/${uid}`;
}

/**
 * Genera el path local para la ruta de detalles de un ítem.
 * Usado en: ItemCard.jsx/Home.jsx, NavbarFavoritos.jsx
 */
export function getDetailsURL(category, uid) {
    return `/details/${category === 'people' ? 'characters' : category}/${uid}`;
}

/**
 * Parsea un URL de favorito y devuelve el tipo (route-friendly) y el UID.
 * Usado en: NavbarFavoritos.jsx para mostrar links correctos desde un URL.
 */
export function parseFavUrl(url) {
    const type = extractType(url); // Reutiliza `extractType`
    const uid = getIdFromUrl(url); // Reutiliza `getIdFromUrl`
    return { type, uid };
}
/**
 * Obtiene datos desde localStorage en parseado seguro.
 * Usado en: store.js, para el estado inicial.
 */
export function getLocalData(key, defaultValue = []) {
    const raw = localStorage.getItem(key);
    try {
        return raw ? JSON.parse(raw) : defaultValue;
    } catch {
        return defaultValue;
    }
}

/**
 * Lógica pura para alternar un favorito: si existe, lo quita; si no, lo agrega.
 * Usado en: store.js, reducer global.
 */
export function toggleFavorite(existingFavorites, fav) {
    const exists = existingFavorites.some(f => f.url === fav.url);
    return exists
        ? existingFavorites.filter(f => f.url !== fav.url)
        : [...existingFavorites, fav];
}
