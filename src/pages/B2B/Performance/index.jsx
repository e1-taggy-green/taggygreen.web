import { useState } from "react";
import { Nav, Footer } from "../../../components/shared";
import { PerformanceCategoryChart } from "../../../components/PerformanceCategoryChart";
import { PerformanceDataGrid } from "../../../components/PerformanceDataGrid";
import { usePerformanceData } from "../../../hooks/usePerformanceData";

export default function PerformanceAnalysis() {
  const { rankingData, categoryPerformance, loading } = usePerformanceData();
  const [periodo, setPeriodo] = useState("Abril/2026");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2b" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-6">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-3 py-1 mb-2 uppercase tracking-wide">
                Análise de Performance
              </span>
              <h1
                className="text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Performance da Frota
              </h1>
              <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
                Acompanhe o desempenho das diferentes categorias de veículos da
                sua frota. Cada categoria mostra o CO₂ evitado e combustível
                economizado com o uso da Tag Edenred.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all">
                Exportar CSV
              </button>
              <button className="flex items-center gap-1.5 text-xs font-bold bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-all shadow-md shadow-green-100">
                Baixar PDF
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Período
            </span>
            <select
              value={periodo}
              onChange={(e) => setPeriodo(e.target.value)}
              className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-green-500 font-medium"
            >
              {["Abril/2026", "Março/2026", "Fevereiro/2026", "Janeiro/2026"].map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto space-y-5">

          {loading ? (
            <>
              <div className="h-80 rounded-2xl animate-pulse bg-gray-100" />
              <div className="h-64 rounded-2xl animate-pulse bg-gray-100" />
            </>
          ) : (
            <>
              <PerformanceCategoryChart data={categoryPerformance} />
              <PerformanceDataGrid data={rankingData} />
            </>
          )}

        </div>
      </div>

      <Footer />
    </div>
  );
}
