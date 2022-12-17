import React, { useCallback, useContext, useEffect, useLayoutEffect, useReducer, useState, useSyncExternalStore } from 'react';

import { bindActionCreators } from '../redux-nut';

const Context = React.createContext();

export function Provider({ store, children }) {
    return <Context.Provider value={store}>{children}</Context.Provider>;
}

export const connect = (mapStateToProps, mapDispatchToProps) => WrappedComponent => props => {
    const store = useContext(Context);
    const { getState, dispatch, subscribe } = store;

    const stateProps = mapStateToProps(getState());

    let dispatchProps = { dispatch }; // 默认带有dispatch

    if (typeof mapDispatchToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch);
    } else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
    }

    const [, forceUpdate] = useReducer(x => x + 1, 0);

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate();
        });
        return unsubscribe;
    }, [subscribe]);

    return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
};

function useForceUpdate() {
    const [state, setState] = useState(0);
    const update = useCallback(() => {
        setState(prev => prev + 1);
    }, []);
    return update;
}

export function useSelector(selector) {
    const store = useContext(Context);

    const { getState, subscribe } = store;

    const forceUpdate = useForceUpdate();

    useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
            forceUpdate();
        });
        return () => {
            unsubscribe();
        };
    }, [subscribe]);
    const selectedState = selector(getState());

    return selectedState;
}

export function useDispatch() {
    const store = useContext(Context);

    const { dispatch } = store;

    return dispatch;
}
