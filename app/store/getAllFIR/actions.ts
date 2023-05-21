import {
  AllFIR,
  AllFIRAction,
  AllFIRActions,
  AllFIRError,
  AllFIRState,
  UserId,
} from './types';

export const setAllFIR = (user: UserId): AllFIRAction => {
  console.log('data');
  
  return {
    type: AllFIRActions.ACTION_TYPE_GET_ALL_FIR,
    payload: {user : user} as AllFIRState,
  } as AllFIRAction;
};

export const setAllFIRSuccess = (allFIR: AllFIR[]): AllFIRAction => {
  return {
    type: AllFIRActions.ACTION_TYPE_GET_ALL_FIR_SUCCESS,
    payload: { allFIR: allFIR } as AllFIRState,
  } as AllFIRAction;
};

export const setAllFIRFailure = (
  error: AllFIRError
): AllFIRAction => {
  return {
    type: AllFIRActions.ACTION_TYPE_GET_ALL_FIR_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as AllFIRAction;
};


export const AllFIRAC = {
  
  setAllFIR,
  setAllFIRSuccess,
  setAllFIRFailure,
};
