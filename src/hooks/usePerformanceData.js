import { useState, useEffect } from "react";
import { b2bService } from "../services/b2bService";

/**
 * Hook para buscar dados de performance da frota (ranking e performance por categoria)
 * Utilizados na aba "Performance" do Dashboard B2B
 */
export function usePerformanceData() {
  const [rankingData, setRankingData] = useState([]);
  const [categoryPerformance, setCategoryPerformance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Busca dados em paralelo
        const [rankingRes, categoryRes] = await Promise.all([
          b2bService.getRankingFrota(),
          b2bService.getPerfbyCategoria(),
        ]);

        // Processa dados de ranking - garante que temos no mínimo Top 5
        const ranking = Array.isArray(rankingRes.data) ? rankingRes.data.slice(0, 5) : [];
        setRankingData(ranking);

        // Processa dados de categoria
        const categories = Array.isArray(categoryRes.data) ? categoryRes.data : [];
        setCategoryPerformance(categories);
      } catch (err) {
        console.error("Erro ao buscar dados de performance:", err);
        setError(err.message);
        
        // Dados mock para desenvolvimento/fallback
        setRankingData([
          { rank: 1, placa: "ABC-1234", modelo: "Ford Transit", rota: "SP–Campinas", pedagios: 280, co2_mitigado: 580 },
          { rank: 2, placa: "DEF-5678", modelo: "VW Delivery", rota: "SP–Santos", pedagios: 210, co2_mitigado: 440 },
          { rank: 3, placa: "GHI-9012", modelo: "Fiat Ducato", rota: "SP–Interior", pedagios: 190, co2_mitigado: 390 },
          { rank: 4, placa: "JKL-3456", modelo: "Renault Master", rota: "SP–ABC", pedagios: 170, co2_mitigado: 310 },
          { rank: 5, placa: "MNO-7890", modelo: "Iveco Daily", rota: "SP–Litoral", pedagios: 140, co2_mitigado: 280 },
        ]);
        
        setCategoryPerformance([
          { categoria: "Carros ", pedagios: 4820, co2_evitado: 2140, cor: "#10b981" },
          { categoria: "Caminhões", pedagios: 1230, co2_evitado: 1850, cor: "#f59e0b" },
          
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchPerformanceData();
  }, []);

  return { rankingData, categoryPerformance, loading, error };
}
