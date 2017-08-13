import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  LOAD_USER_THREADS_ACTION,
  UserThreadsLoadedAction,
  SELECT_USER_ACTION,
  LoadUserThreadsAction
} from './../actions';
import { ThreadService } from './../../services/thread.service';
import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

@Injectable()
export class ThreadEffectService {

  constructor(private actions$: Actions, private service: ThreadService ) { }

  @Effect() userThreads: Observable<Action> = this.actions$
    .ofType(LOAD_USER_THREADS_ACTION)
    .switchMap(action => this.service.loadUserThreads(action.payload))
    .map(allUserData => new UserThreadsLoadedAction(allUserData));

  @Effect() userSelected: Observable<Action> = this.actions$
    .ofType(SELECT_USER_ACTION)
    .map(action => new LoadUserThreadsAction(action.payload));

}
