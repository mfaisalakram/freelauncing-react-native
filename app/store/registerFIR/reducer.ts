import {
  RegisterFIR,
  RegisterFIRAction,
  RegisterFIRActions,
  RegisterFIRState,
} from './types';

const initialFIRState: RegisterFIR = {
  title: '',
  location: '',
  district: '',
  police_station: '',
  catagory: '',
  datetime: '',
  mobile_number: 0,
  description: '',
  is_seen: false,
  username: '',
  created_by: '',
  cnic_number: '',
  user:0
} as RegisterFIR;

const initialState: RegisterFIRState = {
  user: initialFIRState,
  errorMessage: '',
  pending: false,
  token: ''
};

export const registerFIRReducer = (
  state = initialState,
  action: RegisterFIRAction,
): RegisterFIRState => {
  switch (action.type) {
    case RegisterFIRActions.ACTION_TYPE_REGISTER_FIR:
      return {
        ...state,
        ...action.payload,
        pending: true,
      };
    case RegisterFIRActions.ACTION_TYPE_REGISTER_FIR_SUCCESS:
      return {
        ...state,
        user: action.payload.user || initialFIRState,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    case RegisterFIRActions.ACTION_TYPE_REGISTER_FIR_FAILURE:
      return {
        ...state,
        user: initialFIRState,
        errorMessage: action.payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
