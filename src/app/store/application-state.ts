import { StoreData, INITAL_STORE_DATA } from './store-data';
import { UiState, INITIAL_UI_STATE } from './ui-state';

export interface ApplicationState {
    uiState: UiState;
    storeData: StoreData;
}

export const INITAL_APPLICATION_STATE: ApplicationState = {
    uiState: INITIAL_UI_STATE,
    storeData: INITAL_STORE_DATA
};
