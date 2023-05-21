import { AppState } from '../rootReducer';

export const getRegisterFIRSelector = (state: AppState) =>
  state.registerFIR.user;

export const getRegisterFIRPendingSelector = (state: AppState) =>
  state.registerFIR.pending;

export const getRegisterFIRErrorSelector = (state: AppState) =>
  state.registerFIR.errorMessage;
