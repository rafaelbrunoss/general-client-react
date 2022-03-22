import React, { FunctionComponent } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { AppRoute, AuthUser } from '@core/models';

interface AppRouterProps {
  routes: AppRoute[];
}

const AppRouter: FunctionComponent<AppRouterProps> = (props: AppRouterProps) => {
  const { routes } = props;
  const userIsAuthenticated = AuthUser.isAuthenticated();

  return (
    <BrowserRouter>
      <Routes>
        {routes
          .filter((route: AppRoute) => {
            if (!route.permission) {
              return true;
            }

            return AuthUser.checkPermission(route.permission!);
          })
          .map((route: AppRoute, index: number) => {
            if (!route.isPublic && !userIsAuthenticated) {
              return (
                <Route
                  key={index}
                  element={<Navigate to={{ pathname: '/sign-in' }} />}
                />
              );
            }
            return <Route key={index} path={route.path} element={route.component} />;
          })}
        <Route path='/' element={<Navigate to={{ pathname: '/home' }} />} />
        <Route element={<Navigate to={{ pathname: '/home' }} />} />
      </Routes>
    </BrowserRouter>
  );
};

AppRouter.defaultProps = {
  routes: [],
};

export { AppRouter };
