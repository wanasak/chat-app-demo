export interface UiState {
    userId: number;
    currentThreadId: number;
}

export const INITIAL_UI_STATE: UiState = {
    // prefer to use undefined instead of nul
    userId: undefined,
    currentThreadId: undefined
};
