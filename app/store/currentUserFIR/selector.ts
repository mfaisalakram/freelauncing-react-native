import { AppState } from '../rootReducer';

export const getCurrentFIRSelector = (state: AppState) => state.currentUserFIR.currentFir;

export const getCurrentFIRPendingSelector = (state: AppState) =>
  state.currentUserFIR.pending;

export const getCurrentFIRErrorSelector = (state: AppState) =>
  state.currentUserFIR.errorMessage;
