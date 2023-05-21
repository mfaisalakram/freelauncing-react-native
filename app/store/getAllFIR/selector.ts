import { AppState } from '../rootReducer';

export const getALLFIRSelector = (state: AppState) => state.getAllFIR.allFIR;

export const getALLFIRPendingSelector = (state: AppState) =>
  state.getAllFIR.pending;

export const getALLFIRErrorSelector = (state: AppState) =>
  state.getAllFIR.errorMessage;
