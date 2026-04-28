import { createBrowserRouter } from 'react-router-dom';
import { RootLayout } from './RootLayout';
import { Home } from './Home';
import { NotFound } from './NotFound';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: '*', element: <NotFound /> },
        ],
    },
]);
