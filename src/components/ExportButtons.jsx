import { useEffect, useState } from "react";
import { b2bService } from "../services/b2bService";
import { Toast } from "./Toast";

/**
 * Export Buttons Component
 * Botões de ação para download de relatórios PDF e CSV
 */
export function ExportButtons() {
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingCsv, setLoadingCsv] = useState(false);
  const [error, setError] = useState(null);
  const [toastVisible, setToastVisible] = useState(false);

  const handleDownload = async (formato) => {
    const email = "contato@empresa.com"; // Email de teste - idealmente viria do Auth Context

    try {
      setError(null);
      if (formato === 'pdf') setLoadingPdf(true);
      else setLoadingCsv(true);

      // 1. Chama a API apropriada
      const response = formato === 'pdf' 
        ? await b2bService.getRelatorioESG_PDF(email)
        : await b2bService.getRelatorioESG_csv(email);

      // 2. Cria um Blob com os dados binários recebidos
      const blob = new Blob([response.data], { 
        type: formato === 'pdf' ? 'application/pdf' : 'text/csv' 
      });

      // 3. Cria uma URL temporária e força o download no navegador
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio_esg_taggygreen.${formato}`);
      document.body.appendChild(link);
      link.click();
      
      // 4. Limpa a memória
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(`Erro ao exportar relatório em ${formato}:`, err);
      setError("Ocorreu um erro ao baixar o relatório. Tente novamente.");
      setToastVisible(true);
    } finally {
      if (formato === 'pdf') setLoadingPdf(false);
      else setLoadingCsv(false);
    }
  };

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {/* Botão CSV */}
        <button
          onClick={() => handleDownload('csv')}
          disabled={loadingCsv}
          className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Baixar relatório em formato CSV"
        >
          {loadingCsv ? "Baixando..." : "Exportar CSV"}
        </button>

        {/* Botão PDF */}
        <button
          onClick={() => handleDownload('pdf')}
          disabled={loadingPdf}
          className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-red-500 hover:text-red-700 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Baixar relatório em formato PDF"
        >
          {loadingPdf ? "Baixando..." : "Exportar PDF"}
        </button>
      </div>

      {/* Toast de Erro */}
      {toastVisible && (
        <Toast
          message={error}
          type="error"
          onClose={() => {
            setError(null);
            setToastVisible(false);
          }}
          autoCloseDuration={5000}
        />
      )}
    </>
  );
}
