import {HttpModule} from '@angular/http';
import { LOAD_USER_THREADS_ACTION, LoadUserThreadAction } from './store/actions';
import { INITAL_APPLICATION_STATE, ApplicationState } from './store/application-state';
import { StoreModule, Action } from '@ngrx/store';
import { ThreadService } from './services/thread.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSelectionComponent } from './thread-selection/thread-selection.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

import * as _ from 'lodash';

export function storeReducer(state: ApplicationState, action: Action): ApplicationState {
  switch (action.type) {
    case LOAD_USER_THREADS_ACTION:
      return handleLoadUserThreadsAction(state, <any>action);
  }
  return state;
}

function handleLoadUserThreadsAction(state: ApplicationState, action: LoadUserThreadAction): ApplicationState {
  const userData = action.payload;

  const newState: ApplicationState = Object.assign({}, state);

  newState.storeData = {
    participants: _.keyBy(action.payload.participants, 'id'),
    messages: _.keyBy(action.payload.messages, 'id'),
    threads: _.keyBy(action.payload.threads, 'id')
  };

  return newState;
}

@NgModule({
  declarations: [
    AppComponent,
    UserSelectionComponent,
    ThreadSelectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(storeReducer, INITAL_APPLICATION_STATE)
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
