export class ApiResult<T = any> {
  public data: T = {} as T;
  public utcTime: string = new Date().toUTCString();
  public success: boolean = true;
  // @ts-ignore
  public environment: string = window.appEnviroment;
  public message: Array<string> = [];
  public endpoint?: string | undefined = undefined;
  public errorMessage?: string | undefined = undefined;
  public tokenValidityInMinutes?: number | undefined = undefined;

  constructor(apiResult: Partial<ApiResult>) {
    Object.assign(this, apiResult);
  }
}
