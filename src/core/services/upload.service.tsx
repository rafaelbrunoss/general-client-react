import { Dispatch, SetStateAction } from 'react';
import { AWSError, S3, config, Credentials } from 'aws-sdk';
import { ApiResult, UploadFileInfo, UploadFileStatus } from '@core/models';

class UploadService {
  private static BUCKET_NAME: string = 'bucket-name';
  private static managedUploads: S3.ManagedUpload[] = [];
  private static userUploadCrendentials: Credentials = {
    accessKeyId: 'accessKeyId',
    secretAccessKey: 'secretAccessKey',
  } as Credentials;
  public static filesToUpload: UploadFileInfo[] = [];
  public static setFilesToUpload: Dispatch<SetStateAction<UploadFileInfo[]>>;

  /*
    This function notify the backend that the upload was concluded on the bucket.
  */
  public static uploadCallback: (
    fileUploadInfo: UploadFileInfo,
  ) => Promise<ApiResult>;

  public static getFilesToUpload(): UploadFileInfo[] {
    return UploadService.filesToUpload;
  }

  public static onAddFile(event: any): void {
    UploadService.filesToUpload = event.newState.filter(
      (f: any) => !f.validationErrors,
    ) as UploadFileInfo[];
    UploadService.setFilesToUpload(UploadService.filesToUpload);
  }

  public static onRemoveFile(event: any): void {
    UploadService.filesToUpload = UploadService.filesToUpload.filter(
      (f) => f.id !== event.affectedFiles[0].uid,
    );
    UploadService.setFilesToUpload(UploadService.filesToUpload);
  }

  public static async uploadFilesToS3(): Promise<void> {
    config.update({
      ...UploadService.userUploadCrendentials,
      region: 'us-east-1',
      useAccelerateEndpoint: true,
      httpOptions: {
        timeout: 0,
      },
    });

    UploadService.filesToUpload.forEach(async (file: UploadFileInfo) => {
      file.uploadStartTime = new Date();
      file.bucketKey = `${file.id}${file.extension!}`;

      const managedUpload = new S3.ManagedUpload({
        params: {
          Bucket: UploadService.BUCKET_NAME,
          Key: file.bucketKey,
          Body: file.getRawFile && file.getRawFile(),
        },
      }).on('httpUploadProgress', (progress: S3.ManagedUpload.Progress) => {
        file.progress = Math.round((progress.loaded / progress.total) * 99);
        file.status = UploadFileStatus.Uploading;
        UploadService.setFilesToUpload(UploadService.filesToUpload);
      });

      UploadService.managedUploads.push(managedUpload);

      managedUpload.send(async (err: AWSError) => {
        if (err) {
          file.status = UploadFileStatus.UploadFailed;
        } else {
          file.uploadEndTime = new Date();
          try {
            await UploadService.uploadCallback(file);
            file.progress = 100;
            file.status = UploadFileStatus.Uploaded;
          } catch (error) {
            console.error('Error on UploadCallback');
          }
        }
        UploadService.setFilesToUpload(UploadService.filesToUpload);
      });
    });
  }

  public static abortUpload(): void {
    if (UploadService.managedUploads.length) {
      UploadService.managedUploads.forEach((file) => {
        if (file) {
          file.abort();
        }
      });
    }
  }
}

export { UploadService };
