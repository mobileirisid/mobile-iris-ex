import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';
import {push} from 'react-router-redux';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

const initState = {
    isAuthenticated: false,
    loading: false
};

const saveLocalSessionData = (data) => {
    persistence.setToken(data.token);
    persistence.setCurrentSubscriberId(data.subscriber_id);
    persistence.setCurrentPhoneId(data.phone_id);
}

export function signup(data) {
    if (data.password !== data.verify_password) {
        return signUpError('passwords do not match');
    }
    return (dispatch) => {
        dispatch({type: SIGN_UP});
        http
            .post('/api/registration', data)
            .then((res) => {
                if (res.data.error) {
                    dispatch(signUpError(res.data.error))
                } else {
                    const {data} = res;
                    saveLocalSessionData(data);
                    dispatch({type: SIGN_UP_SUCCESS, data});
                    dispatch(push('/'));
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