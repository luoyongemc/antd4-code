import { stdChannel } from './channel';
import runSaga from './runSaga';

export default function createSagaMiddleware() {
    let boundRunSaga;
    let channel = stdChannel();

    function sagaMiddleware({ getState, dispatch }) {
        boundRunSaga = runSaga.bind(null, { channel, getState, dispatch });

        return next => action => {
            let result = next(action);
            channel.put(action);
            return result;
        };
    }
    sagaMiddleware.run = (...args) => boundRunSaga(...args);
    return sagaMiddleware;
}
