// Store

// Request
// curl -X 'POST' \
//   'https://fb1d-103-255-5-253.ngrok.io/api/v1/login/access-token' \
//   -H 'accept: application/json' \
//   -H 'Content-Type: application/x-www-form-urlencoded' \
//   -d 'grant_type=&username=alihassan4197%40gmail.com&password=1234&scope=&client_id=&client_secret='

// Response
// {
//   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbGloYXNzYW40MTk3QGdtYWlsLmNvbSIsInNjb3BlcyI6ImNvYWNoIn0.4gEKKDvm7ybRFuvAqee6L-HpQKKBmB5EMUHTpUoSn-Y",
//   "token_type": "bearer"
// }

// Basic
export type LoginUser = {
  email: string;
  password: string;
};

export type LoginUserResponse = {
  found: boolean;
  token: string;
};

export type LoginUserError = {
  errorMessage: string;
};

// State
export interface LoginUserState {
  user: LoginUser;
  response: LoginUserResponse;
  pending: boolean;
  errorMessage: string;
}

// Actions
export interface LoginUserAction {
  type: string;
  payload: LoginUserState;
}

// Action Types
const ACTION_TYPE_SET_LOGIN_USER = 'ACTION_TYPE_SET_LOGIN_USER';
const ACTION_TYPE_SET_LOGIN_USER_SUCCESS = 'ACTION_TYPE_SET_LOGIN_USER_SUCCESS';
const ACTION_TYPE_SET_LOGIN_USER_FAILURE = 'ACTION_TYPE_SET_LOGIN_USER_FAILURE';
const ACTION_TYPE_SET_LOGIN_USER_CLEAR = 'ACTION_TYPE_SET_LOGIN_USER_CLEAR';

export const LoginUserActions = {
  ACTION_TYPE_SET_LOGIN_USER,
  ACTION_TYPE_SET_LOGIN_USER_SUCCESS,
  ACTION_TYPE_SET_LOGIN_USER_FAILURE,
  ACTION_TYPE_SET_LOGIN_USER_CLEAR,
};
