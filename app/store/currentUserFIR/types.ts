export type CurrentFIR = {
  id: number,
  title: string
};

export type UserId ={
  token : string;
  user_id:number
}

export type CurrentFIRError = {
  errorMessage: string;
};

// State
export interface CurrentFIRState {
  user:UserId;
  currentFir?: CurrentFIR[];
  pending?: boolean;
  errorMessage?: string;
}

// Actions
export interface CurrentFIRAction {
  type: string;
  payload: CurrentFIRState;
}

// Action Types
const ACTION_TYPE_GET_CURRENT_FIR = 'ACTION_TYPE_GET_CURRENT_FIR';
const ACTION_TYPE_GET_CURRENT_FIR_SUCCESS =
  'ACTION_TYPE_GET_CURRENT_FIR_SUCCESS';
const ACTION_TYPE_GET_CURRENT_FIR_FAILURE =
  'ACTION_TYPE_GET_CURRENT_FIR_FAILURE';

export const CurrentFIRActions = {
  ACTION_TYPE_GET_CURRENT_FIR,
  ACTION_TYPE_GET_CURRENT_FIR_SUCCESS,
  ACTION_TYPE_GET_CURRENT_FIR_FAILURE,
};
