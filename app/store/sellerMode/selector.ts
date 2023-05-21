import { AppState } from '../rootReducer';

export const getLoginUserSelector = (state: AppState) => state.user.response;

export const getLoginUserPendingSelector = (state: AppState) =>
  state.user.pending;

export const getLoginUserErrorSelector = (state: AppState) =>
  state.user.errorMessage;
