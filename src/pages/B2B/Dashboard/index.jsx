import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, MetricCard } from "../../../components/shared";
import { usePerformanceData } from "../../../hooks/usePerformanceData";
import { PerformanceCategoryChart } from "../../../components/PerformanceCategoryChart";
import { PerformanceDataGrid } from "../../../components/PerformanceDataGrid";
import { useExportReport } from "../../../hooks/useExportReport";
import { useSpinner } from "../../../contexts/SpinnerContext";
import {
  LayoutDashboard,
  Calculator,
  FileText,
  Activity,
  Leaf,
  Fuel,
  Clock,
  Car,
  Coins,
  BadgeCheck,
  AlertTriangle,
} from "lucide-react";
import { b2bService } from "../../../services/b2bService";
import { DEFAULT_B2B_EMAIL } from "../../../config";

function DashboardB2BContent() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("esg");
  const [periodo, setPeriodo] = useState("Abril/2026");
  const { rankingData, categoryPerformance, loading: perfLoading } = usePerformanceData(DEFAULT_B2B_EMAIL);
  const [esgSummary, setEsgSummary] = useState(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const { exportPDF, exportCSV, loading: exportLoading } = useExportReport({ showSpinner, hideSpinner });

  useEffect(() => {
    if (tab === "esg") {
      b2bService.getRelatorioESG(DEFAULT_B2B_EMAIL).then(res => setEsgSummary(res.data)).catch(console.error);
    }
  }, [tab]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2b" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 sm:mb-5 gap-3 sm:gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-3 py-1 mb-2 uppercase tracking-wide">
                <LayoutDashboard size={14} /> Painel Corporativo
              </span>
              <h1
                className="text-xl sm:text-2xl font-black text-gray-900"
                style={{ fontFamily: "'Syne',sans-serif" }}
              >
                Gestão de Frotas e ESG
              </h1>
              <p className="text-sm text-gray-500 mt-0.5 max-w-lg">
                Acompanhe a eficiência da frota, gere relatórios auditáveis e
                simule o impacto sustentável.
              </p>
            </div>
            <div className="flex gap-2 flex-wrap w-full sm:w-auto">
              {/* Exportar CSV — Front-end nativo */}
              <button
                onClick={exportCSV}
                disabled={exportLoading}
                className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-blue-500 hover:text-blue-700 hover:bg-blue-50 transition-all disabled:opacity-50"
              >
                {exportLoading ? "Exportando..." : "Exportar CSV"}
              </button>
              {/* Baixar PDF — Front-end nativo */}
              <button
                onClick={() => exportPDF(esgSummary)}
                disabled={exportLoading}
                className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-red-500 hover:text-red-700 hover:bg-red-50 transition-all disabled:opacity-50"
              >
                {exportLoading ? "Gerando..." : "Baixar PDF Auditável"}
              </button>
              <button
                onClick={() => navigate("/b2b/simulador")}
                className="flex items-center gap-1.5 text-xs font-bold bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-all shadow-md shadow-green-100"
              >
                <Calculator size={14} /> Simulador
              </button>
            </div>
          </div>
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {[
              { id: "esg", label: "Relatório ESG", icon: FileText },
              { id: "performance", label: "Performance", icon: Activity },
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                    tab === t.id
                      ? "border-green-500 text-green-700"
                      : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto">

          {/* ESG TAB */}
          {tab === "esg" && (
            <div className="space-y-5">
              <div>
                <div className="font-black text-xl text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Resumo de Sustentabilidade
                </div>
                <div className="text-sm text-gray-500">
                  Impacto sustentável da frota com o uso da Tag Edenred.
                </div>
              </div>

              {/* 6 metrics */}
              <div className="grid grid-cols-3 gap-4">
                <MetricCard icon={<Leaf size={20} />} label="CO₂ Evitado"         value={esgSummary?.co2_evitado_kg?.toLocaleString(undefined, {maximumFractionDigits: 1}) || "4.375"} unit="kg"    change="Atualizado" bg="bg-green-50"/>
                <MetricCard icon={<Fuel size={20} />} label="Combustível Poupado"  value={esgSummary?.combustivel_evitado_litros?.toLocaleString(undefined, {maximumFractionDigits: 1}) || "1.470"} unit="L"     change="Atualizado"  bg="bg-blue-50"/>
                <MetricCard icon={<Clock size={20} />} label="Tempo Otimizado"      value={esgSummary ? Math.round(esgSummary.tempo_economizado_minutos / 60).toLocaleString() : "142"}   unit="hrs"   change="Atualizado"        bg="bg-amber-50"/>
                <MetricCard icon={<Car size={20} />} label="Frota Total"          value={esgSummary?.frota_total?.toLocaleString() || "1.000"} unit="veíc." change="Veículos ativos"        bg="bg-teal-50"/>
                <MetricCard icon={<Coins size={20} />} label="R$ Economizado"       value={esgSummary?.economia_financeira?.toLocaleString(undefined, {maximumFractionDigits: 2}) || "18.450"} unit="R$"   change="Estimativa real"          bg="bg-purple-50"/>
                <MetricCard icon={<Activity size={20} />} label="ROI"                  value={esgSummary?.roi_percentual?.toLocaleString(undefined, {maximumFractionDigits: 1}) || "285"}   unit="%"     change="Excelente performance"  bg="bg-red-50"/>
              </div>

              {/* GHG */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="text-3xl flex-shrink-0 text-blue-500">
                  <BadgeCheck size={32} />
                </div>
                <div className="flex-1">
                  <div className="font-bold text-blue-900 mb-1">
                    Dados Certificados — GHG Protocol
                  </div>
                  <div className="text-sm text-blue-700 leading-relaxed">
                    Todos os cálculos estão em conformidade com as diretrizes
                    do GHG Protocol para emissões de escopo 1 e 3. Utilize os
                    botões de exportação para baixar o documento completo.
                  </div>
                </div>
                <span className="flex-shrink-0 text-xs font-bold bg-blue-200 text-blue-800 px-3 py-1 rounded-full">
                  Auditável
                </span>
              </div>
            </div>
          )}

          {/* PERFORMANCE TAB */}
          {tab === "performance" && (
            <div className="space-y-5">
              {perfLoading ? (
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
          )}
        </div>
      </div>

      {/* Container oculto para captura do gráfico no PDF */}
      <div style={{ position: "fixed", top: "200vh", pointerEvents: "none" }}>
        <div id="pdf-chart-container" className="w-[700px] h-[350px] bg-white p-4">
          {!perfLoading && (
            <PerformanceCategoryChart data={categoryPerformance} />
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function DashboardB2B() {
  return <DashboardB2BContent />;
}
