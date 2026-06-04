import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000',
  timeout: 15000,
});

// Interceptador de resposta global
// O toast é chamado via evento customizado para não depender do React context aqui
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Permite que chamadas específicas suprimam o toast global
    if (error.config?._suppressGlobalError) {
      return Promise.reject(error);
    }

    const status = error.response?.status;
    let message = "Ops! Nossa rede de sustentabilidade está em manutenção. Tente novamente em alguns minutos.";

    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      message = "A requisição demorou muito. Verifique sua conexão e tente novamente.";
    } else if (status === 400) {
      message = error.response?.data?.detail || "Dados inválidos. Verifique as informações e tente novamente.";
    } else if (status === 401 || status === 403) {
      message = "Sessão expirada ou sem permissão. Faça login novamente.";
    } else if (status === 404) {
      message = "Recurso não encontrado. Contate o suporte.";
    } else if (status >= 500) {
      message = "Erro no servidor. Nossa equipe já foi notificada.";
    } else if (!error.response) {
      message = "Sem conexão com o servidor. Verifique sua internet.";
    }

    // Dispara evento global para o ToastProvider capturar
    window.dispatchEvent(new CustomEvent("api-error", { detail: { message } }));

    return Promise.reject(error);
  }
);

export default api;
