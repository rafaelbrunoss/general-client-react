export interface UploadFileInfo {
  id: string;
  extension: string;
  bucketKey: string;
  uploadStartTime: Date;
  uploadEndTime: Date;
  status: string;
  progress: number;
  getRawFile: () => string;
}
