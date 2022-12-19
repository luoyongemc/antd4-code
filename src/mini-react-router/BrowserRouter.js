import { createBrowserHistory } from 'history';
import React, { useLayoutEffect } from 'react';
import Router from './Router';

export default function BrowserRouter({ children }) {
    let historyRef = React.useRef();

    if (historyRef.current == null) {
        historyRef.current = createBrowserHistory();
    }
    const history = historyRef.current;
    const [state, setstate] = React.useState({ location: history.location });

    useLayoutEffect(() => {
        console.log(history, 'history');
        history.listen(setstate);
    }, [history]);

    return <Router children={children} navigator={history} location={state.location} />;
}
