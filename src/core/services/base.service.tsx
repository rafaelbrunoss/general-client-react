import { newGuid } from '@core/utils';
import { Language } from '@core/models';

class BaseService {
  protected static _id: string;
  protected static _userLanguage = Language.DEFAULT;
  protected static _userCurrency = '';

  constructor() {
    BaseService._id = newGuid();
  }

  public get id(): string {
    return BaseService._id;
  }

  public static get userLanguage(): string {
    return BaseService._userLanguage;
  }

  public static get userCurrency(): string {
    if (!BaseService._userCurrency) {
      BaseService._userCurrency =
        BaseService.userLanguage === Language.PTBR
          ? 'BRL'
          : BaseService.userLanguage === Language.ES
          ? 'es-US'
          : 'USD';
    }

    return BaseService.userCurrency;
  }
}

export { BaseService };
