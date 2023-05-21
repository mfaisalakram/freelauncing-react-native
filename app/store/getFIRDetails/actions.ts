import {
  FIRDetails,
  FIRDetailsAction,
  FIRDetailsActions,
  FIRDetailsError,
  FIRDetailsState,
  UserId,
} from './types';

export const setFIRDetails = (user: UserId): FIRDetailsAction => {
  
  return {
    type: FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS,
    payload: {user : user} as FIRDetailsState,
  } as FIRDetailsAction;
};

export const setFIRDetailsSuccess = (FIRDetails: FIRDetails): FIRDetailsAction => {
  return {
    type: FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS_SUCCESS,
    payload: { FIRDetails: FIRDetails } as FIRDetailsState,
  } as FIRDetailsAction;
};

export const setFIRDetailsFailure = (
  error: FIRDetailsError
): FIRDetailsAction => {
  return {
    type: FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as FIRDetailsAction;
};


export const FIRDetailsAC = {
  
  setFIRDetails,
  setFIRDetailsSuccess,
  setFIRDetailsFailure,
};
