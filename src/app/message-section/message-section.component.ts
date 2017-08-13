import { MessageVM } from './message.vm';
import { Store } from '@ngrx/store';
import { ApplicationState } from './../store/application-state';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { messageParticipantNamesSelector } from './messageParticipantNamesSelector';
import { messagesSelector } from './messageSelector';

@Component({
  selector: 'app-message-section',
  templateUrl: './message-section.component.html',
  styleUrls: ['./message-section.component.css']
})
export class MessageSectionComponent implements OnInit {

  participantNames$: Observable<string>;
  messages$: Observable<MessageVM[]>;

  constructor(private store: Store<ApplicationState>) {
    this.participantNames$ = store.select(messageParticipantNamesSelector);
    this.messages$ = store.select(messagesSelector);
  }

  ngOnInit() {
  }

}
