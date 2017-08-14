import {buildThreadParticipantsList} from '../shared/buildThreadParticipantsList';
import { ThreadSummaryVM } from './thread-summary.vm';
import { Thread } from './../../../shared/model/thread';
import { ApplicationState } from './../store/application-state';

import * as _ from 'lodash';

export function stateToThreadSummariesSelector(state: ApplicationState) {
  const threads = _.values<Thread>(state.storeData.threads);
  return threads.map(_.partial(mapThreadToThreadSummary, state));
}

function mapThreadToThreadSummary(
  state: ApplicationState,
  thread: Thread
): ThreadSummaryVM {
  const lastMessageId = _.last(thread.messageIds),
    lastMessage = state.storeData.messages[lastMessageId];

  return {
    id: thread.id,
    participantNames: buildThreadParticipantsList(state, thread),
    lastMessageText: lastMessage.text,
    timestamp: lastMessage.timestamp,
    read: thread.id === state.uiState.currentThreadId || thread.participants[state.uiState.userId] === 0
  };
}
