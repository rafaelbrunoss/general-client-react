import { EnvironmentService, EncryptionService } from '@core/services';

class LocalStorageService {
  public static getLocalStorageEncrypt = (name: string): string =>
    EnvironmentService.isDev ? name : EncryptionService.toBase64Loop(name, 4);
  public static getLocalStorageDecrypt = (name: string): string =>
    EnvironmentService.isDev ? name : EncryptionService.fromBase64Loop(name, 4);

  public static getLocalStorage = (name: string): string | undefined => {
    const result =
      localStorage.getItem(LocalStorageService.getLocalStorageEncrypt(name)) || '';
    return LocalStorageService.getLocalStorageDecrypt(result);
  };

  public static getLocalStorageJSON = <T,>(name: string): T | undefined => {
    const result = LocalStorageService.getLocalStorage(name) || '';

    if (!result || result === '') {
      return undefined;
    }

    if (typeof result === 'object') {
      return result as T;
    }

    const resultType = JSON.parse(result) as T;
    return resultType;
  };

  public static setLocalStorage = (name: string, value: string): void => {
    localStorage.setItem(
      LocalStorageService.getLocalStorageEncrypt(name),
      LocalStorageService.getLocalStorageEncrypt(value),
    );
  };

  public static setLocalStorageJSON = (name: string, value: any): void =>
    LocalStorageService.setLocalStorage(name, JSON.stringify(value));

  public static removeLocalStorage = (name: string): void =>
    localStorage.removeItem(LocalStorageService.getLocalStorageEncrypt(name));
}

export { LocalStorageService };
