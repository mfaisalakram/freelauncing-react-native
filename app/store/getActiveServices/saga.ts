import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { ActiveServicesAC } from './actions';
import {
  AllActiveServices,
  AllActiveServicesAction,
  AllActiveServicesActions,
  AllActiveServicesState,
} from './types';

export function AllActiveServicesDetailsApi(action: AllActiveServicesAction) {
  {
    return axios.get(baseUrl + 'api/service/user/services/active', {
      headers: {
        'x-auth-token': action.payload.user.token,
      },
    });
  }
}

function* AllActiceServicesSaga(action: AllActiveServicesAction) {
  try {
    const response = yield call(AllActiveServicesDetailsApi, action);

    if (response.data.detail !== undefined) {
      throw response;
    }
    yield put<AllActiveServicesAction>(
      ActiveServicesAC.setActiveServicesSuccess(response.data)
    );
  } catch (errorResponse) {
    yield put<AllActiveServicesAction>(
      ActiveServicesAC.setActiveServicesFailure({
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

export function* AllActiveServicesReduxSaga() {
  yield takeLatest(
    AllActiveServicesActions.ACTION_TYPE_GET_ACTIVE_SERVICES,
    AllActiceServicesSaga
  );
}
