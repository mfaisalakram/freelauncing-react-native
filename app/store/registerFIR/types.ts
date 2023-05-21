// Store

// Basic
export type RegisterFIR = {
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
  user:number
};

export type RegisterFIRError = {
  errorMessage: string;
};

// State
export interface RegisterFIRState {
  user: RegisterFIR;
  pending: boolean;
  token: string
  errorMessage: string;
}

// Actions
export interface RegisterFIRAction {
  type: string;
  payload: RegisterFIRState;
}

// Action Types
const ACTION_TYPE_REGISTER_FIR = 'ACTION_TYPE_REGISTER_FIR';
const ACTION_TYPE_REGISTER_FIR_SUCCESS =
  'ACTION_TYPE_REGISTER_FIR_SUCCESS';
const ACTION_TYPE_REGISTER_FIR_FAILURE =
  'ACTION_TYPE_REGISTER_FIR_FAILURE';

export const RegisterFIRActions = {
  ACTION_TYPE_REGISTER_FIR,
  ACTION_TYPE_REGISTER_FIR_SUCCESS,
  ACTION_TYPE_REGISTER_FIR_FAILURE,
};
