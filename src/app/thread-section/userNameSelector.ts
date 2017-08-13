import { ApplicationState } from './../store/application-state';

export function userNameSelector(state: ApplicationState): string {
  const currentuserId = state.uiState.userId,
    currentParticipant = state.storeData.participants[currentuserId];

  // tslint:disable-next-line:curly
  if (!currentParticipant) return '';

  return currentParticipant.name;
}
