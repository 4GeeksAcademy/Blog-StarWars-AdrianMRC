import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useGlobalReducer from '../hooks/useGlobalReducer';
import ItemCard from '../components/ItemCard';
import { ACTIONS } from '../store';
import { getType, getImageUrl, getDetailsURL } from '../hooks/helpers'; // Ajusta ruta según tu estructura

const Favorites = () => {
    const { store, dispatch } = useGlobalReducer();

    if (store.favorites.length === 0) {
        return (
            <Container className="text-center mt-5">
                <h2>Tu lista de favoritos está vacía</h2>
                <p>¡Añade personajes, planetas o naves a tus favoritos!</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h1>Mis favoritos de Star Wars</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {store.favorites.map(item => {
                    // Usamos helper para saber la categoría y uid
                    const category = getType(item.url);
                    const uid = item.uid;
                    return (
                        <Col key={item.url}>
                            <ItemCard
                                name={item.name}
                                imageUrl={getImageUrl(category === 'people' ? 'characters' : category, uid)}
                                detailsUrl={getDetailsURL(category, uid)}
                                isFavorite={true}
                                onToggleFavorite={() => dispatch({
                                    type: ACTIONS.TOGGLE_FAVORITE,
                                    payload: item
                                })}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Container>
    );
};

export default Favorites;
