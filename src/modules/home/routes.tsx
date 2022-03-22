import { AppRoute } from '@core/index';
import { Home } from './pages';

const getHomeRoutes = (): AppRoute[] => [
  new AppRoute({
    path: '/home',
    component: <Home />,
    isPublic: true,
  }),
];

export { getHomeRoutes };
