import axios from 'axios';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { baseUrl } from '../../shared/baseUrl';
import { GetFIRByCNICAC } from './actions';
import {
  GetFIRByCNIC,
  GetFIRByCNICAction,
  GetFIRByCNICActions,
  GetFIRByCNICState,
} from './types';

export function GetFIRByCNICDetailsApi(action: GetFIRByCNICAction) {
  {
    console.log("data");
    
    const bt =
      'token' + ' ' + action.payload.user.token;
    const id = action.payload.user.user_cnic
    console.log(id);
    
    return axios.get(baseUrl + 'ger_fir_by_cnic/'+id, {
      headers: {
        Authorization: bt,  
      },
    });
  }
}

function* GetFIRByCNICSaga(action: GetFIRByCNICAction) {
  try {
    const response = yield call(GetFIRByCNICDetailsApi, action);
    
    if (response.data.detail !== undefined) {
      throw response;
    }
    yield put<GetFIRByCNICAction>(
      GetFIRByCNICAC.setGetFIRByCNICSuccess(response.data)
    );
  } catch (errorResponse: any) {
    yield put<GetFIRByCNICAction>(
      GetFIRByCNICAC.setGetFIRByCNICFailure({
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

export function* GetFIRByCNICReduxSaga() {
  yield takeLatest(
    GetFIRByCNICActions.ACTION_TYPE_GET_FIR_CNIC,
    GetFIRByCNICSaga
  );
}
