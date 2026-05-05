import { useState } from 'react';
import { b2bService } from '../services/b2bService';

export function useB2BSimulador() {
  const [resultado, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const simular = async (dadosLead, dadosFrota) => {
    try {
      setLoading(true);
      setError(null);
      
      const payload = { lead: dadosLead, frota: dadosFrota };
      const response = await b2bService.postSimulacao(payload);
      
      setResult(response.data);
      return response.data; 
      
    } catch (err) {
      console.error("Erro na simulação:", err);
      setError(err.response?.data?.message || 'Falha ao processar simulação');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { simular, resultado, loading, error };
}