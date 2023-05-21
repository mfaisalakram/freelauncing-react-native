import { AppState } from '../rootReducer';

export const getFIRByCNICSelector = (state: AppState) => state.getFIRbycnic.currentFir;

export const getFIRByCNICPendingSelector = (state: AppState) =>
  state.getFIRbycnic.pending;

export const getFIRByCNICErrorSelector = (state: AppState) =>
  state.getFIRbycnic.errorMessage;
