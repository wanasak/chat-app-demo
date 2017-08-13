import { Thread } from './../../../shared/model/thread';
import { ApplicationState } from './../store/application-state';

import * as _ from 'lodash';

export function stateToThreadSummariesSelector(state: ApplicationState) {
  const threads = _.values<Thread>(state.storeData.threads);

  return threads.map(thread => {
    const names = _.keys(thread.participants).map(
      participantId => state.storeData.participants[participantId].name
    );

    const lastMessageId = _.last(thread.messageIds),
      lastMessage = state.storeData.messages[lastMessageId];

    return {
      id: thread.id,
      participantNames: _.join(names, ','),
      lastMessageText: lastMessage.text,
      timestamp: lastMessage.timestamp
    };
  });
}
