import {
  THREAD_SELECTED_ACTION,
  SELECT_USER_ACTION,
  SelecteUserAction
} from './../actions';
import { Action } from '@ngrx/store';
import { UiState, INITIAL_UI_STATE } from './../ui-state';

export function uiState(
  state: UiState = INITIAL_UI_STATE,
  action: Action
): UiState {
  switch (action.type) {
    case THREAD_SELECTED_ACTION:
        const newState = Object.assign({}, state);
        newState.currentThreadId = action.payload;
        return newState;
    case SELECT_USER_ACTION:
      return handleSelectUserAction(state, <any>action);
    default:
      return state;
  }
}

function handleSelectUserAction(state: UiState, action: SelecteUserAction) {
  const newState = Object.assign({}, state);
  newState.userId = action.payload;
  newState.currentThreadId = undefined;
  return newState;
}
