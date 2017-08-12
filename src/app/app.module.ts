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
import { UserSelectionComponent } from './user-selection/user-selection.component';
import { ThreadSelectionComponent } from './thread-selection/thread-selection.component';
import { MessageSectionComponent } from './message-section/message-section.component';
import { ThreadListComponent } from './thread-list/thread-list.component';
import { MessageListComponent } from './message-list/message-list.component';

import * as _ from 'lodash';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeData } from './store/reducers/storeDataReducer';
import { uiState } from './store/reducers/uiStateReducer';

export function storeReducer(
  state: ApplicationState,
  action: Action
): ApplicationState {
  return {
    uiState: uiState(state.uiState, action),
    storeData: storeData(state.storeData, action)
  };
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
    StoreModule.provideStore(combineReducers({uiState, storeData}), INITAL_APPLICATION_STATE),
    EffectsModule.run(ThreadEffectService),
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ],
  providers: [ThreadService],
  bootstrap: [AppComponent]
})
export class AppModule {}
