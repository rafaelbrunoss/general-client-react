import React, { FunctionComponent, useEffect } from 'react';
import { EnvironmentService } from '@core/services';
import { AppLoader } from '@core/components';

export const LoginRedirect: FunctionComponent = () => {
  // removeLocalStorage(CookieService.cookieAuthUser);

  useEffect(() => {
    setTimeout(() => {
      let redirect = '';
      if (EnvironmentService.isDev) {
        redirect = `?redirect=${window.location.origin}`;
      }

      const environment = EnvironmentService.isDev
        ? '-dev'
        : EnvironmentService.isStg
        ? '-stg'
        : '';
      window.location.href = `https://auth${environment}.domain.com.br/${redirect}`;
    }, 1000);
  }, []);

  return <AppLoader />;
};
