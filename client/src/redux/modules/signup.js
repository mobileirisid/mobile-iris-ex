import http from '../../utils/networking';

const SIGN_UP = 'SIGN_UP';
const SIGN_UP_ERROR = 'SIGN_UP_ERROR';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';

export function signup(data) {
    if (data.password !== data.verify_password) {
        return signUpError('passwords do not match');
    }
    return (dispatch) => {
        dispatch({type: SIGN_UP});
        http.post('http://localhost:9000/api/registration', data)
            .then((res) => {
                dispatch({type: SIGN_UP_SUCCESS})
            })
            .catch((err) => {
                dispatch(signUpError(err))
            });
    }
}

export function signUpError(error) {
    return {
        type: SIGN_UP_ERROR,
        message: error
    }
}