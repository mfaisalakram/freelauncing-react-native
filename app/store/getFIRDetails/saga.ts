import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { FIRDetailsAC } from './actions';
import {
  FIRDetails,
  FIRDetailsAction,
  FIRDetailsActions,
  FIRDetailsState,
} from './types';

export function FIRDetailsDetailsApi(action: FIRDetailsAction) {
  {
    const bt =
      'token' + ' ' + action.payload.user.token;
    const id = action.payload.user.user_id
    return axios.get(baseUrl + 'get_by_id/'+id, {
      headers: {
        Authorization: bt,  
      },
    });
  }
}

function* FIRDetailsSaga(action: FIRDetailsAction) {
  try {
    const response = yield call(FIRDetailsDetailsApi, action);
    
    if (response.data.detail !== undefined) {
      throw response;
    }
    yield put<FIRDetailsAction>(
      FIRDetailsAC.setFIRDetailsSuccess(response.data)
    );
  } catch (errorResponse: any) {
    yield put<FIRDetailsAction>(
      FIRDetailsAC.setFIRDetailsFailure({
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

export function* FIRDetailsReduxSaga() {
  yield takeLatest(
    FIRDetailsActions.ACTION_TYPE_GET_FIR_DETAILS,
    FIRDetailsSaga
  );
}
