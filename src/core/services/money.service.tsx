import { BaseService } from '@core/services';

class MoneyService extends BaseService {
  public static format = (value: number): string =>
    new Intl.NumberFormat(MoneyService._userLanguage, {
      style: 'currency',
      currency: MoneyService._userCurrency,
    }).format(value);
}

export { MoneyService };
