import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';

const RECEIVED_AUTH_ID = 'RECIEVED_AUTH_ID';
const REQUEST_IRIS_VALIDATION = 'REQUEST_IRIS_VALIDATION';
const REQUEST_IRIS_CANCEL = 'REQUEST_IRIS_CANCEL';
const REQUEST_IRIS_ERROR = 'REQUEST_IRIS_ERROR';
const EYE_SCAN_COMPLETE = 'EYE_SCAN_COMPLETE';
const POLLING_FOR_EYE_SCANNED = 'POLLING_FOR_EYE_SCANNED';

const RECEIVED_REG_ID = 'RECEIVED_REG_ID';
const REQUEST_IRIS_REGISTRATION = 'REQUEST_IRIS_REGISTRATION';
const POLLING_FOR_EYE_REGISTRATION = 'POLLING_FOR_EYE_REGISTRATION';
const EYE_REGISTRATION_COMPLETE = 'EYE_REGISTRATION_COMPLETE'
const EYE_REGISTRATION_ERROR = 'EYE_REGISTRATION_ERROR';

const maxAttempts = 100;
const initState = {
    loading: false
};

export function requestValidation(sub_id, phone_id) {
    return dispatch => {
        const token = persistence.getToken();
        dispatch({ type: REQUEST_IRIS_VALIDATION });
        const data = {
            subscriber_id: sub_id,
            phone_id: phone_id
        };
        http.post(`/request/check?apikey=${token}`, data)
            .then(res => {
                dispatch({
                    type: RECEIVED_AUTH_ID,
                    checkId: res.data.id
                })
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function requestRegistration(sub_id, phone_id) {    
    return dispatch => {
        const token = persistence.getToken();
        dispatch({ type: REQUEST_IRIS_REGISTRATION });
        const data = {
            subscriber_id: sub_id,
            phone_id: phone_id
        };
        console.log(data)
        http.post(`/request/register?apikey=${token}`, data)
            .then(res => {
                console.log(res);
                dispatch({
                    type: RECEIVED_REG_ID,
                    checkId: res.data.id
                })
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function cancelCheck(sub_id, phone_id) {
    return dispatch => {
        dispatch({ type: REQUEST_IRIS_CANCEL });
        const data = {
            subscriber_id: sub_id,
            phone_id: phone_id
        };
        const token = persistence.getToken();
        http.post(`/request/cancel?apikey=${token}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    };
}

export function checkIfIrisRegistered(id, count = 0) {
    return dispatch => {
        const token = persistence.getToken();
        http
            .get(`/request/status/${id}?apikey=${token}`)
            .then(res => {
                if (res.data.response === undefined) {
                    dispatch({
                        type: POLLING_FOR_EYE_REGISTRATION,
                        count: count + 1
                    });
                } else if (res.data.response === 'cancel') {
                    console.log("User canceled the request during polling")
                    return;
                } else {
                    const response = JSON.parse(res.data.response);
                    console.log(res.data)
                    if (response.errorCode !== 0) {
                        dispatch({
                            type: EYE_REGISTRATION_ERROR,
                            error: 'Failed to register eye'
                        });
                    } else {
                        dispatch({ type: EYE_REGISTRATION_COMPLETE, data: response })
                    }
                }
            })
            .catch(err => {
                dispatch(recievedError(err));
            });
    };
}

export function checkIfValidated(id, count = 0) {
    return dispatch => {
        const token = persistence.getToken();
        http
            .get(`/request/status/${id}?apikey=${token}`)
            .then(res => {
                if (res.data.response === undefined) {
                    dispatch({
                        type: POLLING_FOR_EYE_SCANNED,
                        count: count + 1
                    });
                } else if (res.data.response === 'cancel') {
                    console.log("User canceled the request during polling")
                    return;
                } else {
                    const response = JSON.parse(res.data.response);
                    if (response.errorCode !== 0) {
                        dispatch(recievedError("Issue with scanning"));
                    } else {
                        dispatch({ type: EYE_SCAN_COMPLETE, data: response })
                    }
                }
            })
            .catch(err => {
                dispatch(recievedError(err));
            });
    };
}

export function recievedError(error) {
    return { type: REQUEST_IRIS_ERROR, error: error };
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
                loading: false,
                shouldPoll: false,
                error: action.error
            };
        case REQUEST_IRIS_CANCEL:
            return {
                ...state,
                loading: false,
                shouldPoll: false
            };
        case RECEIVED_AUTH_ID:
            return {
                ...state,
                checkId: action.checkId,
                shouldPoll: true
            };
        case POLLING_FOR_EYE_SCANNED:
            const maxedOut = action.count > maxAttempts
            const shouldPoll = !maxedOut && state.shouldPoll;
            return {
                ...state,
                shouldPoll: shouldPoll,
                count: action.count,
                maxedOut: maxedOut
            };
        case EYE_SCAN_COMPLETE:
            return {
                ...state,
                loading: false,
                shouldPoll: false,
                eyeId: action.data.eyesID,
                error: null
            };
        case REQUEST_IRIS_REGISTRATION:
            return {
                ...state,
                loading: true
            }
        case POLLING_FOR_EYE_REGISTRATION:
            const maxedOutReg = action.count > maxAttempts
            const shouldPollReg = !maxedOutReg && state.shouldPollReg;
            return {
                ...state,
                shouldPollReg: shouldPollReg,
                countReg: action.count,
                maxedOutReg: maxedOutReg
            }
        case EYE_REGISTRATION_COMPLETE:
            return {
                ...state,
                loading: false,
                shouldPollReg: false,
                eyeId: action.data.eyesID,
                error: null
            }
        case EYE_REGISTRATION_ERROR:
            return {
                ...state,
                regError: action.error
            }
        case RECEIVED_REG_ID:
            return {
                ...state,
                regCheckId: action.checkId,
                shouldPollReg: true
            }
        default:
            return state;
    }
}