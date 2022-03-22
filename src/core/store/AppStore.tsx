import { AnyAction, combineReducers, createStore, EmptyObject, Store } from 'redux';
import { notificationReducer, NotificationState } from './notification';

export interface RootReducerProps {
  notification: NotificationState;
}

export const createAppStore = (): Store<EmptyObject & RootReducerProps, AnyAction> =>
  createStore(
    combineReducers<RootReducerProps>({
      notification: notificationReducer,
    }),
  );
