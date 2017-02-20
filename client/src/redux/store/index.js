import {createStore, applyMiddleware} from 'redux';
import {routerMiddleware} from 'react-router-redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../modules';

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
});

export default function configureStore(browserHistory) {
    const reduxRouterMiddleware = routerMiddleware(browserHistory);
    const createStoreWithMiddleware = applyMiddleware(
        thunkMiddleware,
        reduxRouterMiddleware,
        loggerMiddleware
    )(createStore);

    return createStoreWithMiddleware(rootReducer);
}