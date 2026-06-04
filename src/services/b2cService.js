import api from './api';

const B2C_EMAIL = 'teste.b2c@taggy.com';

export const b2cService = {
  // --- B2C Principal ---
  getUser: (email = B2C_EMAIL) => api.get(`/api/v1/b2c/user?email=${email}`),
  getUserRastroHistorico: (email = B2C_EMAIL) => api.get(`/api/v1/b2c/user/rastro-historico?email=${email}`),
  getUserExtrato: (email = B2C_EMAIL) => api.get(`/api/v1/b2c/user/extrato?email=${email}`),

  // --- Marketplace ---
  getProdutosMP: (page = 1, size = 10) =>
    api.get('/api/v1/marketplace/produtos', { params: { page, size } }),

  getDestaqueMP: () => api.get('/api/v1/marketplace/destaque'),

  resgatar: (user_id, product_id) =>
    api.post('/api/v1/marketplace/resgates', { user_id, product_id }, { _suppressGlobalError: true }),
};
