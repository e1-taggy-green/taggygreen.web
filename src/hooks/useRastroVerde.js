import { useState, useEffect, useCallback } from 'react';
import { b2cService } from '../services/b2cService';

/**
 * Hook que centraliza os fetches assíncronos da tela Meu Rastro Verde.
 * Consome getUserRastroHistorico e getUserExtrato do b2cService existente.
 * Re-dispara automaticamente quando `filtro` muda.
 *
 * Contrato esperado de getUserRastroHistorico:
 *   { co2_evitado: number, historico: Array<{ mes, kg }>, arvores_equivalentes, litros_agua, horas_vento }
 *
 * Contrato esperado de getUserExtrato:
 *   Array<{ id, data, praca, mitigacao_kg, tag }>
 *
 * @param {string} filtro  "4meses" | "mensal" | "semanal"
 */
export function useRastroVerde(filtro = "4meses") {
  const [historico, setHistorico] = useState([]);
  const [extrato,   setExtrato]   = useState([]);
  const [rastro,    setRastro]    = useState(null);
  const [loading,   setLoading]   = useState(true);
  const [error,     setError]     = useState(null);

  const fetchDados = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      // Executa os dois fetches em paralelo — menor latência
      const [resHistorico, resExtrato] = await Promise.all([
        b2cService.getUserRastroHistorico(),
        b2cService.getUserExtrato(),
      ]);

      const dadosRastro = resHistorico.data;
      setRastro(dadosRastro);
      setHistorico(dadosRastro.historico ?? []);
      setExtrato(Array.isArray(resExtrato.data) ? resExtrato.data : []);
    } catch (err) {
      console.error("Erro ao carregar Rastro Verde", err);
      setError(err?.response?.data?.message ?? err.message ?? 'Erro inesperado na API');
    } finally {
      setLoading(false);
    }
  }, [filtro]);

  useEffect(() => {
    fetchDados();
  }, [fetchDados]);

  return { historico, extrato, rastro, loading, error, refetch: fetchDados };
}
