export type AllFIR = {
  id: number,
  title: string
};

export type UserId ={
  token : string;
}

export type AllFIRError = {
  errorMessage: string;
};

// State
export interface AllFIRState {
  user:UserId;
  allFIR?: AllFIR[];
  pending?: boolean;
  errorMessage?: string;
}

// Actions
export interface AllFIRAction {
  type: string;
  payload: AllFIRState;
}

// Action Types
const ACTION_TYPE_GET_ALL_FIR = 'ACTION_TYPE_GET_ALL_FIR';
const ACTION_TYPE_GET_ALL_FIR_SUCCESS =
  'ACTION_TYPE_GET_ALL_FIR_SUCCESS';
const ACTION_TYPE_GET_ALL_FIR_FAILURE =
  'ACTION_TYPE_GET_ALL_FIR_FAILURE';

export const AllFIRActions = {
  ACTION_TYPE_GET_ALL_FIR,
  ACTION_TYPE_GET_ALL_FIR_SUCCESS,
  ACTION_TYPE_GET_ALL_FIR_FAILURE,
};
