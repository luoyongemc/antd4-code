import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createStore, applyMiddleware, combineReducers } from '../redux-nut';
// import createSagaMiddleware from 'redux-saga';
import createSagaMiddleware from '../saga-nut';

// 1.创建要运行的saga
import rootSaga from '../action/rootSaga';
import { loginReducer } from './loginReducer';
// 2.创建saga中间件
const sagaMiddleware = createSagaMiddleware();
// 3.把saga中间件与reducx store链接
const store = createStore(combineReducers({ user: loginReducer }), applyMiddleware(sagaMiddleware));
// 4.运行saga
sagaMiddleware.run(rootSaga);

export default store;
