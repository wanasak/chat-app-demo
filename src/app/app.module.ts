import {storeFreeze} from 'ngrx-store-freeze';
import { MarkMessagesAsReadEffectService } from './store/effects/mark-messages-as-read-effect.service';
import { RefreshMessageService } from './store/effects/refresh-message.service';
import { AddNewMessageEffectService } from './store/effects/add-new-message-effect.service';
import { StoreData, INITAL_STORE_DATA } from './store/store-data';
import { UiState, INITIAL_UI_STATE } from './store/ui-state';
import { ThreadEffectService } from './store/effects/thread-effect.service';
import { HttpModule } from '@angular/http';
import {
  UserThreadsLoadedAction,
  USER_THREADS_LOADED_ACTION
} from './store/actions';
import {
  INITAL_APPLICATION_STATE,
  ApplicationState
} from './store/application-state';
import { StoreModule, Action, combineReducers } from '@ngrx/store';
import { ThreadService } from './services/thread.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UserSectionComponent } from './user-section/user-section.component';
import { ThreadSectionComponent } from './thread-section/thread-section.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

import * as _ from 'lodash';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeData } from './store/reducers/storeDataReducer';
import { uiState } from './store/reducers/uiStateReducer';
import { MessageErrorComponent } from './message-error/message-error.component';
import { compose } from '@ngrx/core';

// export function storeReducer(
//   state: ApplicationState,
//   action: Action
// ): ApplicationState {
//   return {
//     uiState: uiState(state.uiState, action),
//     storeData: storeData(state.storeData, action)
//   };
// }

const reducers = {
  uiState,
  storeData
};

const combinedReducer = compose(storeFreeze, combineReducers)(reducers);

export function storeReducer(state: ApplicationState, action: Action) {
  return combinedReducer(state, action);
}

@NgModule({
  declarations: [
    AppComponent,
    UserSectionComponent,
    ThreadSectionComponent,
    MessageSectionComponent,
    ThreadListComponent,
    MessageListComponent,
    MessageErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    StoreModule.provideStore(storeReducer, INITAL_APPLICATION_STATE),
    EffectsModule.run(ThreadEffectService),
    EffectsModule.run(AddNewMessageEffectService),
    EffectsModule.run(RefreshMessageService),
    EffectsModule.run(MarkMessagesAsReadEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule {}
