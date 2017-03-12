import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';
import {push} from 'react-router-redux';
import {addedSubscriber, selectSubscriber} from './account';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

const initState = {
    isAuthenticated: false,
    loading: false
};

export function signupWithSubscriber(data) {
    if (data.password !== data.verify_password) {
        return signUpError('passwords do not match');
    }
    return (dispatch) => {
        dispatch({type: SIGN_UP});
        http
            .post('/register_with_subscriber', data)
            .then((res) => {
                if (res.data.error) {
                    dispatch(signUpError(res.data.error))
                } else {
                    const {data} = res;
                    persistence.setToken(data.token);
                    dispatch({type: SIGN_UP_SUCCESS, data});
                    dispatch(addedSubscriber(data.subscriber));
                    dispatch(selectSubscriber(data.subscriber));
                    dispatch(push('/'));
                }
            })
            .catch((err) => {
                dispatch(signUpError(err))
            });
    }
}

export function signup(data) {
    if (data.password !== data.verify_password) {
        return signUpError('passwords do not match');
    }
    return (dispatch) => {
        dispatch({type: SIGN_UP});
        http
            .post('/registration', data)
            .then((res) => {
                if (res.data.error) {
                    dispatch(signUpError(res.data.error))
                } else {
                    const {data} = res;
                    if (data.token === undefined) {
                        dispatch(signUpError('Failed to retrieve data, please try again'))
                    } else {
                        persistence.setToken(data.token);
                        persistence.setUserID(data.user_id);
                        dispatch({type: SIGN_UP_SUCCESS, data});
                        dispatch(push('/'));
                    }                    
                }
            })
            .catch((err) => {
                dispatch(signUpError(err))
            });
    }
}

export function signUpError(error) {
    return {type: SIGN_UP_ERROR, errorMessage: error}
}

export default function reducer(state = initState, action) {
    switch (action.type) {
        case SIGN_UP:
            return {
                ...state,
                loading: true
            };
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                subsciberID: action.data.subsciber_id,
                phoneID: action.data.phone_id,
                errorMessage: null,
                loading: false
            };
        case SIGN_UP_ERROR:
            return {
                ...state,
                errorMessage: action.errorMessage,
                loading: false
            };
        default:
            return state;
    }
}