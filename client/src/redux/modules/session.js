import http from '../../utils/networking';
import {push} from 'react-router-redux';
import * as persistence from '../../utils/persistence';

const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

const initState = {
    isAuthenticated: false    
};

export function signup(data) {    
    return (dispatch) => {
        dispatch({type: LOGIN});
        http
            .post('/api/registration', data)
            .then((res) => {
                dispatch({type: LOGIN_SUCCESS})
            })
            .catch((err) => {
                dispatch(loginError(err))
            });
    }
}

export function loginError(error) {
    return {type: LOGIN_ERROR, errorMessage: error};
}

export function logout() {
    persistence.clearAll()
    dispatch => {
        dispatch(push('/login'));
        dispatch({type: LOGOUT});
    }
}

export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGIN_SUCCESS:
            return state;
        case LOGIN_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case LOGOUT:
            return state;
            // return {
            //     isAuthenticated: false
            // }
        default:
            return state;
    }
}