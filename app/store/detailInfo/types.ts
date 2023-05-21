export type GetUserData = {
  id: number;
  username: string;
  lname: string;
  fname: string;
  email: string;
  profile_image: string;
  account_type: string;
  account_status: string;
  current_type: string;
};

export type GetUserDataError = {
  errorMessage: string;
};

// State
export interface GetUserDataState {
  user: GetUserData;
  pending: boolean;
  token: string;
  errorMessage: string;
}

// Actions
export interface GetUserDataAction {
  type: string;
  payload: GetUserDataState;
}

// Action Types
const ACTION_TYPE_GET_USER_DETAILS = 'ACTION_TYPE_GET_USER_DETAILS';
const ACTION_TYPE_GET_USER_DETAILS_SUCCESS =
  'ACTION_TYPE_GET_USER_DETAILS_SUCCESS';
const ACTION_TYPE_GET_USER_DETAILS_FAILURE =
  'ACTION_TYPE_GET_USER_DETAILS_FAILURE';

export const GetUserDataActions = {
  ACTION_TYPE_GET_USER_DETAILS,
  ACTION_TYPE_GET_USER_DETAILS_SUCCESS,
  ACTION_TYPE_GET_USER_DETAILS_FAILURE,
};
