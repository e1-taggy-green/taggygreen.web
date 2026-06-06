import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, Progress } from "../../../components/shared";
import {
  Coins, Leaf, Fuel, MapPin, Star, BadgeCheck, Car, TreePine, Wind, AlertTriangle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useRastroVerde } from "../../../hooks/useRastroVerde";
import { useUser } from "../../../contexts/UserContext";

const FATOR_ARVORE = 15;

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

function SkeletonBlock({ h = "h-16" }) {
  return <div className={`${h} rounded-2xl animate-pulse bg-gray-100`} />;
}

function ExtratoEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center px-6">
      <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <Leaf size={28} className="text-green-400" />
      </div>
      <p className="font-bold text-gray-800 text-base">Você ainda não passou por pedágios.</p>
      <p className="text-sm text-gray-400 mt-1">Sua jornada verde está prestes a começar!</p>
    </div>
  );
}

function TabMeuRastro() {
  const { rastro, extrato, historico, loading, error, refetch } = useRastroVerde("mensal");
  const co2Total = rastro?.co2_evitado ?? 0;

  return (
    <div className="space-y-4 sm:space-y-5">

      {/* Painel CO₂ — responsivo: empilha no mobile */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-950 rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-48 sm:w-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="50" r="120" fill="white" />
            <circle cx="80" cy="160" r="80" fill="white" />
          </svg>
        </div>
        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-2 sm:mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
              <span className="truncate">Economia de Carbono — Abril/2026</span>
            </div>
            <div className="flex items-baseline gap-2 mb-2 sm:mb-3 flex-wrap">
              {loading ? (
                <div className="w-32 sm:w-40 h-10 sm:h-14 rounded-xl animate-pulse bg-white/10" />
              ) : (
                <>
                  <span className="text-4xl sm:text-6xl font-black text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                    {co2Total.toFixed(1).replace(".", ",")}
                  </span>
                  <span className="text-lg sm:text-2xl font-bold text-green-300">kg CO₂</span>
                </>
              )}
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

      {/* Gamificação */}
      {!loading && !error && <GamificacaoEngine totalKgCO2={co2Total} />}

      {/* Cards equivalência — 1 coluna mobile, 3 desktop */}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { bg: "bg-green-50",  border: "border-green-200",  icon: <TreePine size={20} className="text-green-600" />, label: "Árvore absorve 10–20 kg de CO₂ por ano.",                            valor: `${rastro?.arvores ?? 0} Árvores`   },
            { bg: "bg-orange-50", border: "border-orange-200", icon: <Car      size={20} className="text-orange-500" />, label: "De um carro à gasolina comum, poupando combustível e fumaça.",       valor: `${rastro?.combustivel_litros ?? 0} L poupados` },
            { bg: "bg-yellow-50", border: "border-yellow-200", icon: <Wind     size={20} className="text-yellow-500" />, label: "Equivalente à energia gasta para deixar 10 lâmpadas de LED acesas.", valor: `${rastro?.horas_led ?? 0}h de luz`  },
          ].map((eq, i) => (
            <div key={i} className={`${eq.bg} border ${eq.border} rounded-2xl p-4 sm:p-5 flex sm:flex-col flex-row items-center sm:items-start gap-3 sm:gap-2`}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">{eq.icon}</div>
              <div className="flex-1 sm:flex-none">
                <p className="text-xs text-gray-500 leading-snug hidden sm:block">{eq.label}</p>
                <p className="font-black text-gray-900 text-base sm:text-base" style={{ fontFamily: "'Syne',sans-serif" }}>{eq.valor}</p>
                <p className="text-xs text-gray-500 leading-snug sm:hidden mt-0.5">{eq.label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Extrato */}
      {!error && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-4 sm:px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0"></span>
            <span className="font-bold text-gray-800 text-sm">Extrato de Impacto</span>
            {!loading && (
              <span className="text-gray-400 text-xs font-normal ml-1">
                — {extrato.length} passagem{extrato.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {loading ? (
            <div className="p-4 space-y-3">{[1,2,3].map((i) => <SkeletonBlock key={i} />)}</div>
          ) : extrato.length === 0 ? (
            <ExtratoEmpty />
          ) : (
            extrato.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 sm:px-5 py-3 sm:py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={16} className="text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm text-gray-800 truncate">{item.praca}</p>
                    <p className="text-xs text-gray-400">{item.data}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-bold text-sm text-green-600 whitespace-nowrap">−{item.mitigacao_kg.toFixed(1).replace(".", ",")} kg</p>
                  <p className="text-xs text-gray-400">CO₂</p>
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

      {/* Cards — 1 col mobile, 3 desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-green-50 rounded-xl flex items-center justify-center mb-3"><Fuel size={22} className="text-green-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Combustível Economizado</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
              {loading ? "—" : rastro?.combustivel_litros ?? 0}
            </span>
            <span className="text-gray-400 font-semibold">L</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3"><MapPin size={22} className="text-blue-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Árvores Equivalentes</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
              {loading ? "—" : rastro?.arvores ?? 0}
            </span>
            <span className="text-gray-400 font-semibold">árv.</span>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-3"><Star size={22} className="text-amber-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Pontos Acumulados</div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>
              {userPoints != null ? userPoints.toLocaleString("pt-BR") : "—"}
            </span>
            <span className="text-gray-400 font-semibold">pts</span>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
        <BadgeCheck size={22} className="text-green-600 mt-0.5 flex-shrink-0" />
        <div>
          <div className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</div>
          <div className="text-xs text-green-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.</div>
        </div>
      </div>
    </div>
  );
}

export default function HubB2C() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("meu-rastro");
  const { userName, userPoints } = useUser();

  const TABS = [
    { id: "meu-rastro",  label: "Meu Rastro Verde" },
    { id: "marketplace", label: "Marketplace Verde" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-4 sm:pt-6 pb-0">

          {/* Header — empilha no mobile */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                {userName ? `Olá, ${userName}.` : "Olá!"}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Bem-vindo ao seu painel sustentável. Veja seu impacto no mundo.</p>
            </div>
            {/* Card de pontos — full width no mobile */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-4 py-2.5 sm:px-5 sm:py-3 w-full sm:w-auto">
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Coins size={22} className="text-green-600" />
              </div>
              <div className="flex-1 sm:flex-none">
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-lg sm:text-xl font-black text-green-700" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {userPoints != null ? `${userPoints.toLocaleString("pt-BR")} pts` : "— pts"}
                </div>
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