import { createStore, applyMiddleware, combineReducers } from 'redux';
// import { createStore, applyMiddleware, combineReducers } from '../redux-nut';

function countReducer(state = 0, action) {
    switch (action.type) {
        case 'ADD':
            return state + 1;
        case 'MINUS':
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(combineReducers({ count: countReducer }), applyMiddleware(thunk, logger));

function thunk({ getState, dispatch }) {
    return next => action => {
        // debugger;
        if (typeof action === 'function') {
            return action(dispatch, getState);
        }
        return next(action);
    };
}

function logger({ getState, dispatch }) {
    return next => action => {
        // debugger;
        const prevState = getState();
        console.log(prevState, 'prev state');
        const returnValue = next(action);
        const nextState = getState();
        console.log(nextState, 'next state');
        return returnValue;
    };
}

export default store;
