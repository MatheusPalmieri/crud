import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../pages/Home';
import { PageForm } from '@/pages/Form';
import { PageDetails } from '@/pages/Details';

export const router = createBrowserRouter([
  {
    path: '',
    element: <Home />,
  },
  {
    path: 'novo',
    element: <PageForm />,
  },
  {
    path: 'detalhes/:id',
    element: <PageDetails />,
  },
  {
    path: 'editar/:id',
    element: <PageForm />,
  },
]);
