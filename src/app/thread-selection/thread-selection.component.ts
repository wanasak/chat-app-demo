import { ThreadSummaryVM } from './thread-summary.vm';
import { Thread } from './../../../shared/model/thread';
import { Observable } from 'rxjs/Observable';
import { LoadUserThreadAction } from './../store/actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/skip';
import * as _ from 'lodash';
import { mapStoreToUsername } from './mapStoreToUsername';
import { mapStateToUnreadMessageCounter } from './mapStateToUnreadMessageCounter';

@Component({
  selector: 'app-thread-selection',
  templateUrl: './thread-selection.component.html',
  styleUrls: ['./thread-selection.component.css']
})
export class ThreadSelectionComponent implements OnInit {
  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;

  constructor(
    private threadService: ThreadService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip(1)
      .map(mapStoreToUsername);
    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(mapStateToUnreadMessageCounter);
    this.threadSummaries$ = store.select(state => {

      const threads = _.values<Thread>(state.storeData.threads);

      return threads.map(thread => {

        const names = _.keys(thread.participants)
          .map(participantId => state.storeData.participants[participantId].name);

        const lastMessageId = _.last(thread.messageIds);

        return {
          id: thread.id,
          participantNames: _.join(names, ','),
          lastMessageText: state.storeData.messages[lastMessageId].text
        };

      });

    });
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => {
        this.store.dispatch(new LoadUserThreadAction(allUserData));
      });
  }
}
