import React, { FunctionComponent, ReactNode } from 'react';
import { AppRoute } from '@core/models';
// import { LoginRedirect } from '@core/components';
import { TopBar } from './top-bar/TopBar';
import { MainLayoutContainer } from './MainLayoutContainer';

interface MainLayoutProps {
  children: ReactNode;
  routes: AppRoute[];
  hideLeftMenu?: boolean;
}

export const MainLayout: FunctionComponent<MainLayoutProps> = (
  props: MainLayoutProps,
) => {
  const { routes, children } = props;
  // const userIsAuthenticated = AuthUser.isAuthenticated();
  // if (!userIsAuthenticated) {
  //   return <LoginRedirect />;
  // }
  return (
    <MainLayoutContainer routes={routes}>
      <TopBar />
      {children}
    </MainLayoutContainer>
  );
};
