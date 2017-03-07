import http from '../../utils/networking';
import * as persistence from '../../utils/persistence';

const LOADING = 'LOADING';
const FETCH_SUBSCRIBER_SUCCESS = 'FETCH_SUBSCRIBER_SUCCESS';
const FETCH_SUBSCRIBERS_SUCCESS = 'FETCH_SUBSCRIBERS_SUCCESS';
const REQUEST_ERROR = 'FETCH_SUBSCRIBER_ERROR';
const SELECTED_SUBSCRIBER = 'SELECTED_SUBSCRIBER';
const ADDED_SUBSCRIBER = 'ADD_SUBSCRIBER';

const token = persistence.getToken();
const initState = {
    loading: false,
    currentSubscriber: {},
    subscribers: []
};

export function selectSubscriber(subscriber) {
    persistence.setCurrentSubscriberId(subscriber.id);
    return {type: SELECTED_SUBSCRIBER, subscriber}
};

export function fetchSubscribers() {
    return dispatch => {
        dispatch({type: LOADING});
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
        dispatch({type: LOADING});
        http
            .get(`/subscriber/${id}?apikey=${token}`)
            .then(res => {
                dispatch(retrievedSubscriber(res.data));
            })
            .catch(err => {
                dispatch(failedFetch(err));
            });
    }
}

export function addSubscriber(data) {
    // NOTE: Add default phone_country_id
    data.phone_country_id = 1;
    return dispatch => {
        dispatch({type: LOADING});
        http
            .post(`/v2/subscriber/add?apikey=${token}`, data)
            .then(res => {
                dispatch(addedSubscriber(res.data));
            })
            .catch(err => {
                dispatch(failedFetch(err));
            });
    }
}

export function addedSubscriber(data) {
    return {type: ADDED_SUBSCRIBER, subscriber: data};
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
    return {type: REQUEST_ERROR, errorMessage: err};
}

export default function (state = initState, action) {
    switch (action.type) {
        case LOADING:
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
        case REQUEST_ERROR:            
            return {
                ...state,
                loading: false,
                errorMessage: action.errorMessage
            };
        case SELECTED_SUBSCRIBER:
            return {
                ...state,
                loading: false,
                currentSubscriber: action.subscriber,
                currentSubscriberPhones: action.subscriber.phones
            }
        case ADDED_SUBSCRIBER:
            const subscribers = state.subscribers
            const sub = action.subscriber;
            const s = {id: sub.id, firstName: sub.first_name, lastName: sub.last_name, phones: sub.phones}
            return {
                ...state,
                loading: false,
                subscriber: subscribers.concat(s)
            }
        default:
            return state;
    }
}