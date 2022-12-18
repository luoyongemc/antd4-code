// import { call, put, take, fork } from 'redux-saga/effects';
import { call, put, take, fork } from '../saga-nut/effects';
import LoginService from '../service/login';

import { LOGIN_FAILURE, LOGIN_SUCCESS, LOGIN_SAGA, REQUEST } from '../store/const';

function* loginHandle(action) {
    yield put({ type: REQUEST });

    try {
        const res1 = yield call(LoginService.login, action.payload);
        const res2 = yield call(LoginService.getMoreUserInfo, res1);
        yield put({ type: LOGIN_SUCCESS, payload: res2 });
    } catch (error) {
        yield put({ type: LOGIN_FAILURE, payload: error });
    }
}

function* loginSaga() {
    while (true) {
        const action = yield take(LOGIN_SAGA);
        yield fork(loginHandle, action);
    }
}

export default loginSaga;
