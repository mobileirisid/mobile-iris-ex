import http from '../../utils/networking';
import persistence from '../../utils/persistence';

const FETCH_SUBSCRIBER = 'FETCH_SUBSCRIBER';
const FETCH_SUBSCRIBER_ERROR = 'FETCH_SUBSCRIBER_ERROR';
const FETCH_SUBSCRIBER_SUCCESS = 'FETCH_SUBSCRIBER_SUCCESS';

const token = persistence.getToken();
const initState = {
    loading: false,
    currentSubscriber: {}
};

export function fetchSubscriber(id) {
    return dispatch => {        
        dispatch({type: FETCH_SUBSCRIBER});
        http
            .get(`/subscriber/${id}.json?apikey=${token}`)
            .then(res => {
                dispatch(retrievedSubscriber(res.data))
            })
            .catch(err => {
                console.log(err);
            });
    }
}

function retrievedSubscriber(data) {
    return {type: FETCH_SUBSCRIBER_SUCCESS, data: data};
}

function failedRetrievingSubscriber(err) {
    return {type: FETCH_SUBSCRIBER_ERROR, errorMessage: err};
}

export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_SUBSCRIBER:
            return {
                ...state,
                loading: true
            };
        case FETCH_SUBSCRIBER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentSubscriber: action.data
            };
        case FETCH_SUBSCRIBER_ERROR:
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage
            };
        default:
            return state;
    }
}