import { useState, useEffect } from 'react';
import { b2cService } from '../services/b2cService';

export function useB2CDashboard() {
  const [data, setData] = useState({
    user: null,
    rastro: null,
    extrato: [],
    destaques: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        
        const [userRes, rastroRes, extratoRes, destaquesRes] = await Promise.all([
          b2cService.getUser(),
          b2cService.getUserRastroHistorico(),
          b2cService.getUserExtrato(),
          b2cService.getDestaqueMP()
        ]);

        setData({
          user: userRes.data,
          rastro: rastroRes.data,
          extrato: extratoRes.data,
          destaques: destaquesRes.data
        });
      } catch (err) {
        console.error("Erro ao carregar Dashboard B2C", err);
        setError(err.message || 'Erro inesperado na API');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []); 

  return { data, loading, error };
}