import { findThreadById } from '../persistence/findThreadById';
import { dbMessages, dbMessagesQueuePerUser } from './../db-data';
import { Message } from './../../../shared/model/message';
import { Application } from 'express';
import * as _ from 'lodash';

let messageIdCounter = 20;

export function apiSaveNewMessage(app: Application) {
  app.route('/api/threads/:id').post((req, res) => {
    const payload = req.body;

    // tslint:disable-next-line:radix
    const threadId = parseInt(req.params.id),
      // tslint:disable-next-line:radix
      participantId = parseInt(req.headers['userId']);

    const message: Message = {
      id: messageIdCounter++,
      threadId,
      timestamp: new Date().getTime(),
      text: payload.text,
      participantId
    };

    dbMessages[message.id] = message;

    const thread = findThreadById(threadId);
    thread.messageIds.push(message.id);

    const otherParticipantIds = _.keys(thread.participants).filter(
      // tslint:disable-next-line:radix
      id => parseInt(id) !== participantId
    );

    otherParticipantIds.forEach(id => {
        thread.participants[id] += 1;
        dbMessagesQueuePerUser[participantId].push(message.id);
    });

    thread.participants[participantId] = 0;

    res.status(200).send();
  });
}
