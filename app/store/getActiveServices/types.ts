export type AllActiveServices = {
  found: boolean;
  data: string[];
};

export type UserId = {
  token: string;
};

export type AllActiveServicesError = {
  errorMessage: string;
};

// State
export interface AllActiveServicesState {
  AllActiveServices: any;
  user: UserId;
  allActiveservices?: AllActiveServices[];
  pending?: boolean;
  errorMessage?: string;
}

// Actionss
export interface AllActiveServicesAction {
  type: string;
  payload: AllActiveServicesState;
}

// Action Types
const ACTION_TYPE_GET_ACTIVE_SERVICES = 'ACTION_TYPE_GET_ACTIVE_SERVICES';
const ACTION_TYPE_GET_ACTIVE_SERICES_SUCCESS =
  'ACTION_TYPE_GET_ACTIVE_SERICES_SUCCESS';
const ACTION_TYPE_GET_ACTIVE_SERICES_FAILURE =
  'ACTION_TYPE_GET_ACTIVE_SERICES_FAILURE';

export const AllActiveServicesActions = {
  ACTION_TYPE_GET_ACTIVE_SERVICES,
  ACTION_TYPE_GET_ACTIVE_SERICES_SUCCESS,
  ACTION_TYPE_GET_ACTIVE_SERICES_FAILURE,
};
