import { dbThreads } from './../db-data';
import { Thread } from './../../../shared/model/thread';
import { Application } from 'express';
import * as _ from 'lodash';

export function apiUpdateThread(app: Application) {
    app.route('/api/threads/:id').patch((req, res) => {
        const participantId = req.headers['userId'];

        const threadId = req.params['id'];

        const updatedProps = req.body;

        const allThreads: Thread[] = _.values(dbThreads);

        // tslint:disable-next-line:no-shadowed-variable
        const thread = _.find(allThreads, thread => thread.id === threadId);

        if (updatedProps.hasOwnProperty('read')) {
            thread.participants[participantId] = 0;
        }

        res.status(200).send();
    });
}
