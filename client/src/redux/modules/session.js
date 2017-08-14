import http from '../../utils/networking';
import {push} from 'react-router-redux';
import * as persistence from '../../utils/persistence';
import {clearAccount} from './account';

const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGOUT = 'LOGOUT';

const initState = {
    isAuthenticated: false
};

export function login(data) {
    return (dispatch) => {
        dispatch({type: LOGIN});
        http
            .post('/session', data)
            .then((res) => {
                if (res.data.error) {
                    dispatch(loginError(res.data.error))
                } else {
                    const {data} = res;
                    if (data.token === undefined) {
                        dispatch(loginError('Failed to retrieve data, please try again'))
                    } else {
                        persistence.setToken(data.token);
                        dispatch({type: LOGIN_SUCCESS, data});
                        dispatch(push('/'));
                    }
                }
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
    persistence.clearAll();
    return dispatch => {
        dispatch(clearAccount());
        dispatch(push('/login'));
        dispatch({type: LOGOUT});
    }
}

export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGIN_SUCCESS:
            return {...state, isAuthenticated: true};
        case LOGIN_ERROR:
            return {...state, errorMessage: action.errorMessage};
        case LOGOUT:
            return {
                isAuthenticated: false
            }
        default:
            return state;
    }
}