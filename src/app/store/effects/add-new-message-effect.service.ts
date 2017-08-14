import { SEND_NEW_MESSAGE_ACTION, ErrorOccurredAction } from './../actions';
import { Observable } from 'rxjs/Observable';
import { ThreadService } from './../../services/thread.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

@Injectable()
export class AddNewMessageEffectService {

  constructor(private actions$: Actions, private service: ThreadService) { }

  @Effect() addNewMessage$: Observable<any> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .switchMap(action => this.service.saveNewMessage(action.payload))
    .catch(() => Observable.of(new ErrorOccurredAction('Error Ocurred while saving message')));

}
