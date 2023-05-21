import {
  FIRDetails,
  FIRDetailsAction,
  FIRDetailsActions,
  FIRDetailsState,
} from './types';

const initialFIRState: FIRDetails = {
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
} as  FIRDetails;


const initialState: FIRDetailsState = {
   FIRDetails: initialFIRState,
  errorMessage: '',
  pending: false,
  user: {
    token: '',
    user_id:0,

  }
};

export const FIRDetailsReducer = (
  state = initialState,
  action: FIRDetailsAction
): FIRDetailsState => {
  const payload = action.payload as  FIRDetailsState;
  switch (action.type) {
    case FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS:
      return {
        ...state,
        FIRDetails: payload.FIRDetails,
        errorMessage: payload.errorMessage || '',
        pending: true,
      };
    case FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS_SUCCESS:
      return {
        ...state,
        FIRDetails: payload.FIRDetails,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    case FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS_FAILURE:
      return {
        ...state,
        errorMessage: payload.errorMessage || '',
        pending: false,
      };
    default:
      return state;
  }
};
