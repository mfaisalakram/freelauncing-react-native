// Store

// Basic
export type RegisterUser = {
  username: string;
  fname: string;
  lname: string;
  password: string;
  email: string;
};

export type RegisterUserError = {
  errorMessage: string;
};

// State
export interface RegisterUserState {
  user: RegisterUser;
  pending: boolean;
  errorMessage: string;
}

// Actions
export interface RegisterUserAction {
  type: string;
  payload: RegisterUserState;
}

// Action Types
const ACTION_TYPE_SET_REGISTER_USER = 'ACTION_TYPE_SET_REGISTER_USER';
const ACTION_TYPE_SET_REGISTER_USER_SUCCESS =
  'ACTION_TYPE_SET_REGISTER_USER_SUCCESS';
const ACTION_TYPE_SET_REGISTER_USER_FAILURE =
  'ACTION_TYPE_SET_REGISTER_USER_FAILURE';

export const RegisterUserActions = {
  ACTION_TYPE_SET_REGISTER_USER,
  ACTION_TYPE_SET_REGISTER_USER_SUCCESS,
  ACTION_TYPE_SET_REGISTER_USER_FAILURE,
};
