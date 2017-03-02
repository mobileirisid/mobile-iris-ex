import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';

const FETCH_DATA = 'FETCH_DATA';
const FETCH_SUBSCRIBER_SUCCESS = 'FETCH_SUBSCRIBER_SUCCESS';
const FETCH_SUBSCRIBERS_SUCCESS = 'FETCH_SUBSCRIBERS_SUCCESS';
const FETCH_ERROR = 'FETCH_SUBSCRIBER_ERROR';
const SELECTED_SUBSCRIBER = 'SELECTED_SUBSCRIBER';

const token = persistence.getToken();
const initState = {
    loading: false,
    currentSubscriber: {}
};

export function selectSubscriber(subscriber) {
    persistence.setCurrentSubscriberId(subscriber.id);
    return {type: SELECTED_SUBSCRIBER, subscriber}
};

export function fetchSubscribers() {
    return dispatch => {
        dispatch({type: FETCH_DATA});
        http
            .get(`/subscriber?apikey=${token}`)
            .then(res => {
                dispatch(retrievedSubscribers(res.data.items));
            })
            .catch(err => {
                console.log(err)
                failedFetch(err.error);
            });
    }
}

export function fetchSubscriber(id) {
    return dispatch => {
        dispatch({type: FETCH_DATA});
        http
            .get(`/subscriber/${id}?apikey=${token}`)
            .then(res => {
                dispatch(retrievedSubscriber(res.data));
            })
            .catch(err => {
                console.log('wtf');
                dispatch(failedFetch(err));
            });
    }
}

function retrievedSubscriber(data) {
    return {type: FETCH_SUBSCRIBER_SUCCESS, data: data};
}

function retrievedSubscribers(data) {
    if (data) {
        return {type: FETCH_SUBSCRIBERS_SUCCESS, subscribers: data};
    } else {
        return {type: FETCH_SUBSCRIBERS_SUCCESS, subscribers: []};
    }
}

function failedFetch(err) {
    return {type: FETCH_ERROR, errorMessage: err};
}

export default function (state = initState, action) {
    switch (action.type) {
        case FETCH_DATA:
            return {
                ...state,
                loading: true
            };
        case FETCH_SUBSCRIBER_SUCCESS:
            return {
                ...state,
                loading: false,
                currentSubscriber: {
                    id: action.data.id,
                    firstName: action.data.first_name,
                    lastName: action.data.last_name
                }
            };
        case FETCH_SUBSCRIBERS_SUCCESS:
            return {
                ...state,
                loading: false,
                subscribers: action
                    .subscribers
                    .map(d => {
                        return {id: d.id, firstName: d.first_name, lastName: d.last_name, phones: d.phones}
                    })
            };
        case FETCH_ERROR:            
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage
            };
        case SELECTED_SUBSCRIBER:
            return {
                ...state,
                currentSubscriber: action.subscriber,
                currentSubscriberPhones: action.subscriber.phones
            }
        default:
            return state;
    }
}