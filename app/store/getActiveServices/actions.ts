import {
  AllActiveServices,
  AllActiveServicesAction,
  AllActiveServicesActions,
  AllActiveServicesState,
  AllActiveServicesError,
  UserId,
} from './types';

export const setActiveServices = (user: UserId): AllActiveServicesAction => {
  return {
    type: AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERVICES,
    payload: { user: user } as AllActiveServicesState,
  } as AllActiveServicesAction;
};

export const setActiveServicesSuccess = (
  AllActiveServices: AllActiveServices[]
): AllActiveServicesAction => {
  return {
    type: AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERICES_SUCCESS,
    payload: ({
      AllActiveServices: AllActiveServices,
    } as unknown) as AllActiveServicesState,
  } as AllActiveServicesAction;
};

export const setActiveServicesFailure = (
  error: AllActiveServicesError
): AllActiveServicesAction => {
  return {
    type: AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERICES_FAILURE,
    payload: { errorMessage: error.errorMessage },
  } as AllActiveServicesAction;
};

export const ActiveServicesAC = {
  setActiveServices,
  setActiveServicesFailure,
  setActiveServicesSuccess,
};
