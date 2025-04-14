import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { StoreProvider } from './hooks/useGlobalReducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const App = () => {
    return (
        <StoreProvider>
            <RouterProvider router={router} />
        </StoreProvider>
    );
};

export default App;
