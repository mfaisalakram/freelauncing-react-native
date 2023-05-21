import {
  CurrentFIR,
  CurrentFIRAction,
  CurrentFIRActions,
  CurrentFIRState,
} from './types';

const initialFIRState: CurrentFIR = {
 id:0,
 title:'',
} as CurrentFIR;


const initialState: CurrentFIRState = {
  currentFir: [],
  errorMessage: '',
  pending: false,
  user: {
    token: '',
    user_id:0,
  }
};

export const CurrentFIRReducer = (
  state = initialState,
  action: CurrentFIRAction
): CurrentFIRState => {
  const payload = action.payload as CurrentFIRState;
  switch (action.type) {
    case CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR:
      return {
        ...state,
        currentFir: payload.currentFir,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR_SUCCESS:
      return {
        ...state,
        currentFir: payload.currentFir,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR_FAILURE:
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
