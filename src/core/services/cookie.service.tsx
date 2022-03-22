import Cookies from 'universal-cookie';
import { EncryptionService, EnvironmentService } from '@core/services';

class CookieService {
  public static cookieAuthUser: string = 'user';
  public static cookies: Cookies = new Cookies();

  public static encryptCookie(name: string): string {
    return EnvironmentService.isDev ? name : EncryptionService.toBase64Loop(name, 4);
  }

  public static decryptCookie(name: string): string {
    return EnvironmentService.isDev
      ? name
      : EncryptionService.fromBase64Loop(name, 4);
  }

  public static getCookie(name: string): string | undefined {
    const result = CookieService.cookies.get(name);

    if (result) {
      return CookieService.decryptCookie(result);
    }

    return result;
  }

  public static setCookie(name: string, value: string): void {
    CookieService.cookies.set(name, value, {
      path: '/',
      secure: true,
      domain: 'domain.com.br',
      sameSite: 'lax',
    });

    if (!CookieService.getCookie(name)) {
      console.warn('Cookie not found!');
      document.cookie = `user=${value}; SameSite=lax; Secure; Domain=.domain.com.br`;
      document.cookie = `user=${value}; SameSite=lax; Secure; Domain=.amazonaws.com`;
    }
  }

  public static removeCookie(name: string): void {
    CookieService.cookies.remove(name);
  }

  public static getCookieJSON<T>(name: string): T | undefined {
    const result = CookieService.getCookie(name) || '';
    if (!result || result === '') {
      return undefined;
    }

    if (typeof result === 'object') {
      return result as T;
    }

    const resultType = JSON.parse(result) as T;
    return resultType;
  }

  public static setCookieJSON(name: string, value: any): void {
    CookieService.setCookie(name, JSON.stringify(value));
  }
}

export { CookieService };
