import { useState, useEffect } from "react";
import { b2bService } from "../services/b2bService";

// Email padrão do usuário demo B2B (cadastrado no seed do backend)
const DEFAULT_B2B_EMAIL = 'teste.b2b@taggy.com';

/**
 * Hook para buscar dados de performance da frota (ranking e performance por categoria)
 * Utilizados na aba "Performance" do Dashboard B2B
 */
export function usePerformanceData(email = DEFAULT_B2B_EMAIL) {
  const [rankingData, setRankingData] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca dados em paralelo passando o email obrigatório
        const [rankingRes, categoryRes] = await Promise.all([
          b2bService.getRankingFrota(email),
          b2bService.getPerfbyCategoria(email),
        ]);

        // Processa dados de ranking - garante que temos no máximo Top 5
        const ranking = Array.isArray(rankingRes.data) ? rankingRes.data.slice(0, 5) : [];
        setRankingData(ranking);

        // Processa dados de categoria
        const categories = Array.isArray(categoryRes.data) ? categoryRes.data : [];
        setCategoryPerformance(categories);
      } catch (err) {
        console.error("Erro ao buscar dados de performance:", err);
        setError(err.response?.data?.detail || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, [email]);

  return { rankingData, categoryPerformance, loading, error };
}

