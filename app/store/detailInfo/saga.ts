import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { GetUserDataAC } from './actions';
import {
  GetUserData,
  GetUserDataAction,
  GetUserDataActions,
  GetUserDataState,
} from './types';

export function GetUserDataDetailsApi(action: GetUserDataAction) {
  const bt = action?.payload?.token;
  const config = {
    headers: {
      'x-auth-token': bt,
    },
  };

  return axios.get(`${baseUrl}api/users/userdata`, config);
}

function* GetUserDataSaga(action: GetUserDataAction) {
  try {
    const response = yield call(GetUserDataDetailsApi, action);
    if (response.data.detail !== undefined) {
      throw response;
    }

    yield put<GetUserDataAction>(
      GetUserDataAC.GetUserDataSuccess(response.data)
    );
  } catch (errorResponse) {
    yield put<GetUserDataAction>(
      GetUserDataAC.GetUserDataFailure({
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

export function* GetUserDataReduxSaga() {
  yield takeLatest(
    GetUserDataActions.ACTION_TYPE_GET_USER_DETAILS,
    GetUserDataSaga
  );
}
