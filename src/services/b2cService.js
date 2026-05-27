import api from './api';

// ─── MOCK DE CONTRATO (US-05) ─────────────────────────────────────────────────
// Simula o payload que a US-03 irá entregar quando o back estiver pronto.
// Para conectar à API real: apague as funções _mock* e descomente os métodos
// getUserRastroHistorico e getUserExtrato que usam api.get().
// O restante do código (hook, componentes) não precisa ser alterado.

const _delay = (ms) => new Promise((res) => setTimeout(res, ms));

const _mockRastroHistorico = async () => {
  await _delay(800);
  return {
    data: {
      co2_evitado: 44.7,
      arvores_equivalentes: 2,
      litros_agua: 890,
      horas_vento: 120,
      historico: [
        { mes: "Jan", kg: 8.4 },
        { mes: "Fev", kg: 12.1 },
        { mes: "Mar", kg: 9.7 },
        { mes: "Abr", kg: 14.5 },
      ],
    },
  };
};

const _mockExtrato = async () => {
  await _delay(800);
  return {
    data: [
      { id: 1, data: "24/04/2026", praca: "Pedágio Via Dutra — SP-330 KM 92",      mitigacao_kg: 3.2,  tag: "AB5820" },
      { id: 2, data: "21/04/2026", praca: "Pedágio Bandeirantes — SP-348 KM 41",   mitigacao_kg: 2.8,  tag: "AB5820" },
      { id: 3, data: "18/04/2026", praca: "Pedágio Anhanguera — SP-300 KM 66",     mitigacao_kg: 4.1,  tag: "AB5820" },
      { id: 4, data: "15/04/2026", praca: "Pedágio Dom Pedro I — SP-070 KM 18",    mitigacao_kg: 2.3,  tag: "AB5820" },
      { id: 5, data: "10/04/2026", praca: "Pedágio Campinas Sul — SP-065 KM 33",   mitigacao_kg: 2.1,  tag: "AB5820" },
    ],
  };
};

// ─── SERVIÇO B2C ──────────────────────────────────────────────────────────────
export const b2cService = {
  // --- Dashboard B2C ---

  getUser: () => api.get('/b2c/user'),

  // TODO (US-03): substituir por api.get('/b2c/user/rastro-historico')
  getUserRastroHistorico: () => _mockRastroHistorico(),

  // TODO (US-03): substituir por api.get('/b2c/user/extrato')
  getUserExtrato: () => _mockExtrato(),

  getDestaqueMP: () => api.get('/b2c/marketplace/destaques'),

  // --- Marketplace B2C ---

  getProdutosMP: (page = 1) => api.get('/b2c/marketplace/produtos', { params: { page } }),

  updateSaldo: (dadosCompra) => api.post('/b2c/marketplace/update-saldo', dadosCompra),
};
