import api from './api';

/**
 * Serviço que concentra todas as requisições referentes ao Módulo B2C (Motorista).
 */
export const b2cService = {
  // --- Dashboard B2C ---
  
  getUser: () => api.get('/b2c/user'),
  
  getUserRastroHistorico: () => api.get('/b2c/user/rastro-historico'),
  
  getUserExtrato: () => api.get('/b2c/user/extrato'),
  
  getDestaqueMP: () => api.get('/b2c/marketplace/destaques'),

  // --- Marketplace B2C ---
  
  // Recebe a página atual como parâmetro para paginação (default = 1)
  getProdutosMP: (page = 1) => api.get('/b2c/marketplace/produtos', { params: { page } }),
  
  // Envia os dados da transação para o back-end processar
  updateSaldo: (dadosCompra) => api.post('/b2c/marketplace/update-saldo', dadosCompra),
};