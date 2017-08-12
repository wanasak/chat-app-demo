import { UserThreadsLoadedAction, USER_THREADS_LOADED_ACTION } from './../actions';
import { Action } from '@ngrx/store';
import { StoreData, INITAL_STORE_DATA } from './../store-data';

import * as _ from 'lodash';

export function storeData(
  state: StoreData = INITAL_STORE_DATA,
  action: Action
): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
        return handleLoadUserThreadsAction(state, <any>action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(
  state: StoreData,
  action: UserThreadsLoadedAction
): StoreData {
  const userData = action.payload;

  const newState: StoreData = Object.assign({}, state);

  return {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}
