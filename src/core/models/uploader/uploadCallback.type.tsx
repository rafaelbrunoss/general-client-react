import { ApiResult, UploadFileInfo } from '@core/models';

type UploadCallback = (fileUploadInfo: UploadFileInfo) => Promise<ApiResult>;

export type { UploadCallback };
