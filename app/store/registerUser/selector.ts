import { AppState } from '../rootReducer';

export const getRegisterUserSelector = (state: AppState) =>
  state.registerUser.user;

export const getRegisterUserPendingSelector = (state: AppState) =>
  state.registerUser.pending;

export const getRegisterUserErrorSelector = (state: AppState) =>
  state.registerUser.errorMessage;
