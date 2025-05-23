import axios from 'axios';

export default axios.create(
    { baseURL: 'http://localhost:8000/login' }
)


export const refreshInstance = axios.create(
    {
        baseURL: 'http://localhost:8000/refresh',
        withCredentials: true,
    }
)