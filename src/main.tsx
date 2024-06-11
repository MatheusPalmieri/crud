// React
import React from 'react';
import ReactDOM from 'react-dom/client';

// Router
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

// Styles
import './styles/tailwind.css';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
