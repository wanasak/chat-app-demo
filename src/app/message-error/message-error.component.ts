import { UiState } from './../store/ui-state';
import { ApplicationState } from './../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-message-error',
  templateUrl: './message-error.component.html',
  styleUrls: ['./message-error.component.css']
})
export class MessageErrorComponent {

  message: string;

  constructor(private store: Store<ApplicationState>) {
    this.store.select<UiState>('uiState')
      .subscribe(uiState => this.message = uiState ? uiState.errorMessage : undefined);
  }

  close() {
    this.message = '';
  }

}
