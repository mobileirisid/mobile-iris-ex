import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import signup from './signup';
import session from './session';
import irisValidation from './irisValidation';

export default combineReducers({
    routing: routerReducer,
    signup: signup,
    session: session,
    irisValidation: irisValidation
});