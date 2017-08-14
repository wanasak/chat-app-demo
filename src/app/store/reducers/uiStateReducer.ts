import {
  THREAD_SELECTED_ACTION,
  SELECT_USER_ACTION,
  SelecteUserAction,
  ERROR_OCCURED_ACTION,
  ErrorOccurredAction
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
        newState.currentThreadId = action.payload.selectedThreadId;
        return newState;
    case SELECT_USER_ACTION:
      return handleSelectUserAction(state, <any>action);
    case ERROR_OCCURED_ACTION:
      return handleErrorOccuredAction(state, <any>action);
    default:
      return state;
  }
}

export function handleSelectUserAction(state: UiState, action: SelecteUserAction) {
  // We can use Object.assign in this case because there is only primitive property
  const newState = Object.assign({}, state);
  newState.userId = action.payload;
  newState.currentThreadId = undefined;
  return newState;
}

function handleErrorOccuredAction(state: UiState, action: ErrorOccurredAction) {
  const newState = Object.assign({}, state);
  newState.errorMessage = action.payload;
  return newState;
}
