import { Thread } from './../../../shared/model/thread';
import { dbThreads } from '../db-data';
import * as _ from 'lodash';

export function findThreadById(id: number) {
    const threads: Thread[] = _.values(dbThreads);

    return _.find(threads, thread => thread.id === id);
}
