import {createSelector} from 'reselect/lib';
import { Participant } from './../../../shared/model/participant';
import { Message } from './../../../shared/model/message';
import { ApplicationState } from './../store/application-state';
import { MessageVM } from './message.vm';

import * as _ from 'lodash';

export const messagesSelector = createSelector(getParticipants, getMessageForCurrentThread, mapMessagesToMessageVM);

function getMessageForCurrentThread(state: ApplicationState): Message[] {
    const currentThread = state.storeData.threads[state.uiState.currentThreadId];
    return currentThread ? currentThread.messageIds.map(id => state.storeData.messages[id]) : [];
}

function getParticipants(state: ApplicationState) {
    return state.storeData.participants;
}

function mapMessagesToMessageVM(participants: {[key: number]: Participant}, messages: Message[]) {
    return messages.map(msg => mapMessageToMessageVM(participants, msg));
}

function mapMessageToMessageVM(participants: {[key: number]: Participant}, message: Message): MessageVM {
    return {
        id: message.id,
        text: message.text,
        timestamp: message.timestamp,
        participantName: participants[message.participantId].name
    };
}
