import { replaceallText } from '@core/utils';
import { II18n } from '@core/models';
import { BaseService } from '@core/services';

class I18nService extends BaseService {
  public static emptyDictionary: II18n = {
    es: {},
    enUS: {},
    ptBR: {},
  };

  public static commonDictionary: II18n = {
    es: {
      loading: 'Cargando',
      required: 'Requerido',
      INTERNAL_SERVER_ERROR: 'Error de servidor!',
    },
    enUS: {
      loading: 'Loading',
      required: 'Required',
      INTERNAL_SERVER_ERROR: 'Internal server error!',
    },
    ptBR: {
      loading: 'Loading',
      required: 'Obrigatório',
      INTERNAL_SERVER_ERROR: 'Erro interno do servidor!',
    },
  };

  public static extendedDictionary: II18n = {
    es: { ...I18nService.commonDictionary.es },
    enUS: { ...I18nService.commonDictionary.enUS },
    ptBR: { ...I18nService.commonDictionary.ptBR },
  };

  constructor(private translations: II18n) {
    super();
    I18nService.extendedDictionary = {
      es: { ...I18nService.commonDictionary.es, ...translations.es },
      enUS: { ...I18nService.commonDictionary.enUS, ...translations.enUS },
      ptBR: { ...I18nService.commonDictionary.ptBR, ...translations.ptBR },
    };
  }

  public static translate(
    translations: II18n,
    key: string, // 'Account: {0}'
    args?: string[], // 123 -> Account: 123
  ): string {
    const extendedDictionary = {
      es: { ...I18nService.commonDictionary.es, ...translations.es },
      enUS: { ...I18nService.commonDictionary.enUS, ...translations.enUS },
      ptBR: { ...I18nService.commonDictionary.ptBR, ...translations.ptBR },
    };

    let result: string = '';
    switch (I18nService.userLanguage) {
      case 'pt-BR':
        result = extendedDictionary.ptBR[key];
        break;
      case 'en-US':
        result = extendedDictionary.enUS[key];
        break;
      case 'es':
        result = extendedDictionary.es[key];
        break;
      default:
        result = extendedDictionary.ptBR[key];
        break;
    }
    if (args && args.length && result && result.length) {
      result = result.replace(/{(\d+)}/g, (match: string, index: number): string =>
        typeof args[index] === 'undefined' ? match : (args[index] as string),
      );
    }

    if (result) {
      result = replaceallText(result, '[b]', '<b>');
      result = replaceallText(result, '[/b]', '</b>');
      result = replaceallText(result, '[li]', '<li>');
      result = replaceallText(result, '[/li]', '</li>');
      result = replaceallText(result, '[/br]', '</br>');
    }

    return result || key;
  }

  public translate(
    key: string, // 'Account: {0}'
    args?: string[], // 123 -> Account: 123
  ): string {
    let result: string = '';
    switch (I18nService.userLanguage) {
      case 'pt-BR':
        result = I18nService.extendedDictionary.ptBR[key];
        break;
      case 'es':
        result = I18nService.extendedDictionary.es[key];
        break;
      default:
        result = I18nService.extendedDictionary.enUS[key];
        break;
    }
    if (args && args.length) {
      result = result.replace(/{(\d+)}/g, (match: string, index: number): string =>
        typeof args[index] === 'undefined' ? match : (args[index] as string),
      );
    }

    if (result) {
      result = replaceallText(result, '[b]', '<b>');
      result = replaceallText(result, '[/b]', '</b>');
      result = replaceallText(result, '[li]', '<li>');
      result = replaceallText(result, '[/li]', '</li>');
      result = replaceallText(result, '[/br]', '</br>');
    }

    return result || key;
  }
}

export { I18nService };
