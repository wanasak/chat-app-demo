import { SendNewMessageActionPayload } from './../store/actions';
import { AllUserData } from './../../../shared/to/all-user-data';
import {Http} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CommonHttpHeaders } from './commonHttpHeaders';

import 'rxjs/add/operator/map';

@Injectable()
export class ThreadService {

  constructor(private http: Http) { }

  loadUserThreads(userId: number): Observable<AllUserData> {
    return this.http.get('/api/threads', CommonHttpHeaders(userId))
      .map(res => res.json());
  }

  saveNewMessage(payload: SendNewMessageActionPayload): Observable<any> {
    return this.http.post(`/api/threads/${payload.threadId}`,
      JSON.stringify({ text: payload.text }),
      CommonHttpHeaders(payload.participantId));
  }

}
