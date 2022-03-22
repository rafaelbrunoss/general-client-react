export class EnvironmentService {
  private static myWindow = window as any;

  public static get isDev(): boolean {
    return (
      EnvironmentService.myWindow.appEnviroment &&
      EnvironmentService.myWindow.appEnviroment === 'dev'
    );
  }

  public static get isStg(): boolean {
    return (
      EnvironmentService.myWindow.appEnviroment &&
      EnvironmentService.myWindow.appEnviroment === 'stg'
    );
  }

  public static get isProd(): boolean {
    return (
      EnvironmentService.myWindow.appEnviroment &&
      EnvironmentService.myWindow.appEnviroment === 'prod'
    );
  }

  public static get isLocalhost(): boolean {
    return EnvironmentService.myWindow.location.hostname === 'localhost';
  }
}
