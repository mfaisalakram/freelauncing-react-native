import {
  RegisterUser,
  RegisterUserAction,
  RegisterUserActions,
  RegisterUserState,
} from './types';

const initialUserState: RegisterUser = {
  username: '',
  password: '',
  email: '',
  first_name: '',
  last_name: '',} as RegisterUser;

const initialState: RegisterUserState = {
  user: initialUserState,
  errorMessage: '',
  pending: false,
};

export const registerUserReducer = (
  state = initialState,
  action: RegisterUserAction,
): RegisterUserState => {
  switch (action.type) {
    case RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER:
      return {
        ...state,
        ...action.payload,
        pending: true,
      };
    case RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER_SUCCESS:
      return {
        ...state,
        user: action.payload.user || initialUserState,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    case RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER_FAILURE:
      return {
        ...state,
        user: initialUserState,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
