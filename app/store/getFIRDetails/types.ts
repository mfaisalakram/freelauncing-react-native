export type FIRDetails = {
  title: string,
  location: string,
  district: string,
  police_station: string,
  catagory: string,
  datetime: string,
  mobile_number: number,
  description: string,
  is_seen: Boolean,
  username: string,
  created_by: string,
  cnic_number: string
};

export type UserId ={
  token : string;
  user_id:number;
}

export type FIRDetailsError = {
  errorMessage: string;
};

// State
export interface FIRDetailsState {
  user:UserId;
  FIRDetails?: FIRDetails;
  pending?: boolean;
  errorMessage?: string;
}

// Actions
export interface FIRDetailsAction {
  type: string;
  payload: FIRDetailsState;
}

// Action Types
const ACTION_TYPE_GET_FIR_DETAILS = 'ACTION_TYPE_GET_FIR_DETAILS';
const ACTION_TYPE_GET_FIR_DETAILS_SUCCESS =
  'ACTION_TYPE_GET_FIR_DETAILS_SUCCESS';
const ACTION_TYPE_GET_FIR_DETAILS_FAILURE =
  'ACTION_TYPE_GET_FIR_DETAILS_FAILURE';

export const FIRDetailsActions = {
  ACTION_TYPE_GET_FIR_DETAILS,
  ACTION_TYPE_GET_FIR_DETAILS_SUCCESS,
  ACTION_TYPE_GET_FIR_DETAILS_FAILURE,
};
