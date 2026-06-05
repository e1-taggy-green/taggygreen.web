import api from './api';

/**
 * Serviço que concentra todas as requisições referentes ao Módulo B2C (Motorista).
 */
export const b2cService = {
  // --- Dashboard B2C ---
  
  getUser: (email) => api.get('/api/v1/b2c/user', { params: { email } }),
  
  getUserRastroHistorico: (email) => api.get('/api/v1/b2c/user/rastro-historico', { params: { email } }),
  
  getUserExtrato: (email, limit) => api.get('/api/v1/b2c/user/extrato', { params: { email, limit } }),
  
  getDestaqueMP: () => api.get('/api/v1/b2c/marketplace/destaques'),

  // --- Marketplace B2C ---
  
  // Recebe a página atual como parâmetro para paginação (default = 1)
  getProdutosMP: (page = 1) => api.get('/api/v1/b2c/marketplace/produtos', { params: { page } }),
  
  // Envia os dados da transação para o back-end processar
  updateSaldo: (dadosCompra) => api.post('/api/v1/b2c/marketplace/update-saldo', dadosCompra),
};