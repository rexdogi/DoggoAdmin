import axios from 'axios';

const axiosInstance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

const REMOTE_ENDPOINT = 'http://108.59.80.189:8080';
const LOCAL_ENDPOINT = 'http://localhost:8080';

const SELECTED = LOCAL_ENDPOINT;

export function get(api, config) {
    return axiosInstance.get(SELECTED + api, config)
}

export function post(api, data, config) {
    return axiosInstance.post(SELECTED + api, data, config)
}

export function put(api, data, config) {
    return axiosInstance.put(SELECTED + api, data, config)
}

export function destroy(api, config = {}) {
    return axiosInstance.delete(SELECTED + api, config)
}
