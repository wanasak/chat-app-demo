import { dbMessagesQueuePerUser, dbMessages } from './../db-data';
import { Application } from 'express';

export function apiMessageNotificationsPerUser(app: Application) {
    app.route('/api/notifications/messages').post((req, res) => {
        const participantId = req.headers['userId'];

        if (!participantId) {
            res.status(200).json({payload: []});
            return;
        }

        const unreadMessageIds = dbMessagesQueuePerUser[participantId];

        const unreadMessages = unreadMessageIds.map(id => dbMessages[id]);

        dbMessagesQueuePerUser[participantId] = [];

        res.status(200).json({payload: unreadMessages});
    });
}
