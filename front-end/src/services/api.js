import axios from 'axios';

const api=axios.create({
    baseURL: 'http://88.200.63.148:3333',
})

export default api;