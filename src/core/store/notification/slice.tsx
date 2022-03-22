import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  initialNotificationState as initialState,
  NotificationState,
} from './state';
import { Notification } from '@core/models';

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification: (
      state: NotificationState,
      action: PayloadAction<Notification>,
    ) => {
      const notificationAlreadyExists = state.notifications.find(
        (notification) => notification.content === action.payload.content,
      );

      if (!notificationAlreadyExists) {
        state.notifications.push(action.payload);
      }
    },
    hideNotification: (state: NotificationState, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload,
      );
    },
  },
});

const notificationReducer = notificationSlice.reducer;
const notificationActions = notificationSlice.actions;

export { notificationSlice, notificationReducer, notificationActions };
