import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { AllFIRAC } from './actions';
import { AllFIR, AllFIRAction, AllFIRActions, AllFIRState } from './types';

export function AllFIRDetailsApi(action: AllFIRAction) {
  {
    return axios.get(baseUrl + 'get_All', {});
  }
}

function* AllFIRSaga(action: AllFIRAction) {
  try {
    const response = yield call(AllFIRDetailsApi, action);

    if (response.data.detail !== undefined) {
      throw response;
    }
    yield put<AllFIRAction>(AllFIRAC.setAllFIRSuccess(response.data));
  } catch (errorResponse) {
    yield put<AllFIRAction>(
      AllFIRAC.setAllFIRFailure({
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

export function* AllFIRReduxSaga() {
  yield takeLatest(AllFIRActions.ACTION_TYPE_GET_ALL_FIR, AllFIRSaga);
}
