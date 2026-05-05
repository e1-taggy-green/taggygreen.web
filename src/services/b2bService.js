import api from './api';

/**
 * Serviço que concentra todas as requisições referentes ao Módulo B2B (Gestor).
 */
export const b2bService = {
  // --- Relatórios ESG ---
  getRelatorioESG: () => api.get('/b2b/esg/relatorio'),
  
  // Ao baixar arquivos via Axios, precisamos pedir que o formato da resposta (responseType) seja um 'blob' (dados binários crus).
  getRelatorioESG_PDF: () => api.get('/b2b/esg/relatorio/pdf', { responseType: 'blob' }),
  getRelatorioESG_csv: () => api.get('/b2b/esg/relatorio/csv', { responseType: 'blob' }),

  // --- Relatório Performance ---
  getPerfbyCategoria: () => api.get('/b2b/performance/categoria'),
  
  getRankingFrota: () => api.get('/b2b/performance/ranking'),

  // --- Simulador B2B ---
  
  /**
   * Recebe um objeto com "lead" (nome, email, etc.) e "frota" (qtd carros, eventos).
   */
  postSimulacao: (payload) => api.post('/b2b/simulador', payload),
};