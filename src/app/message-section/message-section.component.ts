import { UiState } from './../store/ui-state';
import { MessageVM } from './message.vm';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { messageParticipantNamesSelector } from './messageParticipantNamesSelector';
import { messagesSelector } from './messageSelector';
import { SendNewMessageAction } from '../store/actions';

@Component({
  selector: 'app-message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {
  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;
  // currentThreadId: number;
  uiState: UiState;

  constructor(private store: Store<ApplicationState>) {
    this.participantNames$ = store.select(messageParticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
    // store.subscribe(state => this.currentThreadId = state.uiState.currentThreadId);
    store.subscribe(state => (this.uiState = Object.assign({}, state.uiState)));
  }

  ngOnInit() {}

  onNewMessage(input) {
    this.store.dispatch(
      new SendNewMessageAction({
        text: input.value,
        threadId: this.uiState.currentThreadId,
        participantId: this.uiState.userId
      })
    );
    input.value = '';
  }
}
