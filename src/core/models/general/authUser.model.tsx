import { NULL_GUID } from '@core/utils';
import { CookieService, LocalStorageService } from '@core/services';
import { Language, ProjectPermissions } from '@core/models';

class AuthUser {
  public id: string = NULL_GUID;
  public name: string = '';
  public email: string = '';
  public photoURL: string = '';

  public accountId: string = NULL_GUID;
  public accountName: string = '';

  public token: string = '';
  public tokenExpirationDate: Date = new Date();

  public language: Language = Language.DEFAULT;
  public permissions: number[] = [];

  public static _currentUser: AuthUser;

  constructor(authUser: Partial<AuthUser>) {
    Object.assign(this, authUser);
  }

  public static get currentUser(): AuthUser {
    if (!AuthUser._currentUser) {
      AuthUser._currentUser = CookieService.getCookieJSON<AuthUser>(
        CookieService.cookieAuthUser,
      ) as AuthUser;
      if (!AuthUser._currentUser) {
        AuthUser._currentUser = LocalStorageService.getLocalStorageJSON<AuthUser>(
          CookieService.cookieAuthUser,
        ) as AuthUser;
      }
    }

    return AuthUser._currentUser;
  }

  public static set currentUser(authUser: AuthUser) {
    CookieService.setCookieJSON(CookieService.cookieAuthUser, authUser);
    LocalStorageService.setLocalStorageJSON(CookieService.cookieAuthUser, authUser);
    AuthUser._currentUser = CookieService.getCookieJSON<AuthUser>(
      CookieService.cookieAuthUser,
    ) as AuthUser;
  }

  public static getId = (): string => {
    if (AuthUser.isAuthenticated()) {
      return AuthUser.currentUser.id;
    }
    return NULL_GUID;
  };

  public static getEmail = (): string => {
    if (AuthUser.isAuthenticated()) {
      return AuthUser.currentUser.email;
    }
    return '';
  };

  public static isAuthenticated = (): boolean => {
    const user = AuthUser.currentUser;
    if (user && user.id && user.id !== '' && user.id !== NULL_GUID) {
      return true;
    }
    return false;
  };

  public static getPermissions = (): number[] => {
    if (AuthUser.isAuthenticated()) {
      return AuthUser.currentUser.permissions as number[];
    }

    return [];
  };

  public static isValidUserId = (): boolean => AuthUser.getId() !== NULL_GUID;

  public static checkPermission = (
    permission: ProjectPermissions | number,
  ): boolean => {
    const permissions = AuthUser.getPermissions();
    return permissions && permissions.includes(permission);
  };
}

export { AuthUser };
