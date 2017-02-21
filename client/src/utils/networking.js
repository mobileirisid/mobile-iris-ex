import axios from 'axios';

const http = {
    get: (url) => {
        return axios(url);
    },
    post: (url, body) => {
        return axios.post(url, body);
    }
}

export default http;