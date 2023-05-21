import { AppState } from '../rootReducer';

export const getUserDetailsSelector = (state: AppState) => state.userInfo.user;

export const getUserDetailsPendingSelector = (state: AppState) =>
  state.userInfo.pending;

export const getUserDetailsErrorSelector = (state: AppState) =>
  state.userInfo.errorMessage;
