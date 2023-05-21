import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { LoginUserAC } from './actions';
import {
  LoginUser,
  LoginUserAction,
  LoginUserActions,
  LoginUserState,
} from './types';

export function loginUserApi(action: LoginUserAction) {
  const user = action.payload.user;

  return axios.post(baseUrl + 'api/auth', user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

function* loginUserSaga(action: LoginUserAction) {
  try {
    const response = yield call(loginUserApi, action);
    if (response.data.detail !== undefined) {
      throw response;
    }

    yield put<LoginUserAction>(LoginUserAC.loginUserSuccess(response.data));
  } catch (errorResponse) {
    yield put<LoginUserAction>(
      LoginUserAC.loginUserFailure({
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

export function* LoginUserReduxSaga() {
  yield takeLatest(LoginUserActions.ACTION_TYPE_SET_LOGIN_USER, loginUserSaga);
}
