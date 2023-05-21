import {
  GetFIRByCNIC,
  GetFIRByCNICAction,
  GetFIRByCNICActions,
  GetFIRByCNICState,
} from './types';

const initialFIRState: GetFIRByCNIC = {
 id:0,
 title:'',
} as GetFIRByCNIC;


const initialState: GetFIRByCNICState = {
  currentFir: [],
  errorMessage: '',
  pending: false,
  user: {
    token: '',
    user_cnic:0
  }
};

export const GetFIRByCNICReducer = (
  state = initialState,
  action: GetFIRByCNICAction
): GetFIRByCNICState => {
  const payload = action.payload as GetFIRByCNICState;
  switch (action.type) {
    case GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC:
      return {
        ...state,
        currentFir: payload.currentFir,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC_SUCCESS:
      return {
        ...state,
        currentFir: payload.currentFir,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC_FAILURE:
      return {
        ...state,
        currentFir: [],
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
