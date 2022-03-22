import React, { FunctionComponent } from 'react';
import {
  // AccessDenied,
  AppRoute,
  AppRouter as Router,
  // authorizeAccess,
  MainLayout,
} from '@core/index';
import { getHomeRoutes } from '@home/routes';

const getRoutes = (): AppRoute[] => [...getHomeRoutes()];

const AppRouter: FunctionComponent = () => {
  const routes: AppRoute[] = getRoutes();
  const clonedRoutes: AppRoute[] = [...routes];

  routes
    .filter((f) => f.useMainLayout)
    .forEach((route) => {
      route.component = (
        <MainLayout routes={clonedRoutes}>{route.component}</MainLayout>
      );
    });

  // if (!authorizeAccess(ModuleEnum.CONNECT)) {
  //   return <AccessDenied />;
  // }

  return <Router routes={routes} />;
};

export default AppRouter;
