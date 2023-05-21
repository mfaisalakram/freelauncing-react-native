import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { CurrentFIRAC } from './actions';
import {
  CurrentFIR,
  CurrentFIRAction,
  CurrentFIRActions,
  CurrentFIRState,
} from './types';

export function CurrentFIRDetailsApi(action: CurrentFIRAction) {
  {
    const bt =
      'token' + ' ' + action.payload.user.token;
      const id = action.payload.user.user_id
    return axios.get(baseUrl + 'get_current_fir/'+id, {
      headers: {
        Authorization: bt,  
      },
    });
  }
}

function* CurrentFIRSaga(action: CurrentFIRAction) {
  try {
    const response = yield call(CurrentFIRDetailsApi, action);
    if (response.data.detail !== undefined) {
      throw response;
    }
    yield put<CurrentFIRAction>(
      CurrentFIRAC.setCurrentFIRSuccess(response.data)
    );
  } catch (errorResponse: any) {
    yield put<CurrentFIRAction>(
      CurrentFIRAC.setCurrentFIRFailure({
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

export function* CurrentFIRReduxSaga() {
  yield takeLatest(
    CurrentFIRActions.ACTION_TYPE_GET_CURRENT_FIR,
    CurrentFIRSaga
  );
}
