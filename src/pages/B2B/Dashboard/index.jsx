import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, MetricCard, Progress } from "../../../components/shared";
import { usePerformanceData } from "../../../hooks/usePerformanceData";
import { PerformanceDataGrid } from "../../../components/PerformanceDataGrid";
import { PerformanceCategoryChart } from "../../../components/PerformanceCategoryChart";
import { ExportButtons } from "../../../components/ExportButtons";
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
  Map, 
  Trophy, 
  AlertTriangle, 
  Zap, 
  Wifi, 
  Truck, 
  Bike, 
  Bus 
} from "lucide-react";
import { b2bService } from "../../../services/b2bService";

class DashboardErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.toString() };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-red-200 shadow-sm max-w-2xl w-full">
            <h1 className="text-2xl font-bold text-red-600 mb-4 flex items-center gap-2"><AlertTriangle size={28} /> Ops! Algo quebrou a tela.</h1>
            <p className="text-gray-700 mb-4">Um erro inesperado aconteceu ao desenhar os componentes. O React ocultou a tela, mas aqui está o erro exato para facilitar a correção:</p>
            <pre className="bg-red-50 p-4 rounded-xl text-red-800 font-mono text-sm overflow-auto whitespace-pre-wrap">{this.state.errorMessage}</pre>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

/**
 * B2B DASHBOARD PAGE
 * Gestão de Frotas e ESG - Relatórios e performance
 */
function DashboardB2BContent() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("esg");
  const [periodo, setPeriodo] = useState("Abril/2026");
  const { rankingData, categoryPerformance, loading: perfLoading } = usePerformanceData();
  const [esgSummary, setEsgSummary] = useState(null);
  const [topVeiculos, setTopVeiculos] = useState([]);

  // Efeito para buscar os dados reais das rotas do backend
  useEffect(() => {
    const email = "contato@empresa.com"; // Email de teste - idealmente viria do Contexto de Auth
    if (tab === "esg") {
      b2bService.getRelatorioESG(email).then(res => setEsgSummary(res.data)).catch(console.error);
      b2bService.getRankingFrota(email).then(res => setTopVeiculos(res.data)).catch(console.error);
    }
  }, [tab, periodo]);

  const veiculos = [
    {rank:1, placa:"ABC-1234", modelo:"Ford Transit", rota:"SP–Campinas", pass:280, co2:580, pct:100},
    {rank:2, placa:"DEF-5678", modelo:"VW Delivery",   rota:"SP–Santos",   pass:210, co2:440, pct:76},
    {rank:3, placa:"GHI-9012", modelo:"Fiat Ducato",   rota:"SP–Interior", pass:190, co2:390, pct:67},
    {rank:4, placa:"JKL-3456", modelo:"Renault Master",rota:"SP–ABC",      pass:170, co2:310, pct:53},
    {rank:5, placa:"MNO-7890", modelo:"Iveco Daily",   rota:"SP–Litoral",  pass:140, co2:280, pct:48},
  ];

  const catPerf = [
    {icon: <Car size={18} />, cat:"Carros e Utilitários", veic:620, ef:89, co2:"2.140", pot:"+260", status:"Ótimo", color:"bg-green-500"},
    {icon: <Truck size={18} />, cat:"Caminhões e Pesados",   veic:240, ef:62, co2:"1.850", pot:"+520", status:"Atenção", color:"bg-amber-400"},
    {icon: <Bike size={18} />, cat:"Motos",                  veic:100, ef:95, co2:"385",   pot:"+20",  status:"Excelente", color:"bg-green-500"},
    {icon: <Bus size={18} />, cat:"Vans e Kombis",          veic:40,  ef:73, co2:"280",   pot:"+104", status:"Regular", color:"bg-gray-400"},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2b" />

      {/* HEADER: Ajustado padding responsivo e quebras de flex */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 pb-0">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-5 gap-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-blue-100 text-blue-700 rounded-full px-3 py-1 mb-2 uppercase tracking-wide"><LayoutDashboard size={14} /> Painel Corporativo</span>
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Gestão de Frotas e ESG</h1>
              <p className="text-sm text-gray-500 mt-0.5 max-w-lg">Acompanhe a eficiência da frota, gere relatórios auditáveis e simule o impacto sustentável.</p>
            </div>
            <div className="flex gap-2 flex-wrap w-full md:w-auto">
              <div className="flex-1 md:flex-initial"><ExportButtons /></div>
              {/* <button onClick={() => navigate('/b2b/simulador')} className="flex items-center justify-center gap-1.5 text-xs font-bold bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-all shadow-md shadow-green-100 flex-1 md:flex-initial"><Calculator size={14} /> Simulador</button> */}
            </div>
          </div>
          
          {/* TABS RESPONSIVAS: Rolagem lateral se faltar espaço no celular */}
          <div className="flex gap-0 overflow-x-auto whitespace-nowrap scrollbar-none">
            {[{id:"esg",label:"Relatório ESG", icon: FileText},{id:"performance",label:"Performance", icon: Activity}].map(t => {
              const Icon = t.icon;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex items-center gap-2 px-5 py-3 text-sm font-semibold border-b-2 transition-all flex-shrink-0 ${tab===t.id?"border-green-500 text-green-700":"border-transparent text-gray-500 hover:text-gray-900"}`}>
                  <Icon size={16} /> {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* CONTENT: Ajustado padding lateral */}
      <div className="flex-1 bg-gray-50 px-4 sm:px-6 py-6 sm:py-7">
        <div className="max-w-6xl mx-auto">

          {/* ESG TAB */}
          {tab === "esg" && (
            <div className="space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <div className="font-black text-xl text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Resumo de Sustentabilidade</div>
                  <div className="text-sm text-gray-500">Impacto sustentável da frota com o uso da Tag Edenred.</div>
                </div>
                <select value={periodo} onChange={e => setPeriodo(e.target.value)}
                  className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white focus:outline-none focus:border-green-500 w-full sm:w-auto">
                  {["Abril/2026","Março/2026","Fevereiro/2026","Janeiro/2026"].map(p => <option key={p}>{p}</option>)}
                </select>
              </div>

              {/* 6 METRICS: Corrigido o grid de 3 colunas esmagadas para se adaptar em telas menores */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard icon={<Leaf size={20} />} label="CO₂ Evitado"         value={esgSummary?.co2_evitado_kg?.toLocaleString(undefined, {maximumFractionDigits: 1}) || "4.375"} unit="kg"    change="Atualizado" bg="bg-green-50"/>
                <MetricCard icon={<Fuel size={20} />} label="Combustível Poupado"  value={esgSummary?.combustivel_evitado_litros?.toLocaleString(undefined, {maximumFractionDigits: 1}) || "1.470"} unit="L"     change="Atualizado"  bg="bg-blue-50"/>
                <MetricCard icon={<Clock size={20} />} label="Tempo Otimizado"      value={esgSummary ? Math.round(esgSummary.tempo_economizado_minutos / 60).toLocaleString() : "142"}   unit="hrs"   change="Atualizado"        bg="bg-amber-50"/>
                <MetricCard icon={<Car size={20} />} label="Frota Total"          value={esgSummary?.frota_total?.toLocaleString() || "1.000"} unit="veíc." change="Veículos ativos"        bg="bg-teal-50"/>
                <MetricCard icon={<Coins size={20} />} label="R$ Economizado"       value={esgSummary?.economia_financeira?.toLocaleString(undefined, {maximumFractionDigits: 2}) || "18.450"} unit="R$"   change="Estimativa real"           bg="bg-purple-50"/>
                <MetricCard icon={<Activity size={20} />} label="ROI"                  value={esgSummary?.roi?.toLocaleString() || "285"}   unit="%"     change="Excelente performance"  bg="bg-red-50"/>
              </div>

              {/* GHG: Ajustado flex para empilhar no mobile caso necessário */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="text-3xl flex-shrink-0 text-blue-500"><BadgeCheck size={32} /></div>
                <div className="flex-1">
                  <div className="font-bold text-blue-900 mb-1">Dados Certificados — GHG Protocol</div>
                  <div className="text-sm text-blue-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3. Utilize os botões de exportação para baixar o documento completo.</div>
                </div>
                <span className="flex-shrink-0 text-xs font-bold bg-blue-200 text-blue-800 px-3 py-1 rounded-full mt-2 sm:mt-0">Auditável</span>
              </div>

              {/* TABLE + RANKING: Removido as 5 colunas fixas e imposto quebra em bloco vertical abaixo de telas grandes (lg) */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                
                {/* Tabela passagens */}
                <div className="col-span-1 lg:col-span-3 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm overflow-x-auto">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between min-w-[400px]">
                    <div className="font-bold text-gray-800 text-sm flex items-center gap-2"><Map size={18} /> Passagens por Categoria</div>
                    <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">{periodo}</span>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm min-w-[450px]">
                      <thead><tr className="bg-gray-50">
                        {["Categoria","Passagens","CO₂ Evitado","Economia"].map(h => <th key={h} className="text-left px-4 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-wide">{h}</th>)}
                      </tr></thead>
                      <tbody>
                        {[
                          [<Car size={16} />, "Carros","4.820","2.140 kg","R$ 8.950"],
                          [<Truck size={16} />, "Caminhões","1.230","1.850 kg","R$ 7.200"],
                          [<Bike size={16} />, "Motos","980","385 kg","R$ 1.800"],
                          [<LayoutDashboard size={16} />, "Estacionamentos","2.400","0 kg","R$ 500"],
                        ].map(([icon, c, p, co2, eco], i) => (
                          <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-800 font-medium">
                              <div className="flex items-center gap-2 text-gray-500">{icon} <span className="text-gray-800">{c}</span></div>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{p}</td>
                            <td className="px-4 py-3 text-green-600 font-bold">{co2}</td>
                            <td className="px-4 py-3 text-gray-600">{eco}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Ranking */}
                <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm flex items-center gap-2"><Trophy size={18} /> Top Veículos</div>
                  {(topVeiculos.length > 0 ? topVeiculos : veiculos.map(v => ({posicao: v.rank, placa: v.placa, tipo: v.modelo, co2_evitado_kg: v.co2, transacoes: v.pass, pct: v.pct}))).map(v => (
                    <div key={v.posicao} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${v.posicao===1?"bg-amber-100 text-amber-800":v.posicao===2?"bg-gray-200 text-gray-700":v.posicao===3?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-500"}`}>{v.posicao}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-gray-800 truncate">{v.placa} · {v.tipo}</div>
                        <div className="text-xs text-gray-400">{v.transacoes} transações</div>
                        <div className="mt-1.5"><Progress value={v.pct || Math.min(100, v.transacoes * 10)}/></div>
                      </div>
                      <div className="text-xs font-bold text-green-600 flex-shrink-0">+{v.co2_evitado_kg} kg</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PERFORMANCE TAB */}
          {tab === "performance" && (
            <div className="space-y-5">
              <div className="bg-amber-50 border border-amber-200 border-l-4 border-l-amber-500 rounded-2xl p-4 flex gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0 text-amber-500"><AlertTriangle size={24} /></span>
                <div>
                  <div className="font-bold text-amber-800 text-sm mb-1">Oportunidade de Melhoria</div>
                  <div className="text-xs text-amber-700 leading-relaxed">A categoria <b>Caminhões</b> apresenta maior potencial de otimização de rotas. Veículos reduziram apenas 62% do CO₂ possível — emissões evitadas podem crescer 28% com ajuste de rotas.</div>
                </div>
              </div>

              {/* METRICS PERFORMANCE: Também ajustado para se adequar ao mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <MetricCard icon={<Zap size={20} />} label="Eficiência Média"    value="78"   unit="%" change="Meta: 85%" bg="bg-green-50"/>
                <MetricCard icon={<Map size={20} />} label="Km com Tag"          value="284k" unit="km" change="+9% vs mês anterior" bg="bg-blue-50"/>
                <MetricCard icon={<Wifi size={20} />} label="Integração Tag"      value="94"   unit="%" change="940/1.000 ativos" bg="bg-amber-50"/>
              </div>

              {/* Gráfico de Categorias */}
              {!perfLoading && (
                <div className="w-full overflow-x-auto bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                  <PerformanceCategoryChart data={categoryPerformance} />
                </div>
              )}

              {/* DataGrid de Ranking */}
              {!perfLoading && (
                <div className="w-full overflow-x-auto">
                  <PerformanceDataGrid data={rankingData} />
                </div>
              )}

              {/* Fallback - Tabela Performance por Categoria (quando não há dados do gráfico) */}
              {perfLoading && (
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm overflow-x-auto">
                  <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between min-w-[500px]">
                    <div className="font-bold text-gray-800 text-sm flex items-center gap-2"><Activity size={18} /> Performance por Categoria</div>
                    <span className="text-xs bg-gray-100 text-gray-600 font-bold px-2 py-0.5 rounded-full">Abr/2026</span>
                  </div>
                  <div className="w-full overflow-x-auto">
                    <table className="w-full text-sm min-w-[600px]">
                      <thead><tr className="bg-gray-50">
                        {["Categoria","Veículos","Eficiência","CO₂ Evitado","Potencial","Status"].map(h => (
                          <th key={h} className="text-left px-4 py-2.5 text-xs text-gray-400 font-bold uppercase tracking-wide">{h}</th>
                        ))}
                      </tr></thead>
                      <tbody>
                        {catPerf.map((row,i) => (
                          <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-3 text-gray-800 font-medium">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">{row.icon}</span> {row.cat}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-gray-600">{row.veic}</td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-2">
                                <div className="w-20"><Progress value={row.ef} color={row.color}/></div>
                                <span className="text-xs text-gray-600 font-semibold">{row.ef}%</span>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-green-600 font-bold">{row.co2} kg</td>
                            <td className={`px-4 py-3 text-xs font-bold ${row.status==="Atenção"?"text-amber-600":"text-gray-400"}`}>{row.pot} kg</td>
                            <td className="px-4 py-3">
                              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                                row.status==="Excelente"?"bg-green-100 text-green-800":
                                row.status==="Ótimo"?"bg-green-100 text-green-700":
                                row.status==="Atenção"?"bg-amber-100 text-amber-800":
                                "bg-gray-100 text-gray-600"}`}>{row.status}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ASSET OCULTO PARA O PDF NATIVO */}
      <div style={{ position: "fixed", top: "200vh", pointerEvents: "none" }}>
        <div id="pdf-chart-container" className="w-[700px] h-[350px] bg-white p-4">
          {!perfLoading && <PerformanceCategoryChart data={categoryPerformance} />}
        </div>
      </div>

      <Footer/>
    </div>
  );
}

export default function DashboardB2B() {
  return (
    <DashboardErrorBoundary>
      <DashboardB2BContent />
    </DashboardErrorBoundary>
  );
}