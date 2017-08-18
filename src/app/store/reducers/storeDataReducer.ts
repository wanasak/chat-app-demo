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
  const newStoreState: StoreData = {
    participants: state.participants,
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };

  newStoreState.threads[action.payload.threadId] = Object.assign(
    {},
    state.threads[action.payload.threadId]
  );

  const currentThread = newStoreState.threads[action.payload.threadId];

  const newMessage: Message = {
    text: action.payload.text,
    threadId: action.payload.threadId,
    timestamp: new Date().getTime(),
    participantId: action.payload.participantId,
    id: uuid()
  };

  // Create a shallow clone
  currentThread.messageIds = currentThread.messageIds.slice(0);
  currentThread.messageIds.push(newMessage.id);

  newStoreState.messages[newMessage.id] = newMessage;

  return newStoreState;
}

function handleReceivedMessageActionn(
  state: StoreData,
  action: ReceivedMessageAction
): StoreData {
  const newState: StoreData = {
    participants: state.participants,
    threads: _.clone(state.threads),
    messages: _.clone(state.messages)
  };
  const receivedMessage = action.payload.unreadMessages,
    currentThreadId = action.payload.currentThreadId,
    currentUserId = action.payload.currentUserId;

  receivedMessage.forEach(msg => {
    newState.messages[msg.id] = msg;

    // Create a shallow clone
    newState.threads[msg.threadId] = _.clone(state.threads[msg.threadId]);

    const currentThread = newState.threads[msg.threadId];

    currentThread.messageIds = _.clone(currentThread.messageIds);
    currentThread.messageIds.push(msg.id);

    if (msg.threadId !== currentThreadId) {
      currentThread.participants = _.clone(
        newState.threads[msg.threadId].participants
      );
      currentThread.participants[currentUserId] += 1;
    }
  });

  return newState;
}

function handleThreadSelectedAction(
  state: StoreData,
  action: ThreadSelectedAction
): StoreData {
  const newStoreState: StoreData = {
    participants: Object.assign({}, state.participants),
    threads: Object.assign({}, state.threads),
    messages: Object.assign({}, state.messages)
  };

  newStoreState.threads[action.payload.selectedThreadId] = Object.assign(
    {},
    state.threads[action.payload.selectedThreadId]
  );

  const currentThread = newStoreState.threads[action.payload.selectedThreadId];
  currentThread.participants = Object.assign({}, currentThread.participants);
  currentThread.participants[action.payload.currentUserId] = 0;

  return newStoreState;
}
