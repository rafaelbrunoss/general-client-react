import { FunctionComponent, Suspense } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from '@core/store';
import { AppLoader } from '@core/components';
import AppRouter from './AppRouter';

export const App: FunctionComponent = () => (
  <Provider store={createAppStore()}>
    <Suspense fallback={<AppLoader />}>
      <AppRouter />
    </Suspense>
  </Provider>
);
