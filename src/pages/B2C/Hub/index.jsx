import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, MetricCard, Progress } from "../../../components/shared";
import { Coins, Leaf, Fuel, MapPin, Star, BadgeCheck, Car, Loader2 } from "lucide-react";
import { useB2CDashboard } from "../../../hooks/useB2CDashboard";

/**
 * B2C HUB PAGE
 * Portal do Motorista - Acompanhe seu rastro de CO₂ e marketplace
 * Agora conectado à API real via useB2CDashboard hook.
 */
export default function HubB2C() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("rastro");
  const { data, loading, error } = useB2CDashboard();

  // Dados do usuário vindos da API (com fallback seguro)
  const userName = data.user?.userName || "Motorista";
  const userPoints = data.user?.userPoints ?? 0;

  // Último mês do rastro histórico (para o hero card)
  const ultimoMesRastro = data.rastro?.length > 0 ? data.rastro[data.rastro.length - 1] : null;
  const co2UltimoMes = ultimoMesRastro?.co2_economizado ?? 0;
  const labelUltimoMes = ultimoMesRastro?.mes ?? "—";

  // Formatação de pontos para exibição (ex: 1.250 pts)
  const pontosFormatados = userPoints.toLocaleString("pt-BR", { maximumFractionDigits: 1 });

  // Ícone baseado no tipo do evento (extrato)
  const getEventIcon = (nome) => {
    if (nome?.toLowerCase().includes("pedágio")) return <MapPin size={18} className="text-green-600" />;
    if (nome?.toLowerCase().includes("estacionamento")) return <Car size={18} className="text-green-600" />;
    return <Fuel size={18} className="text-green-600" />;
  };

  // Formata data do evento para exibição legível
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const day = d.getDate();
    const months = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const month = months[d.getMonth()];
    const hours = d.getHours().toString().padStart(2, "0");
    const minutes = d.getMinutes().toString().padStart(2, "0");
    return `${day} ${month} · ${hours}:${minutes}`;
  };

export function calcularEquivalencia(totalKg) {
  const arvores = Math.floor(totalKg / FATOR_ARVORE);
  const restoKg = parseFloat((totalKg % FATOR_ARVORE).toFixed(1));
  if (arvores >= 1) return { arvores, restoKg, mensagem: `Você mitigou o equivalente a ${arvores} ${arvores === 1 ? "Árvore plantada" : "Árvores plantadas"} esse ano!` };
  if (totalKg >= 10) return { arvores: 0, restoKg: totalKg, mensagem: `Você ajudou a limpar o ar de ${Math.ceil(totalKg / 0.8)} quadras` };
  if (totalKg >= 5)  return { arvores: 0, restoKg: totalKg, mensagem: "Você compensou o equivalente a 500 respirações limpas" };
  if (totalKg >= 1)  return { arvores: 0, restoKg: totalKg, mensagem: "Cada pedágio conta! Sua pegada está diminuindo" };
  return               { arvores: 0, restoKg: totalKg, mensagem: "Sua jornada verde está prestes a começar!" };
}

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-md text-sm">
        <p className="font-bold text-gray-600">{label}</p>
        <p className="text-green-600 font-black">{payload[0].value.toFixed(1).replace(".", ",")} kg CO₂</p>
      </div>
    );
  }
  return null;
}

function GamificacaoEngine({ totalKgCO2 }) {
  const equiv = useMemo(() => calcularEquivalencia(totalKgCO2), [totalKgCO2]);
  const pct   = Math.min((equiv.restoKg / FATOR_ARVORE) * 100, 100);
  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-6 text-center">
      <p className="font-black text-green-900 leading-tight text-base sm:text-lg" style={{ fontFamily: "'Syne',sans-serif" }}>
        {equiv.mensagem}
      </p>
      <p className="text-green-600 text-xs mt-1 font-semibold">
        {totalKgCO2.toFixed(1).replace(".", ",")} kg CO₂ mitigados no período
      </p>
      <div className="mt-4 w-full">
        <div className="flex justify-between text-xs text-gray-500 mb-1.5">
          <span className="font-semibold">Próxima árvore</span>
          <span>{equiv.restoKg.toFixed(1).replace(".", ",")} / {FATOR_ARVORE} kg</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

      {/* HEADER PAINEL */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
                Olá, {userName.split(" ")[0]}.{" "}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Bem-vindo ao seu painel sustentável. Veja seu impacto no mundo.</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-5 py-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-xl font-black text-green-700" style={{fontFamily:"'Syne',sans-serif"}}>
                  {loading ? "..." : `${pontosFormatados} pts`}
                </div>
              </div>
            </div>
            <p className="text-white/65 text-xs sm:text-sm leading-relaxed">
              de CO₂ evitados usando sua Tag Edenred nas passagens de pedágio.
            </p>
          </div>
          {/* Ícone oculto em telas muito pequenas */}
          <div className="relative z-10 opacity-70 flex-shrink-0 hidden xs:block sm:block">
            <Leaf size={80} className="text-white sm:hidden" />
            <Leaf size={120} className="text-white hidden sm:block" />
          </div>
        </div>
      </div>

      {/* Erro */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start sm:items-center gap-3 flex-wrap sm:flex-nowrap">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-red-700 text-sm font-semibold flex-1">{error}</p>
          <button onClick={refetch} className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors whitespace-nowrap">
            Tentar novamente
          </button>
        </div>
      )}

          {/* LOADING STATE */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <Loader2 size={32} className="text-green-500 animate-spin" />
              <span className="ml-3 text-gray-500 font-medium">Carregando seus dados...</span>
            </div>
          )}

          {/* ERROR STATE */}
          {error && !loading && (
            <div className="bg-red-50 border border-red-200 border-l-4 border-l-red-500 rounded-2xl p-4 mb-5">
              <div className="font-bold text-red-800 text-sm mb-1">Erro ao carregar dados</div>
              <div className="text-xs text-red-700">{error}</div>
            </div>
          )}

          {/* ── RASTRO ── */}
          {!loading && tab === "rastro" && (
            <div className="space-y-5">
              {/* Hero rastro */}
              <div className="relative bg-gradient-to-br from-green-700 to-green-950 rounded-3xl p-8 flex items-center justify-between overflow-hidden shadow-xl">
                <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5">
                  <svg viewBox="0 0 200 200" className="w-full h-full"><circle cx="150" cy="50" r="120" fill="white"/><circle cx="80" cy="160" r="80" fill="white"/></svg>
                </div>
                <div className="relative z-10">
                  <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    Meu Rastro — {labelUltimoMes}
                  </div>
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-6xl font-black text-white leading-none" style={{fontFamily:"'Syne',sans-serif"}}>
                      {co2UltimoMes.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
                    </span>
                    <span className="text-2xl font-bold text-green-300">kg CO₂</span>
                  </div>
                  <p className="text-white/65 text-sm max-w-xs leading-relaxed">de CO₂ evitados usando sua Tag Edenred nas passagens de pedágio e estacionamentos neste período.</p>
                </div>
                <div className="relative z-10 opacity-70 flex-shrink-0">
                  <Leaf size={120} className="text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

              {/* Métricas do rastro histórico (meses) */}
              {data.rastro && data.rastro.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.rastro.map((mes, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                      <div className="text-xs text-gray-500 font-semibold mb-1">{mes.mes}</div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
                          {mes.co2_economizado.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
                        </span>
                        <span className="text-gray-400 font-semibold">kg</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Métricas adicionais */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-3">
                    <Leaf size={24} className="text-green-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">CO₂ Total Acumulado</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
                      {userPoints.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}
                    </span>
                    <span className="text-gray-400 font-semibold">kg</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
                    <MapPin size={24} className="text-blue-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Passagens Recentes</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
                      {data.extrato?.length ?? 0}
                    </span>
                    <span className="text-gray-400 font-semibold">eventos</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-3">
                    <Star size={24} className="text-amber-600" />
                  </div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Meses Rastreados</div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
                      {data.rastro?.length ?? 0}
                    </span>
                    <span className="text-gray-400 font-semibold">meses</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Gráfico */}
      {!loading && !error && historico.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-bold text-gray-800 text-sm">Gráfico de Evolução</span>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-4">Evolução do Impacto — CO₂</p>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={historico} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 11, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "#d1d5db" }} axisLine={false} tickLine={false} unit=" kg" width={40} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="kg" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#16a34a", r: 4, strokeWidth: 0 }} activeDot={{ r: 6, fill: "#f97316" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* GHG */}
      {!error && (
        <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
          <BadgeCheck size={22} className="text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</p>
            <p className="text-xs text-green-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.</p>
          </div>
        </div>
      )}
    </div>
  );
}

function TabResumo({ userPoints }) {
  const { rastro, loading } = useRastroVerde("mensal");
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="relative bg-gradient-to-br from-green-700 to-green-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full"><circle cx="150" cy="50" r="120" fill="white"/><circle cx="80" cy="160" r="80" fill="white"/></svg>
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Meu Rastro — Abril/2026
          </div>
          <div className="flex items-baseline gap-2 mb-2 sm:mb-3 flex-wrap">
            {loading ? (
              <div className="w-32 sm:w-40 h-10 sm:h-14 rounded-xl animate-pulse bg-white/10" />
            ) : (
              <>
                <span className="text-4xl sm:text-6xl font-black text-white leading-none" style={{fontFamily:"'Syne',sans-serif"}}>
                  {(rastro?.co2_evitado ?? 0).toFixed(1).replace(".", ",")}
                </span>
                <span className="text-lg sm:text-2xl font-bold text-green-300">kg CO₂</span>
              </>
            )}
          </div>
          <p className="text-white/65 text-xs sm:text-sm leading-relaxed">de CO₂ evitados usando sua Tag Edenred nas passagens de pedágio.</p>
        </div>
      </div>

          {/* ── HISTORICO ── */}
          {!loading && tab === "historico" && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Histórico</div>
                <h2 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Suas passagens e economias</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm flex items-center gap-2">
                  Extrato de Passagens — <span className="text-gray-500 font-normal">{data.extrato?.length ?? 0} registros</span>
                </div>
                {data.extrato && data.extrato.length > 0 ? (
                  data.extrato.map((row, i) => (
                    <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center text-base">
                          {getEventIcon(row.nome)}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-gray-800">{row.nome}</div>
                          <div className="text-xs text-gray-400">{formatDate(row.data)}</div>
                        </div>
                      </div>
                      <div className="font-bold text-sm text-green-600">
                        −{row.registro_economia.toLocaleString("pt-BR", { maximumFractionDigits: 2 })} kg CO₂
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-10 text-gray-400 text-sm">
                    Nenhuma passagem registrada ainda.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tabs — scroll horizontal no mobile se necessário */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  if (t.id === "marketplace") {
                    navigate("/b2c/marketplace");
                  } else {
                    setTab(t.id);
                  }
                }}
                className={`px-4 sm:px-5 py-3 text-sm font-semibold border-b-2 transition-all whitespace-nowrap flex-shrink-0 ${
                  tab === t.id && t.id !== "marketplace"
                    ? "border-green-500 text-green-700"
                    : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo — padding menor no mobile */}
      <div className="flex-1 bg-gray-50 px-4 sm:px-6 py-5 sm:py-7">
        <div className="max-w-6xl mx-auto">
          {tab === "meu-rastro" && <TabMeuRastro />}
          {tab === "resumo"     && <TabResumo userPoints={userPoints} />}
          {tab === "historico"  && (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center text-gray-400">
              Histórico disponível em breve.
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
