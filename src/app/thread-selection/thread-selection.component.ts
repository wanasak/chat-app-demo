import { LoadUserThreadAction } from './../store/actions';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { ThreadService } from './../services/thread.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-thread-selection',
  templateUrl: './thread-selection.component.html',
  styleUrls: ['./thread-selection.component.css']
})
export class ThreadSelectionComponent implements OnInit {
  constructor(
    private threadService: ThreadService,
    private store: Store<ApplicationState>
  ) {
    store.subscribe(console.log);
  }

  ngOnInit() {
    this.threadService.loadUserThreads()
      .subscribe(allUserData => {
        this.store.dispatch(new LoadUserThreadAction(allUserData));
      });
  }
}
