import { all, fork } from 'redux-saga/effects';

import { LoginUserReduxSaga } from './loginUser/saga';
import { registerUserReduxSaga } from './registerUser/saga/saga';
import { GetUserDataReduxSaga } from './detailInfo/saga';
import { registerFIRReduxSaga } from './registerFIR/saga';
import { CurrentFIRReduxSaga } from './currentUserFIR/saga';
import { FIRDetailsReduxSaga } from './getFIRDetails/saga';
import { GetFIRByCNICReduxSaga } from './getFIRbyCNIC/saga';
import { AllFIRReduxSaga } from './getAllFIR/saga';
import { AllActiveServicesReduxSaga } from './getActiveServices/saga';

export function* rootSaga() {
  yield all([
    fork(LoginUserReduxSaga),
    fork(registerUserReduxSaga),
    fork(registerFIRReduxSaga),
    fork(GetUserDataReduxSaga),
    fork(CurrentFIRReduxSaga),
    fork(FIRDetailsReduxSaga),
    fork(GetFIRByCNICReduxSaga),
    fork(AllFIRReduxSaga),
    fork(AllActiveServicesReduxSaga),
  ]);
}
