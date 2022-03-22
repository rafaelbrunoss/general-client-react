import { Notification } from '@core/models';

interface NotificationState {
  notifications: Notification[];
}

const initialNotificationState: NotificationState = {
  notifications: [],
};

export { initialNotificationState };
export type { NotificationState };
