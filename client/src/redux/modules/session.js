import http from '../../utils/networking';

const LOGIN = 'LOGIN';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

const initState = {
    isAuthenticated: false,    
    currentUser: {}
};

export function signup(data) {    
    return (dispatch) => {
        dispatch({type: LOGIN});
        http
            .post('http://localhost:9000/api/registration', data)
            .then((res) => {
                dispatch({type: LOGIN_SUCCESS})
            })
            .catch((err) => {
                dispatch(loginError(err))
            });
    }
}

export function loginError(error) {
    return {type: LOGIN_ERROR, errorMessage: error}
}

export default function reducer(state = initState, action) {
    switch (action.type) {
        case LOGIN:
            return state;
        case LOGIN_SUCCESS:
            return state;
        case LOGIN_ERROR:
            return {...state, errorMessage: action.errorMessage};
        default:
            return state;
    }
}