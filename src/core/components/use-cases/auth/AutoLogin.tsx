import { FunctionComponent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CookieService,
  EncryptionService,
  LocalStorageService,
} from '@core/services';
import { AuthUser } from '@core/models';
import { AppLoader } from '@core/components';

const AutoLogin: FunctionComponent = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let authUser = CookieService.getCookieJSON(
      CookieService.cookieAuthUser,
    ) as AuthUser;

    if (!authUser) {
      const splitPath = window.location.pathname.split('/');
      if (splitPath.length !== 3 || !splitPath[2]) {
        if (navigate) {
          navigate(`/home`);
        } else {
          window.location.pathname = '/home';
        }
      }

      const auth = splitPath[2];
      const decodeAuth = EncryptionService.fromBase64(auth!);
      authUser = JSON.parse(decodeAuth as string) as AuthUser;
    }
    LocalStorageService.setLocalStorageJSON(CookieService.cookieAuthUser, authUser);
    CookieService.setCookieJSON(CookieService.cookieAuthUser, authUser);

    const homePage = `${window.location.protocol}//${window.location.host}/home`;
    setTimeout(() => (window.location.href = homePage), 10);
  }, [navigate]);

  return <AppLoader />;
};

export { AutoLogin };
