import {
  GetFIRByCNIC,
  GetFIRByCNICAction,
  GetFIRByCNICActions,
  GetFIRByCNICError,
  GetFIRByCNICState,
  UserId,
} from './types';

export const setGetFIRByCNIC = (user: UserId): GetFIRByCNICAction => {
  console.log('data');
  
  return {
    type: GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC,
    payload: {user : user} as GetFIRByCNICState,
  } as GetFIRByCNICAction;
};

export const setGetFIRByCNICSuccess = (currentFir: GetFIRByCNIC[]): GetFIRByCNICAction => {
  return {
    type: GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC_SUCCESS,
    payload: { currentFir: currentFir } as GetFIRByCNICState,
  } as GetFIRByCNICAction;
};

export const setGetFIRByCNICFailure = (
  error: GetFIRByCNICError
): GetFIRByCNICAction => {
  return {
    type: GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as GetFIRByCNICAction;
};


export const GetFIRByCNICAC = {
  
  setGetFIRByCNIC,
  setGetFIRByCNICSuccess,
  setGetFIRByCNICFailure,
};
