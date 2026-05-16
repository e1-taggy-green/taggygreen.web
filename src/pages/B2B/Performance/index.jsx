import { useState, useEffect } from "react";
import { Nav, Footer, MetricCard } from "../components/shared";
import { PerformanceDataGrid } from "../components/PerformanceDataGrid";
import { PerformanceCategoryChart } from "../components/PerformanceCategoryChart";
import { usePerformanceData } from "../hooks/usePerformanceData";

/**
 * B2B PERFORMANCE ANALYSIS PAGE
 * Exibe análise detalhada de performance da frota com:
 * - Ranking dos Top 5 veículos (DataGrid)
 * - Gráfico de barras com consumo por categoria
 * - Métricas de performance
 */
export default function PerformanceAnalysis() {
  const { rankingData, categoryPerformance, loading, error } = usePerformanceData();
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
              <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Performance da Frota
              </h1>
              <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
                Análise comparativa de eficiência por categoria de veículo e ranking dos maiores contribuintes para redução de CO₂.
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

          {/* Seletor de Período */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Período</span>
            </div>
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
          {/* Estado de Carregamento/Erro */}
          {loading && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0"></span>
              <div>
                <div className="font-bold text-blue-800 text-sm">Carregando dados...</div>
                <div className="text-xs text-blue-700">Buscando informações de performance da frota.</div>
              </div>
            </div>
          )}

          {error && !loading && (
            <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 flex gap-3">
              <span className="text-xl mt-0.5 flex-shrink-0"></span>
              <div>
                <div className="font-bold text-amber-800 text-sm mb-1">Dados não disponíveis</div>
                <div className="text-xs text-amber-700 leading-relaxed">
                  Ocorreu um erro ao carregar os dados. Exibindo dados de exemplo para referência.
                </div>
              </div>
            </div>
          )}

          {/* MÉTRICAS */}
          {!loading && (
            <div className="grid grid-cols-3 gap-4">
              <MetricCard
                icon=""
                label="Eficiência Média"
                value="78"
                unit="%"
                change="Meta: 85%"
                bg="bg-green-50"
              />
              <MetricCard
                icon=""
                label="Km com Tag"
                value="284k"
                unit="km"
                change="+9% vs mês anterior"
                bg="bg-blue-50"
              />
              <MetricCard
                icon=""
                label="Integração Tag"
                value="94"
                unit="%"
                change="940/1.000 ativos"
                bg="bg-amber-50"
              />
            </div>
          )}

          {/* Recomendação */}
          <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 flex gap-3">
            <span className="text-xl mt-0.5 flex-shrink-0"></span>
            <div>
              <div className="font-bold text-amber-800 text-sm mb-1">Oportunidade de Melhoria</div>
              <div className="text-xs text-amber-700 leading-relaxed">
                A categoria <b>Caminhões</b> apresenta maior potencial de otimização de rotas. Veículos reduziram apenas 62% do CO₂ possível — emissões evitadas podem crescer 28% com ajuste de rotas.
              </div>
            </div>
          </div>

          {/* GRÁFICO DE CATEGORIAS */}
          {!loading && (
            <PerformanceCategoryChart data={categoryPerformance} />
          )}

          {/* DATAGRID DE RANKING */}
          {!loading && (
            <PerformanceDataGrid data={rankingData} />
          )}

          {/* INSIGHTS */}
          <div className="grid grid-cols-2 gap-4">
            {/* Card Insight 1 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-5">
              <div className="text-2xl mb-2"></div>
              <div className="font-bold text-gray-900 text-sm mb-1">Impacto Direto</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                Os Top 5 veículos foram responsáveis por <strong>2.000 kg de CO₂ evitado</strong>, equivalente a plantar <strong>33 árvores</strong>.
              </div>
            </div>

            {/* Card Insight 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-5">
              <div className="text-2xl mb-2"></div>
              <div className="font-bold text-gray-900 text-sm mb-1">Retorno Financeiro</div>
              <div className="text-xs text-gray-600 leading-relaxed">
                Economia total em combustível: <strong>R$ 18.450</strong>. ROI estimado em <strong>285%</strong> para o período.
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
