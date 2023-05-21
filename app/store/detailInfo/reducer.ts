import {
  GetUserData,
  GetUserDataAction,
  GetUserDataActions,
  GetUserDataState,
} from './types';

const initialUserState: GetUserData = ({
  id: 0,
  username: '',
  fname: '',
  lname: '',
  email: '',
  profile_image: '',
  account_type: '',
  account_status: '',
  current_type: '',
} as unknown) as GetUserData;

const initialState: GetUserDataState = {
  user: initialUserState,
  errorMessage: '',
  pending: false,
  token: '',
};

export const GetUserDataReducer = (
  state = initialState,
  action: GetUserDataAction
): GetUserDataState => {
  const payload = action.payload as GetUserDataState;

  switch (action.type) {
    case GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS:
      return {
        ...state,
        user: payload.user,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS_SUCCESS:
      return {
        ...state,
        user: payload.user,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS_FAILURE:
      return {
        ...state,
        user: initialUserState,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
