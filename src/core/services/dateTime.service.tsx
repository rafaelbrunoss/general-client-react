import moment from 'moment';
import { II18n } from '@core/models';
import { BaseService, I18nService } from '@core/services';

class DateTimeService extends BaseService {
  /* eslint-disable */
  public static monthsTranslations: II18n = {
    es: {
      1: 'Enero',
      2: 'Febrero',
      3: 'Marzo',
      4: 'Abril',
      5: 'Mayo',
      6: 'Junio',
      7: 'Julio',
      8: 'Agosto',
      9: 'Septiembre',
      10: 'Octubre',
      11: 'Noviembre',
      12: 'Diciembre',
    },
    enUS: {
      1: 'January',
      2: 'February',
      3: 'March',
      4: 'April',
      5: 'May',
      6: 'June',
      7: 'July',
      8: 'August',
      9: 'September',
      10: 'October',
      11: 'November',
      12: 'December',
    },
    ptBR: {
      1: 'Janeiro',
      2: 'Fevereiro',
      3: 'Março',
      4: 'Abril',
      5: 'Maio',
      6: 'Junho',
      7: 'Julho',
      8: 'Agosto',
      9: 'Setembro',
      10: 'Outubro',
      11: 'Novembro',
      12: 'Dezembro',
    },
  };

  public static weekdaysTranslations: II18n = {
    es: {
      0: 'Dom',
      1: 'Lun',
      2: 'Mar',
      3: 'Mie',
      4: 'Jue',
      5: 'Vie',
      6: 'Sab',
    },
    enUS: {
      0: 'Sun',
      1: 'Mon',
      2: 'Tue',
      3: 'Wed',
      4: 'Thu',
      5: 'Fri',
      6: 'Sat',
    },
    ptBR: {
      0: 'Dom',
      1: 'Seg',
      2: 'Ter',
      3: 'Qua',
      4: 'Qui',
      5: 'Sex',
      6: 'Sab',
    },
  };
  /* eslint-enable */

  public static monthsNamesTranslations: II18n = {
    es: {},
    enUS: {},
    ptBR: {},
  };

  public static dateFormat =
    DateTimeService.userLanguage === 'en-US' ? 'MM/DD/yyyy' : 'DD/MM/yyyy';

  public static getFormattedTime = (date: string): string =>
    moment.utc(new Date(date)).format('hh:mm').toString();

  public static getFormattedTime24Hours = (date: string): string => {
    moment.locale('pt-br');
    return moment(date).format('HH:mm').toString();
  };

  public static getFormattedDate = (
    date: string,
    format: string = DateTimeService.dateFormat,
  ): string => moment.utc(date).format(format).toString();

  public static getFormattedDateWithWeekday = (
    date: string,
    format: string = DateTimeService.dateFormat,
  ): string => {
    const i18n = new I18nService(DateTimeService.weekdaysTranslations);
    return `${i18n.translate(moment.utc(date).format('d'))}, ${moment
      .utc(date)
      .format(format)
      .toString()}`;
  };

  public static getFormattedDateTime = (
    date: string,
    format: string = DateTimeService.dateFormat,
  ): string => moment.utc(new Date(date)).format(`${format}, hh:mm`).toString();

  public static getHoursFromMinutes = (_minutes: number): string => {
    const hours = String(Math.floor(_minutes / 60)).padStart(2, '0');
    const minutes = String(_minutes % 60).padStart(2, '0');
    return hours + ':' + minutes;
  };

  public static getDifferenceOfDays = (start: Date, end: Date): number => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
    return Math.round(Math.abs((end.getTime() - start.getTime()) / oneDay));
  };

  public static getMonthNameByEnglish = (month: string): string => {
    if (
      DateTimeService.monthsNamesTranslations.es['January'.toUpperCase()] ===
      undefined
    ) {
      for (let x = 1; x <= 12; x++) {
        const monthName = DateTimeService.monthsTranslations.enUS[x].toUpperCase();
        DateTimeService.monthsNamesTranslations.es[monthName] =
          DateTimeService.monthsTranslations.es[x];
        DateTimeService.monthsNamesTranslations.enUS[monthName] =
          DateTimeService.monthsTranslations.enUS[x];
        DateTimeService.monthsNamesTranslations.ptBR[monthName] =
          DateTimeService.monthsTranslations.ptBR[x];
      }
    }
    const i18n = new I18nService(DateTimeService.monthsNamesTranslations);
    const result = i18n.translate(month.toUpperCase()) || month;
    return result;
  };
}

export { DateTimeService };
