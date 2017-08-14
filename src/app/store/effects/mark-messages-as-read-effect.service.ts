import { THREAD_SELECTED_ACTION, ThreadSelectedAction } from './../actions';
import { Observable } from 'rxjs/Observable';
import { ThreadService } from './../../services/thread.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class MarkMessagesAsReadEffectService {

  constructor(private actions$: Actions, private service: ThreadService) { }

  @Effect() markMessageAsRead$: Observable<any> = this.actions$
    .ofType(THREAD_SELECTED_ACTION)
    .switchMap((action: ThreadSelectedAction) =>
      this.service.markMessagesAsRead(action.payload.currentUserId, action.payload.selectedThreadId));

}
