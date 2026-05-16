import { useEffect, useState } from "react";
import { useExportReport } from "../hooks/useExportReport";
import { Toast } from "./Toast";

/**
 * Export Buttons Component
 * Botões de ação para download de relatórios PDF e CSV
 */
export function ExportButtons() {
  const { exportPDF, exportCSV, loading, error, clearError } = useExportReport();
  const [toastVisible, setToastVisible] = useState(false);

  // Mostra toast quando há erro
  useEffect(() => {
    if (error) {
      setToastVisible(true);
    }
  }, [error]);

  return (
    <>
      <div className="flex gap-2 flex-wrap">
        {/* Botão CSV */}
        <button
          onClick={exportCSV}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Baixar relatório em formato CSV"
        >
          <span className={loading ? "animate-spin" : ""}></span>
          {loading ? "Processando..." : "Exportar CSV"}
        </button>

        {/* Botão PDF */}
        <button
          onClick={exportPDF}
          disabled={loading}
          className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-red-500 hover:text-red-700 hover:bg-red-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          title="Baixar relatório em formato PDF"
        >
          <span className={loading ? "animate-spin" : ""}></span>
          {loading ? "Processando..." : "Exportar PDF"}
        </button>
      </div>

      {/* Toast de Erro */}
      <Toast
        message={error}
        type="error"
        onClose={() => {
          clearError();
          setToastVisible(false);
        }}
        autoCloseDuration={5000}
      />
    </>
  );
}
