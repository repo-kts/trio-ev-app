import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { Home } from './Home';
import { Rentals } from './Rentals';
import { Leasing } from './Leasing';
import { Transport } from './Transport';
import { NotFound } from './NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'rentals', element: <Rentals /> },
            { path: 'leasing', element: <Leasing /> },
            { path: 'transport', element: <Transport /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
