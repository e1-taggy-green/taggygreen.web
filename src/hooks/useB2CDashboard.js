import { useState, useEffect } from 'react';
import { b2cService } from '../services/b2cService';

// Email padrão do usuário demo B2C (cadastrado no seed do backend)
const DEFAULT_B2C_EMAIL = 'teste.b2c@taggy.com';

export function useB2CDashboard(email = DEFAULT_B2C_EMAIL) {
  const [data, setData] = useState({
    user: null,
    rastro: [],
    extrato: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        setError(null);

        // Busca dados do usuário, rastro histórico e extrato em paralelo
        const [userRes, rastroRes, extratoRes] = await Promise.all([
          b2cService.getUser(email),
          b2cService.getUserRastroHistorico(email),
          b2cService.getUserExtrato(email),
        ]);

        setData({
          user: userRes.data,
          rastro: rastroRes.data,
          extrato: extratoRes.data,
        });
      } catch (err) {
        console.error("Erro ao carregar Dashboard B2C", err);
        setError(err.response?.data?.detail || err.message || 'Erro inesperado na API');
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, [email]); 

  return { data, loading, error };
}