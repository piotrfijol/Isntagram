import axios from 'axios';
const BASE_URL = "http://localhost:5000";

export default axios.create({
    
})

export const axiosPrivate = axios.create({
    withCredentials: true
})