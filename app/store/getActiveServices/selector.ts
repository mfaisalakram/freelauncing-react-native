import { AppState } from '../rootReducer';

export const getActiveServicesSelector = (state: AppState) =>
  state.setAllActiveServices.allActiveservices;

export const getActiveServicesPendingSelector = (state: AppState) =>
  state.setAllActiveServices.pending;

export const getActiveServicesErrorSelector = (state: AppState) =>
  state.setAllActiveServices.errorMessage;
