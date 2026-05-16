import { useState } from "react";
import { b2bService } from "../services/b2bService";

/**
 * Custom Hook para gerenciar exportação de relatórios
 * Handles: PDF e CSV downloads com error handling e loading states
 */
export function useExportReport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const downloadFile = (blob, filename) => {
    // Cria uma URL para o blob
    const url = URL.createObjectURL(blob);
    
    // Cria um elemento anchor temporário
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    
    // Adiciona ao DOM, clica e remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Limpa a URL do blob
    URL.revokeObjectURL(url);
  };

  const exportPDF = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chama endpoint da API (US-12)
      const response = await b2bService.getRelatorioESG_PDF();

      // O response.data já é um blob quando responseType é 'blob'
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `Relatorio-TaggyGreen-Frota-${timestamp}.pdf`;

      downloadFile(response.data, filename);
    } catch (err) {
      console.error("Erro ao exportar PDF:", err);
      setError("Falha ao gerar relatório PDF neste momento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const exportCSV = async () => {
    try {
      setLoading(true);
      setError(null);

      // Chama endpoint da API (US-12)
      const response = await b2bService.getRelatorioESG_csv();

      // O response.data já é um blob quando responseType é 'blob'
      const timestamp = new Date().toISOString().slice(0, 10);
      const filename = `Relatorio-TaggyGreen-Frota-${timestamp}.csv`;

      downloadFile(response.data, filename);
    } catch (err) {
      console.error("Erro ao exportar CSV:", err);
      setError("Falha ao gerar relatório CSV neste momento. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    exportPDF,
    exportCSV,
    loading,
    error,
    clearError: () => setError(null),
  };
}
