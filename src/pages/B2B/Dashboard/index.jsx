import { useState, useEffect } from "react";
import { Nav, Footer, MetricCard, Progress } from "../../../components/shared";
import { b2bService } from "../../../services/b2bService";

/**
 * B2B DASHBOARD PAGE
 * Gestão de Frotas e ESG - Relatórios e performance
 */
export default function DashboardB2B() {
  const [tab, setTab] = useState("esg");
  const [periodo, setPeriodo] = useState("Abril/2026");
  const [dadosEsg, setDadosEsg] = useState(null);
  const [ranking, setRanking] = useState([]);
  const [performanceCat, setPerformanceCat] = useState([]);
  const [loading, setLoading] = useState(true);
  const emailGestor = "teste.b2b@taggy.com";

  useEffect(() => {
    const fetchDashboard = async () => {
      setLoading(true);

      // Requisições separadas para não quebrar a tela toda se 1 falhar
      try {
        const resEsg = await b2bService.getRelatorioESG(emailGestor);
        setDadosEsg(resEsg.data);
      } catch (err) {
        console.error("Erro ao buscar ESG:", err);
      }

      try {
        const resRanking = await b2bService.getRankingFrota(emailGestor);
        setRanking(resRanking.data || []);
      } catch (err) {
        console.error("Erro ao buscar Ranking:", err);
      }

      try {
        const resPerf = await b2bService.getPerfbyCategoria(emailGestor);
        setPerformanceCat(resPerf.data || []);
      } catch (err) {
        console.error("Erro ao buscar Categorias:", err);
      }

      setLoading(false);
    };
    fetchDashboard();
  }, []);

  // Função para processar os relatórios baixáveis (PDF e CSV)
  const handleDownload = async (tipo) => {
    try {
      const response = tipo === 'pdf' 
        ? await b2bService.getRelatorioESG_PDF(emailGestor)
        : await b2bService.getRelatorioESG_csv(emailGestor);
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `relatorio_esg_${periodo.replace('/', '_')}.${tipo}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(`Erro ao baixar ${tipo}:`, err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2b" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-3 py-1 mb-2 uppercase tracking-wide">🏢 Painel Corporativo</span>
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Gestão de Frotas e ESG</h1>
              <p className="text-sm text-gray-500 mt-0.5 max-w-lg">Acompanhe a eficiência da frota, gere relatórios auditáveis e simule o impacto sustentável.</p>
            </div>
            <div className="flex gap-2 flex-wrap">
              <button onClick={() => handleDownload('csv')} className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all">📊 Exportar CSV/Excel</button>
              <button onClick={() => handleDownload('pdf')} className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all">📄 Baixar PDF Auditável</button>
              <button className="flex items-center gap-1.5 text-xs font-bold bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-all shadow-md shadow-green-100">🌱 Simulador</button>
            </div>
          </div>
          <div className="flex gap-0">
            {[{id:"esg",label:"📈 Relatório ESG"},{id:"performance",label:"⚡ Performance"}].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${tab===t.id?"border-green-500 text-green-700":"border-transparent text-gray-500 hover:text-gray-900"}`}>
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto">

          {/* ESG TAB */}
          {tab === "esg" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="font-black text-xl text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Resumo de Sustentabilidade</div>
                  <div className="text-sm text-gray-500">Impacto sustentável da frota com o uso da Tag Edenred.</div>
                </div>
                <select value={periodo} onChange={e => setPeriodo(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-green-500">
                  {["Abril/2026","Março/2026","Fevereiro/2026","Janeiro/2026"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              {/* 6 metrics */}
              <div className="grid grid-cols-3 gap-4">
                <MetricCard icon="🌿" label="CO₂ Evitado"         value={loading ? "..." : dadosEsg?.co2_evitado_kg ?? "4.375"} unit="kg"    change="+12% vs mês anterior" bg="bg-green-50"/>
                <MetricCard icon="⛽" label="Combustível Poupado"  value={loading ? "..." : dadosEsg?.combustivel_evitado_litros ?? "1.470"} unit="L"     change="+8% vs mês anterior"  bg="bg-blue-50"/>
                <MetricCard icon="⏱️" label="Tempo Otimizado"      value={loading ? "..." : dadosEsg?.tempo_economizado_minutos ?? "142"}   unit="min"   change="+5% eficiência"        bg="bg-amber-50"/>
                <MetricCard icon="🚚" label="Frota Total"          value={loading ? "..." : dadosEsg?.frota_total ?? "1.000"} unit="veíc." change="+50 integrados"        bg="bg-teal-50"/>
                <MetricCard icon="💰" label="R$ Economizado"       value={loading ? "..." : dadosEsg?.economia_financeira ?? "18.450"} unit="R$"   change="+18% retorno"          bg="bg-purple-50"/>
                <MetricCard icon="📈" label="ROI"                  value={loading ? "..." : dadosEsg?.roi_percentual ?? "285"}   unit="%"     change="Excelente performance"  bg="bg-red-50"/>
              </div>

              {/* GHG */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 flex items-center gap-4">
                <div className="text-3xl flex-shrink-0">✅</div>
                <div className="flex-1">
                  <div className="font-bold text-blue-900 mb-1">Dados Certificados — GHG Protocol</div>
                  <div className="text-sm text-blue-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3. Utilize os botões de exportação para baixar o documento completo.</div>
                </div>
                <span className="flex-shrink-0 text-xs font-bold bg-blue-200 text-blue-800 px-3 py-1 rounded-full">Auditável</span>
              </div>
            </div>
          )}

          {/* PERFORMANCE TAB */}
          {tab === "performance" && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 flex gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">⚠️</span>
                <div>
                  <div className="font-bold text-amber-800 text-sm mb-1">Oportunidade de Melhoria</div>
                  <div className="text-xs text-amber-700 leading-relaxed">A categoria <b>Caminhões</b> apresenta maior potencial de otimização de rotas. Veículos reduziram apenas 62% do CO₂ possível — emissões evitadas podem crescer 28% com ajuste de rotas.</div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <MetricCard icon="⚡" label="Eficiência Média"    value="78"   unit="%" change="Meta: 85%" bg="bg-green-50"/>
                <MetricCard icon="🛣️" label="Km com Tag"          value="284k" unit="km" change="+9% vs mês anterior" bg="bg-blue-50"/>
                <MetricCard icon="📡" label="Integração Tag"      value="94"   unit="%" change="940/1.000 ativos" bg="bg-amber-50"/>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                  <div className="font-bold text-gray-800 text-sm">⚡ Performance por Categoria</div>
                  <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">Abr/2026</span>
                </div>
                <table className="w-full text-sm">
                  <thead><tr className="bg-gray-50">
                    {["Categoria","Veículos","Eficiência","CO₂ Evitado","Potencial","Status"].map(h => (
                      <th key={h} className="text-left px-4 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-wide">{h}</th>
                    ))}
                  </tr></thead>
                  <tbody>
                    {performanceCat.map((row,i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800 font-medium">{row.icon || ""} {row.categoria || row.cat || "-"}</td>
                        <td className="px-4 py-3 text-gray-600">{row.veiculos || row.veic || "-"}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-20"><Progress value={row.eficiencia || row.ef || 0} color={row.color || "bg-green-500"}/></div>
                            <span className="text-xs text-gray-600 font-semibold">{row.eficiencia || row.ef || 0}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-green-600 font-bold">{row.co2_evitado || row.co2 || "-"} kg</td>
                        <td className={`px-4 py-3 text-xs font-bold ${row.status==="Atenção"?"text-amber-600":"text-gray-400"}`}>{row.potencial || row.pot || "-"} kg</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                            row.status==="Excelente"?"bg-green-100 text-green-800":
                            row.status==="Ótimo"?"bg-green-100 text-green-700":
                            row.status==="Atenção"?"bg-amber-100 text-amber-800":
                            "bg-gray-100 text-gray-600"}`}>{row.status || "-"}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Table + Ranking (Movido da aba ESG) */}
              <div className="grid grid-cols-5 gap-4">
                {/* Tabela passagens */}
                <div className="col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="font-bold text-gray-800 text-sm flex items-center gap-2">🛣️ Passagens por Categoria</div>
                    <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">{periodo}</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead><tr className="bg-gray-50">
                      {["Categoria","Passagens","CO₂ Evitado","Economia"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-wide">{h}</th>)}
                    </tr></thead>
                    <tbody>
                      {performanceCat.map((row, i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-800 font-medium">{row.icon || ""} {row.categoria || row.cat || "-"}</td>
                          <td className="px-4 py-3 text-gray-600">{row.passagens || row.pass || "-"}</td>
                          <td className="px-4 py-3 text-green-600 font-bold">{row.co2_evitado || row.co2 || "-"} kg</td>
                          <td className="px-4 py-3 text-gray-600">{row.economia || "-"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ranking */}
                <div className="col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm">🏆 Top Veículos</div>
                  {ranking.map((v, index) => {
                    const rank = index + 1;
                    return (
                      <div key={rank} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${rank===1?"bg-amber-100 text-amber-800":rank===2?"bg-gray-200 text-gray-700":rank===3?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-500"}`}>{rank}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs text-gray-800 truncate">{v.placa || "-"} · {v.modelo || "-"}</div>
                          <div className="text-xs text-gray-400">{v.rota || "-"}</div>
                          <div className="mt-1.5"><Progress value={v.pct || 0}/></div>
                        </div>
                        <div className="text-xs font-bold text-green-600 flex-shrink-0">+{v.co2_evitado || v.co2 || 0} kg</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}