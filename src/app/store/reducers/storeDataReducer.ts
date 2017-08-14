import { Message } from './../../../../shared/model/message';
import {
  UserThreadsLoadedAction,
  USER_THREADS_LOADED_ACTION,
  SendNewMessageAction,
  SEND_NEW_MESSAGE_ACTION,
  RECEIVED_MESSAGE_ACTION,
  ReceivedMessageAction,
  THREAD_SELECTED_ACTION,
  ThreadSelectedAction
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
    case RECEIVED_MESSAGE_ACTION:
      return handleReceivedMessageActionn(state, <any>action);
    case THREAD_SELECTED_ACTION:
      return handleThreadSelectedAction(state, <any>action);
    default:
      return state;
  }
}

function handleLoadUserThreadsAction(
  state: StoreData,
  action: UserThreadsLoadedAction
): StoreData {
  return {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };
}

function handleSendNewMessageAction(
  state: StoreData,
  action: SendNewMessageAction
) {
  const newStoreState = _.cloneDeep(state);

  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };

  currentThread.messageIds.push(newMessage.id);

  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}

function handleReceivedMessageActionn(state: StoreData, action: ReceivedMessageAction): StoreData {
  const newState = _.cloneDeep(state);
  const receivedMessage = action.payload.unreadMessages,
  currentThreadId = action.payload.currentThreadId,
  currentUserId = action.payload.currentUserId;

  receivedMessage.forEach(msg => {
    newState.messages[msg.id] = msg;
    newState.threads[msg.threadId].messageIds.push(msg.id);

    if (msg.threadId !== currentThreadId) {
      newState.threads[msg.threadId].participants[currentUserId] += 1;
    }
  });

  return newState;
}

function handleThreadSelectedAction(state: StoreData, action: ThreadSelectedAction): StoreData {
  const newState = _.cloneDeep(state),
    currentThreadId = newState.threads[action.payload.selectedThreadId],
    currentUserId = action.payload.currentUserId;
  currentThreadId.participants[currentUserId] = 0;
  return newState;
}
