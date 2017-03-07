import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';

const REQUEST_IRIS_VALIDATION = 'REQUEST_IRIS_VALIDATION';
const REQUEST_IRIS_CANCEL = 'REQUEST_IRIS_CANCEL';
const REQUEST_IRIS_ERROR = 'REQUEST_IRIS_ERROR';
const AUTHENTICATION_ID_RECIEVED = 'AUTHENTICATION_ID_RECIEVED';

const token = persistence.getToken();

const initState = {
    loading: false
};

export function requestValidation(data) {
    return dispatch => {        
        dispatch({type: REQUEST_IRIS_VALIDATION});
        http.post(`/request/check?apikey=${token}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function cancelCheck(data) {
    return dispatch => {
        dispatch({type: REQUEST_IRIS_CANCEL});
        http.post(`/request/cancel?apikey=${token}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function recievedError(error) {
    return {type: REQUEST_IRIS_ERROR, error: error};
}

export default function (state = initState, action) {
    switch (action.type) {
        case REQUEST_IRIS_VALIDATION:
            return {
                ...state,
                loading: true
            };
        case REQUEST_IRIS_ERROR:
            return {
                ...state,
                loading: false
            };
        case REQUEST_IRIS_CANCEL:
            return {
                ...state,
                loading: false
            };
    }

    return state;
}