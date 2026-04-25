import axios from 'axios';

// Tudo o que for comum a TODAS as requisições (como a URL base) fica aqui.
const api = axios.create({
  //Substituir por variáveis de ambiente (.env) futuramente. Ex: import.meta.env.VITE_API_URL
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000, 
});

export default api;