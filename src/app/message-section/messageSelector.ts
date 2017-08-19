import { createSelector } from 'reselect/lib';
import { Participant } from './../../../shared/model/participant';
import { Message } from './../../../shared/model/message';
import { ApplicationState } from './../store/application-state';
import { MessageVM } from './message.vm';

import * as _ from 'lodash';

export const messagesSelector = createSelector(
  getParticipants,
  getMessageForCurrentThread,
  mapMessagesToMessageVM
);

function getMessageForCurrentThread(state: ApplicationState): Message[] {
  const currentThread = state.storeData.threads[state.uiState.currentThreadId];
  return currentThread
    ? currentThread.messageIds.map(id => state.storeData.messages[id])
    : [];
}

function getParticipants(state: ApplicationState) {
  return state.storeData.participants;
}

function mapMessagesToMessageVM(
  participants: { [key: number]: Participant },
  messages: Message[]
) {
  return messages.map(msg => {
    const participantName = participants[msg.participantId].name;
    return mapMessageToMessageVM(participantName, msg);
  });
}

// memoized is a process to cache the result which is the same as last calculation
const mapMessageToMessageVM = _.memoize((
  participantName: string,
  message: Message
) => {
  return {
    id: message.id,
    text: message.text,
    timestamp: message.timestamp,
    participantName: participantName
  };
},
    // Define a key for memoized
    (participantName: string, message: Message) => message.id + participantName
);
