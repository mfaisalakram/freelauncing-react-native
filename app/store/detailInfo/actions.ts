import {
  GetUserData,
  GetUserDataAction,
  GetUserDataActions,
  GetUserDataError,
  GetUserDataState,
} from './types';

export const currentUserDetails = (
  user: GetUserDataState
): GetUserDataAction => {
  return {
    type: GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS,
    payload: user,
  } as GetUserDataAction;
};

export const GetUserDataSuccess = (user: GetUserData): GetUserDataAction => {
  return {
    type: GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS_SUCCESS,
    payload: { user: user } as GetUserDataState,
  } as GetUserDataAction;
};

export const GetUserDataFailure = (
  error: GetUserDataError
): GetUserDataAction => {
  return {
    type: GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as GetUserDataAction;
};

export const GetUserDataAC = {
  currentUserDetails,
  GetUserDataSuccess,
  GetUserDataFailure,
};
