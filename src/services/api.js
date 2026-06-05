import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://taggygreen-api.onrender.com', 
  timeout: 15000,
});

export default api;