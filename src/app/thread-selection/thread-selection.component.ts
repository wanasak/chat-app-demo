import { ThreadSummaryVM } from './thread-summary.vm';
import { Thread } from './../../../shared/model/thread';
import { Observable } from 'rxjs/Observable';
import { LoadUserThreadsAction } from './../store/actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/skip';
import * as _ from 'lodash';
import { userNameSelector } from './userNameSelector';
import { unreadMessageCounterSelector } from './unreadMessageCounterSelector';
import { stateToThreadSummariesSelector } from './stateToThreadSummariesSelector';

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
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip(1)
      .map(userNameSelector);
    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(unreadMessageCounterSelector);
    this.threadSummaries$ = store.select(stateToThreadSummariesSelector);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }
}
