import { combineReducers } from 'redux';
import { LoginUserReducer } from './loginUser/reducer';
import { registerUserReducer } from '../store/registerUser/reducer';
import { GetUserDataReducer } from './detailInfo/reducer';
import { themeReducer } from './useThemeStore/reducer';
import { registerFIRReducer } from './registerFIR/reducer';
import { CurrentFIRReducer } from './currentUserFIR/reducer';
import { FIRDetailsReducer } from './getFIRDetails/reducer';
import { GetFIRByCNICReducer } from './getFIRbyCNIC/reducer';
import { AllFIRReducer } from './getAllFIR/reducer';
import { AllActiveServicesReducer } from './getActiveServices/reducer';

const rootReducer = combineReducers({
  user: LoginUserReducer,
  registerUser: registerUserReducer,
  registerFIR: registerFIRReducer,
  userInfo: GetUserDataReducer,
  themeColor: themeReducer,
  currentUserFIR: CurrentFIRReducer,
  firDetail: FIRDetailsReducer,
  getFIRbycnic: GetFIRByCNICReducer,
  getAllFIR: AllFIRReducer,
  setAllActiveServices: AllActiveServicesReducer,
});
export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
