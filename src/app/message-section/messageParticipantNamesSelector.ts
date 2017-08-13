import { ApplicationState } from './../store/application-state';

import * as _ from 'lodash';
import { buildThreadParticipantsList } from '../shared/buildThreadParticipantsList';

export function messageParticipantNamesSelector(state: ApplicationState): string {

    const currentThreadId = state.uiState.currentThreadId;

    if (!currentThreadId) {
        return '';
    }

    const currentThread = state.storeData.threads[currentThreadId];

    return buildThreadParticipantsList(state, currentThread);
}
