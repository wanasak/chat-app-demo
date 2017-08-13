import { ThreadSummaryVM } from './thread-summary.vm';
import { Thread } from './../../../shared/model/thread';
import { Observable } from 'rxjs/Observable';
import { LoadUserThreadsAction, ThreadSelectedAction } from './../store/actions';
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
  selector: 'app-thread-section',
  templateUrl: './thread-section.component.html',
  styleUrls: ['./thread-section.component.css']
})
export class ThreadSectionComponent implements OnInit {
  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;
  threadSummaries$: Observable<ThreadSummaryVM[]>;
  currentThreadId$: Observable<number>;

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
    this.currentThreadId$ = store.select(state => state.uiState.currentThreadId);
  }

  ngOnInit() {
    this.store.dispatch(new LoadUserThreadsAction());
  }

  onThreadSelected(threadId: number) {
    this.store.dispatch(new ThreadSelectedAction(threadId));
  }

}
