export interface UiState {
    userId: number;
    currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
    // prefer to use undefined instead of null
    userId: 1,
    currentThreadId: undefined
};
