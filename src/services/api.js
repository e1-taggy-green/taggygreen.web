import axios from 'axios';

const api = axios.create({
  baseURL: 'https://taggygreen-api.onrender.com', 
  timeout: 15000,
});

export default api;