const TOKEN = 'token';
const USER_ID = 'userID';
const SUBSCRIBER_ID = 'subscriberID';
const PHONE_ID = 'phoneID';

export function setToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN);
}

export function setUserId(id) {
    localStorage.setItem(USER_ID, id);
}

export function getUserId() {
    return localStorage.getItem(USER_ID);
}

export function setCurrentSubscriberId(id) {
    localStorage.setItem(SUBSCRIBER_ID, id);
}

export function getCurrentSubscriberId(id) {
    return localStorage.getItem(SUBSCRIBER_ID);
}

export function setCurrentPhoneId(id) {
    localStorage.setItem(PHONE_ID, id);
}

export function getCurrentPhoneId() {
    localStorage.getItem(PHONE_ID);
}

export function clearAll() {
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(SUBSCRIBER_ID);
    localStorage.removeItem(PHONE_ID);
}