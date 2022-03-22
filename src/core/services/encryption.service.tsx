import md5 from 'md5';

class EncryptionService {
  private static validateText(text: string): string {
    if (typeof text == 'string') {
      return text;
    } else {
      return JSON.stringify(text);
    }
  }

  public static fromBase64(text: string): string {
    try {
      return atob(EncryptionService.validateText(text));
    } catch {
      return atob(text);
    }
  }

  public static fromBase64Loop(text: string, loop: number): string {
    if (text === undefined || text === null || !text) {
      return '';
    }

    let result = text;
    for (let l = 1; l <= loop; l++) {
      result = EncryptionService.fromBase64(result);
    }

    return result;
  }

  public static toBase64(text: string): string {
    try {
      return btoa(EncryptionService.validateText(text));
    } catch {
      return btoa(text);
    }
  }

  public static toBase64Loop(text: string, loop: number): string {
    if (text === undefined || text === null || !text) {
      return '';
    }

    let result = text;
    for (let l = 1; l <= loop; l++) {
      result = EncryptionService.toBase64(result);
    }

    return result;
  }

  public static getMd5Encrypt(text: string): string {
    return md5(EncryptionService.validateText(text));
  }
}

export { EncryptionService };
