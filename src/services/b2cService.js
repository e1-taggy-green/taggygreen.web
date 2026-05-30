import api from './api';

export const b2cService = {
  // --- B2C Principal ---
  getUser: () => api.get('/api/v1/b2c/user'),

  getUserRastroHistorico: () => api.get('/api/v1/b2c/user/rastro-historico'),

  getUserExtrato: () => api.get('/api/v1/b2c/user/extrato'),

  getDestaqueMP: () => api.get('/api/v1/b2c/marketplace/destaques'),

  // --- Marketplace B2C (aguardando endpoint) ---
  getProdutosMP: (page = 1, size = 10) =>
    api.get('/api/v1/b2c/marketplace/produtos', { params: { page, size } }),

  updateSaldo: (produto_id) =>
    api.post('/api/v1/b2c/marketplace/resgatar', { produto_id }),
};
