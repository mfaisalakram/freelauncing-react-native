import {
  CurrentFIR,
  CurrentFIRAction,
  CurrentFIRActions,
  CurrentFIRError,
  CurrentFIRState,
  UserId,
} from './types';

export const setCurrentFIR = (user: UserId): CurrentFIRAction => {
  console.log('data');
  
  return {
    type: CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR,
    payload: {user : user} as CurrentFIRState,
  } as CurrentFIRAction;
};

export const setCurrentFIRSuccess = (currentFir: CurrentFIR[]): CurrentFIRAction => {
  return {
    type: CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR_SUCCESS,
    payload: { currentFir: currentFir } as CurrentFIRState,
  } as CurrentFIRAction;
};

export const setCurrentFIRFailure = (
  error: CurrentFIRError
): CurrentFIRAction => {
  return {
    type: CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as CurrentFIRAction;
};


export const CurrentFIRAC = {
  
  setCurrentFIR,
  setCurrentFIRSuccess,
  setCurrentFIRFailure,
};
