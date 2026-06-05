import api from './api';

const B2B_EMAIL = 'teste.b2b@taggy.com';

export const b2bService = {
  // --- Relatórios ESG ---
  getRelatorioESG: (email = B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg?email=${email}`),
  getRelatorioESG_PDF: (email = B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg/pdf?email=${email}`, { responseType: 'blob' }),
  getRelatorioESG_csv: (email = B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg/csv?email=${email}`, { responseType: 'blob' }),

  // --- Performance ---
  getPerfbyCategoria: (email = B2B_EMAIL) => api.get(`/api/v1/b2b/performance/categoria?email=${email}`),
  getRankingFrota:    (email = B2B_EMAIL) => api.get(`/api/v1/b2b/performance/ranking?email=${email}`),

  // --- Simulador B2B ---
  postSimulacao: (payload) => api.post('/api/v1/simulador/simulacao', payload),
};
