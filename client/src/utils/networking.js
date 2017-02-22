import axios from 'axios';

const network = axios.create({
    baseURL: 'http://localhost:9000',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

const http = {
    get: (url) => {
        return network(url);
    },
    post: (url, body) => {
        return network.post(url, body);
    }
}

export default http;