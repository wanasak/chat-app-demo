import { Thread } from './../../../shared/model/thread';
import { Observable } from 'rxjs/Observable';
import { LoadUserThreadAction } from './../store/actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/skip';
import * as _ from 'lodash';

@Component({
  selector: 'app-thread-selection',
  templateUrl: './thread-selection.component.html',
  styleUrls: ['./thread-selection.component.css']
})
export class ThreadSelectionComponent implements OnInit {
  userName$: Observable<string>;
  unreadMessagesCounter$: Observable<number>;

  constructor(
    private threadService: ThreadService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip(1)
      .map(this.mapStoreToUsername);
    this.unreadMessagesCounter$ = store
      .skip(1)
      .map(this.mapStateToUnreadMessageCounter);
  }

  private mapStoreToUsername(state: ApplicationState): string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  private mapStateToUnreadMessageCounter(state: ApplicationState): number {
    const currentUserId = state.uiState.userId;

    return _.values<Thread>(state.storeData.threads)
      .reduce((acc, thread) => acc + thread.participants[currentUserId], 0);
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => {
        this.store.dispatch(new LoadUserThreadAction(allUserData));
      });
  }
}
