const typeMap = {
    people: 'characters',
    planets: 'planets',
    vehicles: 'vehicles',
};

// Encuentra el tipo de recurso (people, planets, vehicles) en una URL y lo mapea a su equivalente
export function extractType(url) {
    const key = Object.keys(typeMap).find(type => url.includes(type));
    return key ? typeMap[key] : '';
}

// Obtiene el tipo de recurso directamente de la URL sin mapearlo
export function getType(url) {
    const types = ['people', 'planets', 'vehicles'];
    return types.find(type => url.includes(type)) || '';
}

// Extrae el ID único de un recurso desde su URL
export function getIdFromUrl(url) {
    const parts = url.split("/").filter(Boolean);
    return parts[parts.length - 1];
}

// Construye la URL de la imagen para un recurso específico basado en su categoría e ID
export function getImageUrl(category, uid) {
    const folder = category === "people" ? "characters" : category;
    return `https://raw.githubusercontent.com/tbone849/star-wars-guide/master/build/assets/img/${folder}/${uid}.jpg`;
}

// Construye la URL de la API para un recurso específico basado en su categoría e ID
export function getApiUrl(category, uid) {
    return `https://www.swapi.tech/api/${category}/${uid}`;
}

// Construye la URL de detalles para un recurso específico basado en su categoría e ID
export function getDetailsURL(category, uid) {
    return `/details/${category === 'people' ? 'characters' : category}/${uid}`;
}

// Parsea una URL de favorito para extraer su tipo y ID
export function parseFavUrl(url) {
    const type = extractType(url); 
    const uid = getIdFromUrl(url); 
    return { type, uid };
}

// Obtiene datos almacenados en localStorage y los parsea como JSON
export function getLocalData(key, defaultValue = []) {
    const raw = localStorage.getItem(key);
    try {
        return raw ? JSON.parse(raw) : defaultValue;
    } catch {
        return defaultValue;
    }
}

// Agrega o elimina un recurso de la lista de favoritos
// Si ya existe, lo elimina; si no, lo agrega
export function toggleFavorite(existingFavorites, fav) {
    const exists = existingFavorites.some(f => f.url === fav.url);
    return exists
        ? existingFavorites.filter(f => f.url !== fav.url)
        : [...existingFavorites, fav];
}