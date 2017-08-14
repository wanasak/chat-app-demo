import { UiState } from './../ui-state';
import { ApplicationState } from './../application-state';
import { ReceivedMessageAction } from './../actions';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ThreadService } from './../../services/thread.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { RECEIVED_MESSAGE_ACTION } from '../actions';

import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/filter';

@Injectable()
export class RefreshMessageService {

  constructor(private service: ThreadService, private state: Store<ApplicationState>) { }

  @Effect() newMessages$ = Observable.interval(3000)
    .withLatestFrom(this.state.select('uiState'))
    .map(([any, uiState]) => uiState)
    .filter((uiState: any) => uiState.userId)
    .switchMap(uiState => this.service.loadNewMessagesForUser(uiState.userId))
    .map(messages => new ReceivedMessageAction(messages));

}
