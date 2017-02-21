import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import signup from './signup';
import session from './session';

export default combineReducers({
    routing: routerReducer,
    signup: signup,
    session: session
});