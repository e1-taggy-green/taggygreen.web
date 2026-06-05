import { useState, useEffect, useCallback } from 'react';
import { b2cService } from '../services/b2cService';

/**
 * Hook que centraliza os fetches da tela Meu Rastro Verde.
 * Consome os endpoints reais:
 *   GET /api/v1/b2c/user/rastro-historico
 *     → array de { mes: string, co2_economizado: number }
 *   GET /api/v1/b2c/user/extrato
 *     → array de { nome: string, data: string, registro_economia: number }
 */
export function useRastroVerde(filtro = '4meses') {
  const [historico, setHistorico] = useState([]);
  const [extrato,   setExtrato]   = useState([]);
  const [rastro,    setRastro]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchDados = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [resHistorico, resExtrato] = await Promise.all([
        b2cService.getUserRastroHistorico(),
        b2cService.getUserExtrato(),
      ]);

      // Contrato: array de { mes, co2_economizado }
      const historicoRaw = Array.isArray(resHistorico.data) ? resHistorico.data : [];

      // Normaliza para o formato usado nos gráficos: { mes, kg }
      const historicoNorm = historicoRaw.map((item) => ({
        mes: item.mes,
        kg: item.co2_economizado ?? 0,
      }));

      // Soma total de CO₂ do período
      const co2Total = historicoNorm.reduce((acc, item) => acc + item.kg, 0);

      setHistorico(historicoNorm);

      // Monta objeto rastro com os cálculos de equivalência
      setRastro({
        co2_evitado: co2Total,
        arvores_equivalentes: Math.floor(co2Total / 15),
        litros_agua: Math.round(co2Total * 20),
        horas_vento: Math.round(co2Total * 8.5),
      });

      // Contrato extrato: array de { nome, data, registro_economia }
      const extratoRaw = Array.isArray(resExtrato.data) ? resExtrato.data : [];

      // Normaliza para o formato usado nos componentes
      const extratoNorm = extratoRaw.map((item, idx) => ({
        id: idx,
        praca: item.nome,
        data: new Date(item.data).toLocaleDateString('pt-BR'),
        mitigacao_kg: item.registro_economia ?? 0,
        tag: '—',
      }));

      setExtrato(extratoNorm);
    } catch (err) {
      console.error('Erro ao carregar Rastro Verde', err);
      setError(err?.response?.data?.detail ?? err.message ?? 'Erro inesperado na API');
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  return { historico, extrato, rastro, loading, error, refetch: fetchDados };
}
