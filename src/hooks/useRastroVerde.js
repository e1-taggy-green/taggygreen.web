import { useState, useEffect, useCallback } from 'react';
import { b2cService } from '../services/b2cService';

/**
 * Hook que centraliza os fetches da tela Meu Rastro Verde.
 * Consome os endpoints reais do backend:
 *   GET /api/v1/b2c/user/rastro-historico
 *     → array de { mes: string, co2_economizado: number }
 *   GET /api/v1/b2c/user/extrato
 *     → array de { nome: string, data: string, registro_economia: number }
 *   GET /api/v1/b2c/user/equivalencias
 *     → { arvores, combustivel_litros, horas_led, co2_total_kg }
 *
 * IMPORTANTE: as equivalências (árvores, combustível em litros e horas de LED)
 * NÃO são mais calculadas no front. Todos os valores vêm prontos do backend.
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
      const [resHistorico, resExtrato, resEquivalencias] = await Promise.all([
        b2cService.getUserRastroHistorico(),
        b2cService.getUserExtrato(),
        b2cService.getUserEquivalencias(),
      ]);

      // Contrato: array de { mes, co2_economizado }
      const historicoRaw = Array.isArray(resHistorico.data) ? resHistorico.data : [];

      // Normaliza para o formato usado nos gráficos: { mes, kg }
      const historicoNorm = historicoRaw.map((item) => ({
        mes: item.mes,
        kg: item.co2_economizado ?? 0,
      }));

      setHistorico(historicoNorm);

      // Equivalências calculadas pelo backend (sem nenhuma conta no front).
      // Contrato: { arvores, combustivel_litros, horas_led, co2_total_kg }
      const eq = resEquivalencias.data ?? {};

      setRastro({
        co2_evitado: eq.co2_total_kg ?? 0,
        arvores: eq.arvores ?? 0,
        combustivel_litros: eq.combustivel_litros ?? 0,
        horas_led: eq.horas_led ?? 0,
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