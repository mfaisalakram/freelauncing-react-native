import {
  AllActiveServices,
  AllActiveServicesAction,
  AllActiveServicesActions,
  AllActiveServicesState,
} from './types';

const initialFIRState: AllActiveServices = {
  found: false,
  data: [],
} as AllActiveServices;

const initialState: AllActiveServicesState = {
  AllActiveServices: [],
  errorMessage: '',
  pending: false,
  user: {
    token: '',
  },
};

export const AllActiveServicesReducer = (
  state = initialState,
  action: AllActiveServicesAction
): AllActiveServicesState => {
  const payload = action.payload as AllActiveServicesState;
  switch (action.type) {
    case AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERVICES:
      return {
        ...state,
        AllActiveServices: payload.AllActiveServices,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERICES_SUCCESS:
      return {
        ...state,
        AllActiveServices: payload.AllActiveServices,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERICES_FAILURE:
      return {
        ...state,
        AllActiveServices: [],
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
