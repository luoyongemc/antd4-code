import { LOGIN_FAILURE, LOGIN_SAGA, LOGIN_SUCCESS, LOGOUT_SUCCESS, REQUEST } from '../store/const';
import LoginService from '../service/login';

export const login = userInfo => ({ type: LOGIN_SAGA, payload: userInfo });

export const logout = userInfo => ({ type: LOGOUT_SUCCESS, payload: userInfo });
