import {
  RegisterFIR,
  RegisterFIRAction,
  RegisterFIRActions,
  RegisterFIRError,
  RegisterFIRState,
} from './types';

export const setRegisterFIR = (user: RegisterFIRState): RegisterFIRAction => {
  return {
    type: RegisterFIRActions.ACTION_TYPE_REGISTER_FIR,
    payload: user,
  } as RegisterFIRAction;
};

export const setRegisterFIRSuccess = (
  user: RegisterFIR,
): RegisterFIRAction => {
  return {
    type: RegisterFIRActions.ACTION_TYPE_REGISTER_FIR_SUCCESS,
    payload: { user: user } as RegisterFIRState,
  } as RegisterFIRAction;
};

export const setRegisterFIRFailure = (
  error: RegisterFIRError,
): RegisterFIRAction => {
  return {
    type: RegisterFIRActions.ACTION_TYPE_REGISTER_FIR_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as RegisterFIRAction;
};

export const RegisterFIRAC = {
  setRegisterFIR,
  setRegisterFIRSuccess,
  setRegisterFIRFailure,
};
