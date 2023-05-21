import {
  LoginUser,
  LoginUserAction,
  LoginUserActions,
  LoginUserError,
  LoginUserResponse,
  LoginUserState,
} from './types';

export const fetchUserRequest = (user: LoginUser): LoginUserAction => {
  return {
    type: LoginUserActions.ACTION_TYPE_SET_LOGIN_USER,
    payload: { user: user } as LoginUserState,
  } as LoginUserAction;
};

export const loginUserSuccess = (
  response: LoginUserResponse
): LoginUserAction => {
  return {
    type: LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_SUCCESS,
    payload: { response: response } as LoginUserState,
  } as LoginUserAction;
};

export const loginUserFailure = (error: LoginUserError): LoginUserAction => {
  return {
    type: LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as LoginUserAction;
};

export const loginUserClear = (): LoginUserAction => {
  return {
    type: LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_CLEAR,
  } as LoginUserAction;
};

export const LoginUserAC = {
  fetchUserRequest,
  loginUserSuccess,
  loginUserFailure,
  loginUserClear,
};
