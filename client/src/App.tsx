import React, { useContext, useEffect, useState } from 'react';
import {
  createBrowserRouter,
  Navigate,
  RouteObject,
  RouterProvider
} from 'react-router';
import AuthContext from './context/AuthContext';
import BrowserRoutes from './routes';
import ProtectedRoute from './routes/ProtectedRoute';
import PrivateLayout from './layout/PrivateLayout';
import Landing from './views/Landing';
import Login from './views/Login';
import NotFound from './views/NotFound';
import Register from './views/Register';
import './styles/custom.scss';

/**
 * The main application component that sets up routing based on the
 * user's authentication status.
 *
 * @component
 * @returns {React.ReactNode} The rendered component.
 */
function App(): React.ReactNode {
  const { signed, checkCurrentAuthUser } = useContext(AuthContext);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  /**
   * Routes for the users who are not signed in.
   * @type {RouteObject[]}
   */
  const notSignedRouter: RouteObject[] = [
    {
      path: '/',
      element: <Landing />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/home',
      element: <Navigate to="/login" replace />
    },
    {
      path: '*',
      element: <Navigate to="/" replace />
    }
  ];

  /**
   * Routes for users who are signed in.
   * @type {RouteObject[]}
   */
  const signedRouter: RouteObject[] = [
    {
      path: '/',
      element: <ProtectedRoute />,
      children: [
        {
          element: <PrivateLayout />,
          children: BrowserRoutes
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ];

  /**
   * Determines the appropriate router based on the user's authentication status.
   * @returns {Router} The configured router.
   */
  const getBrowserRouter = () => {
    if (signed) {
      return createBrowserRouter(signedRouter);
    }
    return createBrowserRouter(notSignedRouter);
  };

  const browserRouter = getBrowserRouter();

  useEffect(() => {
    checkCurrentAuthUser(window.location.pathname);
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <header className="d-flex justify-content-between p-3">
        <span></span>
        <button className="btn btn-outline-secondary" onClick={toggleTheme}>
          {theme === 'dark' ? '☀ Light Mode' : '🌙 Dark Mode'}
        </button>
      </header>

      {/* Your routes or content here */}
      <RouterProvider router={browserRouter} />
    </>
  );
};

export default App;
