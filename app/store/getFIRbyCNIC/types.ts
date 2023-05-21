export type GetFIRByCNIC = {
  id: number,
  title: string
};

export type UserId ={
  token : string;
  user_cnic:number
}

export type GetFIRByCNICError = {
  errorMessage: string;
};

// State
export interface GetFIRByCNICState {
  user:UserId;
  currentFir?: GetFIRByCNIC[];
  pending?: boolean;
  errorMessage?: string;
}

// Actions
export interface GetFIRByCNICAction {
  type: string;
  payload: GetFIRByCNICState;
}

// Action Types
const ACTION_TYPE_GET_FIR_CNIC = 'ACTION_TYPE_GET_FIR_CNIC';
const ACTION_TYPE_GET_FIR_CNIC_SUCCESS =
  'ACTION_TYPE_GET_FIR_CNIC_SUCCESS';
const ACTION_TYPE_GET_FIR_CNIC_FAILURE =
  'ACTION_TYPE_GET_FIR_CNIC_FAILURE';

export const GetFIRByCNICActions = {
  ACTION_TYPE_GET_FIR_CNIC,
  ACTION_TYPE_GET_FIR_CNIC_SUCCESS,
  ACTION_TYPE_GET_FIR_CNIC_FAILURE,
};
