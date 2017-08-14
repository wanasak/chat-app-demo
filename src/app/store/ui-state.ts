export interface UiState {
    userId: number;
    currentThreadId: number;
    errorMessage?: string;
}

export const INITIAL_UI_STATE: UiState = {
    // prefer to use undefined instead of null
    userId: undefined,
    currentThreadId: undefined
};
