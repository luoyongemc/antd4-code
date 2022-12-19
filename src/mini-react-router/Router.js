import React from 'react';
import { NavigationContext } from './Context';

export default function Router({ navigator, children, location }) {
    let navigationContext = React.useMemo(() => ({ navigator, location }), [navigator, location]);
    console.log(navigationContext, 'navigationContext');
    return <NavigationContext.Provider value={navigationContext}>{children}</NavigationContext.Provider>;
}
