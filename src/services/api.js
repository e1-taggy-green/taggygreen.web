import axios from 'axios';

// Tudo o que for comum a TODAS as requisições fica aqui.
const api = axios.create({
  //Substituir por variáveis de ambiente (.env).
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000, 
});

export default api;