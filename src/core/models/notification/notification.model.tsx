import { newGuid, NULL_GUID } from '@core/utils';
import { NotificationStyles } from '@core/models';

class Notification {
  public id: string = NULL_GUID;
  public style: NotificationStyles = NotificationStyles.NONE;
  public icon: boolean = true;
  public timeout: number = 10000; // milliseconds
  public content: string = '';

  constructor(notification: Partial<Notification>) {
    notification.id = newGuid();
    Object.assign(this, notification);
  }
}

export { Notification };
