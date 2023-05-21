import {
  RegisterUser,
  RegisterUserAction,
  RegisterUserActions,
  RegisterUserError,
  RegisterUserState,
} from './types';

export const setRegisterUser = (user: RegisterUser): RegisterUserAction => {
  return {
    type: RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER,
    payload: { user: user } as RegisterUserState,
  } as RegisterUserAction;
};

export const setRegisterUserSuccess = (
  user: RegisterUser,
): RegisterUserAction => {
  return {
    type: RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER_SUCCESS,
    payload: { user: user } as RegisterUserState,
  } as RegisterUserAction;
};

export const setRegisterUserFailure = (
  error: RegisterUserError,
): RegisterUserAction => {
  return {
    type: RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as RegisterUserAction;
};

export const RegisterUserAC = {
  setRegisterUser,
  setRegisterUserSuccess,
  setRegisterUserFailure,
};
