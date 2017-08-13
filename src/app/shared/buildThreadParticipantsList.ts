import { Thread } from './../../../shared/model/thread';
import { ApplicationState } from './../store/application-state';

import * as _ from 'lodash';

export function buildThreadParticipantsList(state: ApplicationState, thread: Thread): string {
    const names = _.keys(thread.participants)
        .map(id => state.storeData.participants[id].name);

    return _.join(names, ',');
}
