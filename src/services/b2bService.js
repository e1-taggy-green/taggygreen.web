import api from './api';
import { DEFAULT_B2B_EMAIL } from '../config';

export const b2bService = {
  // --- Relatórios ESG ---
  getRelatorioESG: (email = DEFAULT_B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg?email=${email}`),
  getRelatorioESG_PDF: (email = DEFAULT_B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg/pdf?email=${email}`, { responseType: 'blob' }),
  getRelatorioESG_csv: (email = DEFAULT_B2B_EMAIL) => api.get(`/api/v1/b2b/relatorios/esg/csv?email=${email}`, { responseType: 'blob' }),

  // --- Performance ---
  getPerfbyCategoria: (email = DEFAULT_B2B_EMAIL) => api.get(`/api/v1/b2b/performance/categoria?email=${email}`),
  getRankingFrota:    (email = DEFAULT_B2B_EMAIL) => api.get(`/api/v1/b2b/performance/ranking?email=${email}`),

  // --- Simulador B2B ---
  postSimulacao: (payload) => api.post('/api/v1/simulador/simulacao', payload),
};
