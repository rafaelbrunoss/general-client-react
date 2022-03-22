import { ApiResult } from '@core/models';

export interface AxiosResult<T = any> {
  data: ApiResult<T>;
  status: number;
}
