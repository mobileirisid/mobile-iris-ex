const TOKEN = 'token';

export function saveToken(token) {
    localStorage.setItem(TOKEN, token);
}

export function getToken() {
    localStorage.getItem(TOKEN);
}