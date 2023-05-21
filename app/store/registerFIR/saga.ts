import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { RegisterFIRAC } from './actionCreator';
import {
  RegisterFIR,
  RegisterFIRAction,
  RegisterFIRActions,
} from './types';

export function setRegisterFIRApi(action: RegisterFIRAction) {
  {
    const bt =
      'token' + ' ' + action.payload.token;
      console.log(bt);
      const user = action.payload.user
      console.log(user);
      
    return axios.post(baseUrl + 'addfir',user,{
      
      headers: {
        Authorization: bt,
      },
    });
  }
}

function* setRegisterFIRSaga(action: RegisterFIRAction) {
  try {
    const response = yield call(setRegisterFIRApi, action);
    console.log(response);
    
    yield put<RegisterFIRAction>(
      RegisterFIRAC.setRegisterFIRSuccess(response.data)
    );
  } catch (errorResponse: any) {
    yield put<RegisterFIRAction>(
      RegisterFIRAC.setRegisterFIRFailure({
        errorMessage:
          errorResponse.response &&
          errorResponse.response.data &&
          errorResponse.response.data.detail !== ''
            ? errorResponse.response.data.detail
            : errorResponse.message,
      })
    );
  }
}

export function* registerFIRReduxSaga() {
  yield takeLatest(
    RegisterFIRActions.ACTION_TYPE_REGISTER_FIR,
    setRegisterFIRSaga
  );
}
