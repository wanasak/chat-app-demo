import { SEND_NEW_MESSAGE_ACTION } from './../actions';
import { Observable } from 'rxjs/Observable';
import { ThreadService } from './../../services/thread.service';
import { Actions, Effect } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class AddNewMessageEffectService {

  constructor(private actions$: Actions, private service: ThreadService) { }

  @Effect({ dispatch: false }) addNewMessage$: Observable<any> = this.actions$
    .ofType(SEND_NEW_MESSAGE_ACTION)
    .switchMap(action => this.service.saveNewMessage(action.payload));

}
