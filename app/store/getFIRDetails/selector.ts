import { AppState } from '../rootReducer';

export const getFIRDetailSelector = (state: AppState) => state.firDetail.FIRDetails;

export const getFIRDetailPendingSelector = (state: AppState) =>
  state.firDetail.pending;

export const getFIRDetailErrorSelector = (state: AppState) =>
  state.firDetail.errorMessage;
