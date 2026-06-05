import api from './api';

const B2C_EMAIL = 'teste.b2c@taggy.com';

export const b2cService = {
  // --- Dashboard B2C ---

  getUser: (email = B2C_EMAIL) => api.get('/api/v1/b2c/user', { params: { email } }),

  getUserRastroHistorico: (email = B2C_EMAIL) =>
    api.get('/api/v1/b2c/user/rastro-historico', { params: { email } }),

  getUserExtrato: (email = B2C_EMAIL, limit) =>
    api.get('/api/v1/b2c/user/extrato', { params: { email, limit } }),

  // Equivalências ambientais (árvores, combustível em litros e horas de LED)
  // calculadas EXCLUSIVAMENTE pelo backend.
  // GET /api/v1/b2c/user/equivalencias
  //   → { arvores, combustivel_litros, horas_led, co2_total_kg }
  getUserEquivalencias: (email = B2C_EMAIL) =>
    api.get('/api/v1/b2c/user/equivalencias', { params: { email } }),

  getDestaqueMP: () => api.get('/api/v1/b2c/marketplace/destaques'),

  // --- Marketplace B2C ---

  // Recebe a página atual como parâmetro para paginação (default = 1)
  getProdutosMP: (page = 1, size) =>
    api.get('/api/v1/b2c/marketplace/produtos', { params: { page, size } }),

  // Processa o resgate de uma recompensa no backend.
  // POST /api/v1/b2c/marketplace/resgatar  body: { email, product_id }
  //   → { saldo_atualizado }
  resgatar: (email, productId) =>
    api.post('/api/v1/b2c/marketplace/resgatar', {
      email: email ?? B2C_EMAIL,
      product_id: productId,
    }),
};