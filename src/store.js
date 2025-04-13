import { getLocalData, toggleFavorite } from './hooks/helpers';

export const initialStore = {
    people: getLocalData('people'),
    planets: getLocalData('planets'),
    vehicles: getLocalData('vehicles'),
    favorites: getLocalData('favorites'),
    loading: false,
    error: null,
};

export const ACTIONS = {
    SET_PEOPLE: 'SET_PEOPLE',
    SET_PLANETS: 'SET_PLANETS',
    SET_VEHICLES: 'SET_VEHICLES',
    TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
    SET_LOADING: 'SET_LOADING',
    SET_ERROR: 'SET_ERROR',
    DATA_LOADED: 'DATA_LOADED'
};

export function storeReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_PEOPLE:
            return { ...state, people: action.payload, loading: false, error: null };
        case ACTIONS.SET_PLANETS:
            return { ...state, planets: action.payload, loading: false, error: null };
        case ACTIONS.SET_VEHICLES:
            return { ...state, vehicles: action.payload, loading: false, error: null };
        case ACTIONS.TOGGLE_FAVORITE:
            return { ...state, favorites: toggleFavorite(state.favorites, action.payload) };
        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload, error: null };
        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };
        case ACTIONS.DATA_LOADED:
            return { ...state, dataLoaded: action.payload };
        default:
            return state;
    }
}