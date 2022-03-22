import { BaseService } from '@core/services';

class NumberService extends BaseService {
  public static format = (value: number): string =>
    new Intl.NumberFormat(NumberService._userLanguage).format(value);
}

export { NumberService };
