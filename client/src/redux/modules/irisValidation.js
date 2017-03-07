import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';

const REQUEST_IRIS_VALIDATION = 'REQUEST_IRIS_VALIDATION';
const REQUEST_IRIS_CANCEL = 'REQUEST_IRIS_CANCEL';
const REQUEST_IRIS_ERROR = 'REQUEST_IRIS_ERROR';
const RECEIVED_AUTH_ID = 'RECIEVED_AUTH_ID';
const EYE_SCAN_COMPLETE = 'EYE_SCAN_COMPLETE';
const POLLING_FOR_EYE_SCANNED = 'POLLING_FOR_EYE_SCANNED';

const token = persistence.getToken();
const maxAttempts = 100;
const initState = {
    loading: false
};

export function requestValidation(sub_id, phone_id) {
    return dispatch => {                 
        dispatch({type: REQUEST_IRIS_VALIDATION});
        const data = {
            subscriber_id: sub_id,
            phone_id: phone_id
        };
        http.post(`/request/check?apikey=${token}`, data)
            .then(res => {
                console.log(res);
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

export function cancelCheck(sub_id, phone_id) {
    return dispatch => {
        dispatch({type: REQUEST_IRIS_CANCEL});
        const data = {
            subscriber_id: sub_id,
            phone_id: phone_id
        };
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

export function checkIfValidated(sub_id, phone_id, count = 0) {
     return dispatch => {
            const data = {
                subscriber_id: sub_id,
                phone_id: phone_id
            };
            http
                .post(`/request/check.json?apikey=${token}`, data)
                .then(res => {
                    if (res.data.response === undefined) {
                        dispatch({
                            type: POLLING_FOR_EYE_SCANNED,
                            count: count + 1
                        });
                    } else {
                        const response = JSON.parse(res.data.response);
                        if (response.errorCode !== 0) {
                            dispatch(recievedError("Issue with scanning"));
                        } else {
                            dispatch({type: 'EYE_SCAN_COMPLETED', data: response})
                        }
                    }
                })
                .catch(err => {
                    dispatch(recievedError(err));
                });
        };
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
        case RECEIVED_AUTH_ID:
            return {
                ...state,
                checkID: action.id,
                shouldPoll: true
            };
        case POLLING_FOR_EYE_SCANNED:
            const maxedOut = action.count > maxAttempts
            const shouldPoll = !maxedOut && state.shouldPoll;
            return {...state,
                shouldPoll: shouldPoll,
                count: action.count,
                maxedOut: maxedOut
            };
        case EYE_SCAN_COMPLETE:
            let newState = {...state,
                loading: false,
                shouldPoll: false
            };
            if (action.data.eyesID !== state.account.guid) {
                newState.showError = true;
                newState.errorMessage = "Another user is expected";
                newState.showSuccess = false;
            } else {
                console.log('SUCCESS!!!');
                newState.errorMessage = null;
                newState.showError = false
                newState.showSuccess = true;
            }
            return newState;
        default:
            return state;
    }
}