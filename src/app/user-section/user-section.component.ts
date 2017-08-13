import { ApplicationState } from './../store/application-state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { SelecteUserAction } from '../store/actions';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.css']
})
export class UserSectionComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

  onSelectUser(userId: number) {
    this.store.dispatch(new SelecteUserAction(userId));
  }

}
