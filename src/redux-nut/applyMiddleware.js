import compose from './compose';

export default function applyMiddleware(...middlewares) {
    return createStore => reducer => {
        const store = createStore(reducer);
        let dispatch = store.dispatch;

        // todo: 加强dispatch
        const midAPI = {
            getState: store.getState,
            dispatch: (action, ...args) => dispatch(action, ...args),
        };

        const middlewareChain = middlewares.map(middleware => middleware(midAPI));
        dispatch = compose(...middlewareChain)(store.dispatch); // 这里是对compose执行后的结果

        return {
            ...store,
            dispatch,
        };
    };
}
