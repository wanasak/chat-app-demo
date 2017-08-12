import { Observable } from 'rxjs/Observable';
import { LoadUserThreadAction } from './../store/actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

import 'rxjs/add/operator/skip';

@Component({
  selector: 'app-thread-selection',
  templateUrl: './thread-selection.component.html',
  styleUrls: ['./thread-selection.component.css']
})
export class ThreadSelectionComponent implements OnInit {
  userName$: Observable<string>;

  constructor(
    private threadService: ThreadService,
    private store: Store<ApplicationState>
  ) {
    this.userName$ = store
      .skip(1)
      .map(this.mapStoreToUsername);
  }

  private mapStoreToUsername(state: ApplicationState): string {
    return state.storeData.participants[state.uiState.userId].name;
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => {
        this.store.dispatch(new LoadUserThreadAction(allUserData));
      });
  }
}
