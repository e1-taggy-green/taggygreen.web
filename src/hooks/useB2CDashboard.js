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
        
        // Simulando a resposta da API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          user: { userName: 'Usuário de Teste', userPoints: 1250 },
          rastro: { co2Evitado: 45, arvoresSalvas: 4.5, kmPoupados: 450, horasLampada: 225 },
          extrato: [],
          destaques: []
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