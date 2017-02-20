import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import signup from './signup';

export default combineReducers({
    routing: routerReducer,
    signup: signup
});