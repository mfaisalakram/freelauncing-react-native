import {
  AllFIR,
  AllFIRAction,
  AllFIRActions,
  AllFIRState,
} from './types';

const initialFIRState: AllFIR = {
 id:0,
 title:'',
} as AllFIR;


const initialState: AllFIRState = {
  allFIR: [],
  errorMessage: '',
  pending: false,
  user: {
    token: ''
  }
};

export const AllFIRReducer = (
  state = initialState,
  action: AllFIRAction
): AllFIRState => {
  const payload = action.payload as AllFIRState;
  switch (action.type) {
    case AllFIRActions.ACTION_TYPE_GET_ALL_FIR:
      return {
        ...state,
        allFIR: payload.allFIR,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case AllFIRActions.ACTION_TYPE_GET_ALL_FIR_SUCCESS:
      return {
        ...state,
        allFIR: payload.allFIR,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case AllFIRActions.ACTION_TYPE_GET_ALL_FIR_FAILURE:
      return {
        ...state,
        allFIR: [],
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
