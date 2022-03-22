import axios, { AxiosInstance } from 'axios';
import axiosRetry from 'axios-retry';
import platform from 'platform';
import {
  AuthUser,
  ApiResult,
  AxiosResult,
  II18n,
  RequestConfig,
  ServicesType,
  Services,
} from '@core/models';
import { BaseService, EnvironmentService, I18nService } from '@core/services';
import { newGuid } from '@core/utils';

const _translations: II18n = {
  es: {
    INVALID: 'No válidos!',
  },
  enUS: {
    INVALID: 'Invalid!',
  },
  ptBR: {
    INVALID: 'Inválido!',
  },
};

export abstract class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(
    private service: ServicesType,
    private translations: II18n = I18nService.emptyDictionary,
  ) {
    let baseURL: string = '';
    switch (this.service) {
      case Services.AUTH:
        baseURL = this.baseURLAuth;
        break;

      case Services.PROJECT:
        baseURL = this.baseURLProject;
        break;

      default:
        break;
    }
    this.axiosInstance = axios.create({ baseURL });
    axiosRetry(this.axiosInstance, {
      retries: 3,
      retryDelay: (retryCount: number): number => retryCount * 2000,
      retryCondition: (error: any): boolean =>
        error.response!.status === 503 || error.response!.status === 504,
    });
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error: any) => {
        if (error && error.response) {
          if (error.response.status === 403) {
            window.postMessage({
              apiResult: {
                status403: true,
              },
            });
          }
          if (error.response.status === 401) {
            window.location.href = '/login';
          }
        }

        return Promise.reject(error);
      },
    );

    this.translations = {
      es: {
        ...I18nService.emptyDictionary.es,
        ...translations.es,
        ..._translations.es,
      },
      enUS: {
        ...I18nService.emptyDictionary.enUS,
        ...translations.enUS,
        ..._translations.es,
      },
      ptBR: {
        ...I18nService.emptyDictionary.ptBR,
        ...translations.ptBR,
        ..._translations.es,
      },
    };
  }

  private get baseURL(): string {
    if (EnvironmentService.isProd) {
      return 'https://api.domain.com';
    } else if (EnvironmentService.isStg) {
      return 'https://api-stg.domain.com';
    } else if (EnvironmentService.isDev) {
      return 'https://api-dev.domain.com';
    } else {
      return 'http://localhost:5000';
    }
  }

  private get baseURLAuth(): string {
    return `${this.baseURL}/auth`;
  }

  private get baseURLProject(): string {
    return `${this.baseURL}/project`;
  }

  private addHeaderAuth = (config: RequestConfig): RequestConfig => {
    if (!config.headers) {
      config.headers = {};
    }

    config.headers['x-platform'] = platform;
    config.headers['x-tracker'] = newGuid();

    // @ts-ignore
    config.headers['x-enviroment'] = window.appEnviroment;

    const currentUser = AuthUser.currentUser;
    if (currentUser && currentUser.id) {
      config.headers['x-account'] = currentUser.accountId;
      config.headers['x-language'] = BaseService.userLanguage;
      config.headers['Authorization'] = `Bearer ${currentUser.token}`;
    }

    return config;
  };

  private getMessageError(apiResult: ApiResult): string | undefined {
    let message: string | undefined;
    if (!apiResult || !apiResult.success) {
      message = '';

      if (apiResult.message && apiResult.message.length) {
        let join = '';
        apiResult.message.forEach((msg) => {
          message += `${join}${I18nService.translate(this.translations, msg)}`;
          join = ', ';
        });
      }
    }

    return message;
  }

  public checkTokenValidity = (apiResult: ApiResult): void => {
    // Notify the user about the remaning time of authentication
    if (apiResult && apiResult.tokenValidityInMinutes) {
      if (apiResult.tokenValidityInMinutes <= 0) {
        let redirect = '';
        if (EnvironmentService.isDev) {
          redirect = `?redirect=${window.location.origin}`;
        }
        const environment = EnvironmentService.isDev
          ? '-dev'
          : EnvironmentService.isStg
          ? '-stg'
          : '';
        window.location.href = `https://auth${environment}.domain.com/${redirect}`;
      } else {
        window.postMessage({
          apiResult: {
            tokenValidityInMinutes: apiResult.tokenValidityInMinutes,
          },
        });
      }
    }
  };

  public async get<Result = any>(
    url: string,
    config: RequestConfig = {},
  ): Promise<ApiResult<Result>> {
    const axiosResult: AxiosResult<Result> = await this.axiosInstance.get(
      url,
      this.addHeaderAuth(config),
    );
    const apiResult: ApiResult<Result> = axiosResult.data;
    apiResult.errorMessage = this.getMessageError(apiResult);

    this.checkTokenValidity(apiResult);

    return apiResult;
  }

  public async post<Result = any>(
    url: string,
    data: any,
    config: RequestConfig = {},
  ): Promise<ApiResult<Result>> {
    const axiosResult: AxiosResult<Result> = await this.axiosInstance.post(
      url,
      data,
      this.addHeaderAuth(config),
    );
    const apiResult: ApiResult<Result> = axiosResult.data;
    apiResult.errorMessage = this.getMessageError(apiResult);

    this.checkTokenValidity(apiResult);

    return apiResult;
  }

  public async put<Result = any>(
    url: string,
    data: any,
    config: RequestConfig = {},
  ): Promise<ApiResult<Result>> {
    const axiosResult: AxiosResult<Result> = await this.axiosInstance.put(
      url,
      data,
      this.addHeaderAuth(config),
    );
    const apiResult: ApiResult<Result> = axiosResult.data;
    apiResult.errorMessage = this.getMessageError(apiResult);

    this.checkTokenValidity(apiResult);

    return apiResult;
  }

  public async delete<Result = any>(
    url: string,
    config: RequestConfig = {},
  ): Promise<ApiResult<Result>> {
    const axiosResult: AxiosResult<Result> = await this.axiosInstance.delete(
      url,
      this.addHeaderAuth(config),
    );
    const apiResult: ApiResult<Result> = axiosResult.data;
    apiResult.errorMessage = this.getMessageError(apiResult);

    this.checkTokenValidity(apiResult);

    return apiResult;
  }
}
