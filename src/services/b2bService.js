import api from './api';

/**
 * Serviço que concentra todas as requisições referentes ao Módulo B2B (Gestor).
 */
export const b2bService = {
  // --- Relatórios ESG ---
  getRelatorioESG: (email) => api.get(`/api/v1/b2b/relatorios/esg?email=${email}`),
  
  // Ao baixar arquivos via Axios, precisamos pedir que o formato da resposta (responseType) seja um 'blob' (dados binários crus).
  getRelatorioESG_PDF: (email) => api.get(`/api/v1/b2b/relatorios/esg/pdf?email=${email}`, { responseType: 'blob' }),
  getRelatorioESG_csv: (email) => api.get(`/api/v1/b2b/relatorios/esg/csv?email=${email}`, { responseType: 'blob' }),

  // --- Relatório Performance ---
  getPerfbyCategoria: (email) => api.get(`/api/v1/b2b/performance/categoria?email=${email}`),
  getRankingFrota: (email) => api.get(`/api/v1/b2b/performance/ranking?email=${email}`),

  // --- Simulador B2B ---
  
  /**
   * Recebe um objeto com "lead" (nome, email, etc.) e "frota" (qtd carros, eventos).
   */
  postSimulacao: (payload) => api.post('/api/v1/simulador/simulacao', payload),
};