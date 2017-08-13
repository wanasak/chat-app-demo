import { Message } from './../../../../shared/model/message';
import {
  UserThreadsLoadedAction,
  USER_THREADS_LOADED_ACTION,
  SendNewMessageAction,
  SEND_NEW_MESSAGE_ACTION
} from './../actions';
import { Action } from '@ngrx/store';
import { StoreData, INITAL_STORE_DATA } from './../store-data';

import * as _ from 'lodash';
// const uuid = require('uuid/V4');
import * as uuid from 'uuid/V4';

export function storeData(
  state: StoreData = INITAL_STORE_DATA,
  action: Action
): StoreData {
  switch (action.type) {
    case USER_THREADS_LOADED_ACTION:
      return handleLoadUserThreadsAction(state, <any>action);
    case SEND_NEW_MESSAGE_ACTION:
      return handleSendNewMessageAction(state, <any>action);
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

function handleSendNewMessageAction(state: StoreData, action: SendNewMessageAction): StoreData {
  // Object.assign does not do deep copy
  // const newState: StoreData = Object.assign({}, state);
  const newState: StoreData = _.cloneDeep(state);

  const currentThread = newState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };

  currentThread.messageIds.push(newMessage.id);

  newState.messages[newMessage.id] = newMessage;

  return newState;
}

