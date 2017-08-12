import { AllUserData } from './../../../shared/to/all-user-data';
import { Action } from '@ngrx/store';

export const LOAD_USER_THREADS_ACTION = 'LOAD_USER_THREADS_ACTION';
export const USER_THREADS_LOADED_ACTION = 'USER_THREADS_LOADED_ACTION';

export class LoadUserThreadsAction implements Action {
  readonly type = LOAD_USER_THREADS_ACTION;

  constructor() {}
}
export class UserThreadsLoadedAction implements Action {
  readonly type = USER_THREADS_LOADED_ACTION;

  constructor(public payload: AllUserData) {}
}
