import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../../shared/baseUrl';
import { RegisterUserAC } from '../actionCreator';
import {
  RegisterUser,
  RegisterUserAction,
  RegisterUserActions,
} from '../types';

export function setRegisterUserApi(action: RegisterUserAction) {
  const user = action.payload.user;
  return axios.post(baseUrl + `api/users`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function* setRegisterUserSaga(action: RegisterUserAction) {
  try {
    const response = yield call(setRegisterUserApi, action);
    yield put<RegisterUserAction>(
      RegisterUserAC.setRegisterUserSuccess(response.data)
    );
  } catch (errorResponse) {
    yield put<RegisterUserAction>(
      RegisterUserAC.setRegisterUserFailure({
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

export function* registerUserReduxSaga() {
  yield takeLatest(
    RegisterUserActions.ACTION_TYPE_SET_REGISTER_USER,
    setRegisterUserSaga
  );
}
