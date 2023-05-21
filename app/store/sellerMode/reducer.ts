import {
  LoginUser,
  LoginUserAction,
  LoginUserActions,
  LoginUserResponse,
  LoginUserState,
} from './types';

const initialUserState: LoginUser = {
  email: '',
  password: '',
} as LoginUser;

const initialUserResponseState: LoginUserResponse = ({
  token: '',
  found: '',
} as unknown) as LoginUserResponse;

const initialState: LoginUserState = {
  user: initialUserState,
  errorMessage: '',
  pending: false,
  response: initialUserResponseState,
};

export const LoginUserReducer = (
  state = initialState,
  action: LoginUserAction
): LoginUserState => {
  switch (action.type) {
    case LoginUserActions.ACTION_TYPE_SET_LOGIN_USER:
      return {
        ...state,
        response: action.payload.response,
        errorMessage: action.payload.errorMessage || '',
        pending: true,
      };
    case LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_SUCCESS:
      return {
        ...state,
        response: action.payload.response,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    case LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_FAILURE:
      return {
        ...state,
        response: initialUserResponseState,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    case LoginUserActions.ACTION_TYPE_SET_LOGIN_USER_CLEAR:
      return {
        ...state,
        response: initialUserResponseState,
        errorMessage: '',
        pending: false,
      };
    default:
      return state;
  }
};
