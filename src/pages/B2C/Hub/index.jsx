import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, Progress } from "../../../components/shared";
import {
  Coins, Leaf, Fuel, MapPin, Star, BadgeCheck, Car, TreePine, Wind, AlertTriangle,
} from "lucide-react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";
import { useRastroVerde } from "../../../hooks/useRastroVerde";

// ─── CONSTANTE DE MERCADO (US-06) ────────────────────────────────────────────
const FATOR_ARVORE = 15; // kg CO₂ = 1 árvore/ano

// ─── MOCK DATA GRÁFICO POR PERÍODO ───────────────────────────────────────────
// Permanece mockado até a API expor filtro por período (escopo da US-03).
// Quando disponível: passar `filtro` como param em getUserRastroHistorico.
const GRAFICO_POR_PERIODO = {
  "4meses": [
    { mes: "Jan", co2: 8.4 },
    { mes: "Fev", co2: 12.1 },
    { mes: "Mar", co2: 9.7 },
    { mes: "Abr", co2: 14.5 },
  ],
  mensal: [
    { mes: "Sem 1", co2: 2.8 },
    { mes: "Sem 2", co2: 4.1 },
    { mes: "Sem 3", co2: 3.9 },
    { mes: "Sem 4", co2: 3.7 },
  ],
  semanal: [
    { mes: "Seg", co2: 0.3 },
    { mes: "Ter", co2: 0.0 },
    { mes: "Qua", co2: 0.8 },
    { mes: "Qui", co2: 0.0 },
    { mes: "Sex", co2: 0.9 },
  ],
};

// CO₂ total por período para a GamificacaoEngine reagir ao filtro (US-06)
const CO2_POR_PERIODO = { "4meses": 44.7, mensal: 14.5, semanal: 2.0 };

const MOCK_HISTORICO = [
  { tipo: "pedagio",        title: "Pedágio — SP-280 KM 32",               date: "24 abr · 08:42", co2: "−1,8 kg" },
  { tipo: "posto",          title: "Posto Shell — Marginal Pinheiros",      date: "23 abr · 17:15", co2: "−2,4 kg" },
  { tipo: "estacionamento", title: "Estacionamento — Shopping Ibirapuera",  date: "22 abr · 14:03", co2: "−0,9 kg" },
  { tipo: "pedagio",        title: "Pedágio — Castelo Branco KM 18",        date: "21 abr · 06:58", co2: "−1,5 kg" },
  { tipo: "posto",          title: "Posto BR Mania — Av. Paulista",         date: "20 abr · 11:22", co2: "−3,1 kg" },
  { tipo: "pedagio",        title: "Pedágio — Anhanguera KM 54",            date: "18 abr · 07:30", co2: "−2,2 kg" },
];

// ─── FUNÇÃO UTILITÁRIA: calcularEquivalencia (US-06) ─────────────────────────
export function calcularEquivalencia(totalKg) {
  const arvores = Math.floor(totalKg / FATOR_ARVORE);
  const restoKg = parseFloat((totalKg % FATOR_ARVORE).toFixed(1));

  if (arvores >= 1) {
    return {
      arvores,
      restoKg,
      mensagem: `Você mitigou o equivalente a ${arvores} ${arvores === 1 ? "Árvore plantada" : "Árvores plantadas"} esse ano!`,
    };
  }
  if (totalKg >= 10) return { arvores: 0, restoKg: totalKg, mensagem: `Você ajudou a limpar o ar de ${Math.ceil(totalKg / 0.8)} quadras` };
  if (totalKg >= 5)  return { arvores: 0, restoKg: totalKg, mensagem: "Você compensou o equivalente a 500 respirações limpas" };
  if (totalKg >= 1)  return { arvores: 0, restoKg: totalKg, mensagem: "Cada pedágio conta! Sua pegada está diminuindo" };
  return               { arvores: 0, restoKg: totalKg, mensagem: "Sua jornada verde está prestes a começar!" };
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function iconePorTipo(tipo) {
  if (tipo === "pedagio")        return <MapPin size={18} className="text-green-600" />;
  if (tipo === "estacionamento") return <Car size={18} className="text-blue-500" />;
  return <Fuel size={18} className="text-orange-500" />;
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

// ─── GAMIFICACAO ENGINE (US-06) ───────────────────────────────────────────────
function GamificacaoEngine({ totalKgCO2 }) {
  const equiv = useMemo(() => calcularEquivalencia(totalKgCO2), [totalKgCO2]);
  const pct   = Math.min((equiv.restoKg / FATOR_ARVORE) * 100, 100);

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
      <style>{`@keyframes popIn { from{transform:scale(0.3);opacity:0} to{transform:scale(1);opacity:1} }`}</style>
      <p className="font-black text-green-900 leading-tight" style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem" }}>
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

// ─── SKELETONS ────────────────────────────────────────────────────────────────
function SkeletonBlock({ h = "h-16" }) {
  return <div className={`${h} rounded-2xl animate-pulse bg-gray-100`} />;
}

// ─── EMPTY STATE DO EXTRATO (Cenário 2 — US-05) ───────────────────────────────
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

// ─── TAB: MEU RASTRO VERDE (US-04 + US-05 + US-06) ───────────────────────────
function TabMeuRastro({ filtro, setFiltro }) {
  // US-05: hook que consome b2cService.getUserRastroHistorico() e getUserExtrato()
  const { rastro, extrato, loading, error, refetch } = useRastroVerde(filtro);

  // US-06: co2_evitado vem da API quando carregado; fallback para valor do período
  const co2Total = rastro?.co2_evitado ?? CO2_POR_PERIODO[filtro];

  return (
    <div className="space-y-5">

      {/* Painel central — co2_evitado vindo de getUserRastroHistorico (US-05) */}
      <div className="relative bg-gradient-to-br from-green-700 to-green-950 rounded-3xl p-8 flex items-center justify-between overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <circle cx="150" cy="50" r="120" fill="white" />
            <circle cx="80" cy="160" r="80" fill="white" />
          </svg>
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Economia de Carbono — Abril/2026
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            {loading ? (
              <div className="w-40 h-14 rounded-xl animate-pulse bg-white/10" />
            ) : (
              <>
                {/* DoD US-05: vírgula flutuante correta */}
                <span className="text-6xl font-black text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {co2Total.toFixed(1).replace(".", ",")}
                </span>
                <span className="text-2xl font-bold text-green-300">kg CO₂</span>
              </>
            )}
          </div>
          <p className="text-white/65 text-sm max-w-xs leading-relaxed">
            de CO₂ evitados usando sua Tag Edenred nas passagens de pedágio e postos.
          </p>
        </div>
        <div className="relative z-10 opacity-70 flex-shrink-0">
          <Leaf size={120} className="text-white" />
        </div>
      </div>

      {/* Filtro de período */}
      <div className="flex gap-2">
        {[
          { label: "4 meses", value: "4meses" },
          { label: "Mensal",  value: "mensal"  },
          { label: "Semanal", value: "semanal" },
        ].map((op) => (
          <button
            key={op.value}
            onClick={() => setFiltro(op.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filtro === op.value
                ? "bg-green-500 text-white shadow-md shadow-green-100"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>

      {/* Erro com retry */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3">
          <AlertTriangle size={20} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-sm font-semibold flex-1">{error}</p>
          <button onClick={refetch} className="text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-full transition-colors">
            Tentar novamente
          </button>
        </div>
      )}

      {/* US-06: GamificacaoEngine — reage ao co2Total (API ou fallback por período) */}
      {!error && <GamificacaoEngine totalKgCO2={co2Total} />}

      {/* Cards de equivalência estáticos */}
      {!error && (
        <div className="grid grid-cols-3 gap-4">
          {[
            { bg: "bg-green-50",  border: "border-green-200",  icon: <TreePine size={20} className="text-green-600" />, label: "Árvore absorve 10–20 kg de CO₂ por ano.",                            valor: "3 Árvores"   },
            { bg: "bg-orange-50", border: "border-orange-200", icon: <Car      size={20} className="text-orange-500" />, label: "De um carro à gasolina comum, poupando combustível e fumaça.",        valor: "18 L poupados"},
            { bg: "bg-yellow-50", border: "border-yellow-200", icon: <Wind     size={20} className="text-yellow-500" />, label: "Equivalente à energia gasta para deixar 10 lâmpadas de LED acesas.", valor: "450h de luz"  },
          ].map((eq, i) => (
            <div key={i} className={`${eq.bg} border ${eq.border} rounded-2xl p-5 flex flex-col gap-2`}>
              <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">{eq.icon}</div>
              <p className="text-xs text-gray-500 leading-snug">{eq.label}</p>
              <p className="font-black text-gray-900 text-base" style={{ fontFamily: "'Syne',sans-serif" }}>{eq.valor}</p>
            </div>
          ))}
        </div>
      )}

      {/* Extrato de Impacto — Cenário 1: .map() sobre getUserExtrato */}
      {/* Cenário 2: ExtratoEmpty quando array vazia */}
      {!error && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-bold text-gray-800 text-sm">Extrato de Impacto</span>
            {!loading && (
              <span className="text-gray-400 text-xs font-normal ml-1">
                — {extrato.length} passagem{extrato.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
          {loading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => <SkeletonBlock key={i} />)}
            </div>
          ) : extrato.length === 0 ? (
            <ExtratoEmpty />
          ) : (
            extrato.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin size={18} className="text-green-600" />
                  </div>
                  <div>
                    {/* Cenário 1: data, praça e mitigação de getUserExtrato */}
                    <p className="font-semibold text-sm text-gray-800">{item.praca}</p>
                    <p className="text-xs text-gray-400">{item.data} · Tag {item.tag}</p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  {/* DoD US-05: vírgula flutuante nos kg de CO₂ */}
                  <p className="font-bold text-sm text-green-600">
                    −{item.mitigacao_kg.toFixed(1).replace(".", ",")} kg
                  </p>
                  <p className="text-xs text-gray-400">CO₂</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Gráfico de Evolução */}
      {!error && (
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span className="font-bold text-gray-800 text-sm">Gráfico de Evolução</span>
          </div>
          <p className="text-xs text-gray-400 mb-4 ml-4">Evolução do Impacto — CO₂</p>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={GRAFICO_POR_PERIODO[filtro]} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#d1d5db" }} axisLine={false} tickLine={false} unit=" kg" width={44} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="co2" stroke="#f97316" strokeWidth={2.5} dot={{ fill: "#16a34a", r: 5, strokeWidth: 0 }} activeDot={{ r: 7, fill: "#f97316" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Certificação GHG */}
      {!error && (
        <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
          <BadgeCheck size={24} className="text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</p>
            <p className="text-xs text-green-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.</p>
          </div>
        </div>
      )}

    </div>
  );
}

// ─── TAB: RESUMO ──────────────────────────────────────────────────────────────
function TabResumo() {
  return (
    <div className="space-y-5">
      <div className="relative bg-gradient-to-br from-green-700 to-green-950 rounded-3xl p-8 flex items-center justify-between overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 bottom-0 w-64 opacity-5">
          <svg viewBox="0 0 200 200" className="w-full h-full"><circle cx="150" cy="50" r="120" fill="white"/><circle cx="80" cy="160" r="80" fill="white"/></svg>
        </div>
        <div className="relative z-10">
          <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Meu Rastro — Abril/2026
          </div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-6xl font-black text-white leading-none" style={{fontFamily:"'Syne',sans-serif"}}>45</span>
            <span className="text-2xl font-bold text-green-300">kg CO₂</span>
          </div>
          <p className="text-white/65 text-sm max-w-xs leading-relaxed">de CO₂ evitados usando sua Tag Edenred nas passagens de pedágio e postos este mês.</p>
        </div>
        <div className="relative z-10 opacity-70 flex-shrink-0"><Leaf size={120} className="text-white" /></div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center mb-3"><Fuel size={24} className="text-green-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Combustível Economizado</div>
          <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>18</span><span className="text-gray-400 font-semibold">L</span></div>
          <div className="mt-3"><div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Meta: 25L</span><span>72%</span></div><Progress value={72}/></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3"><MapPin size={24} className="text-blue-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Pedágios com Tag</div>
          <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>34</span><span className="text-gray-400 font-semibold">pass.</span></div>
          <div className="mt-3"><div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Tempo otimizado</span><span>8h</span></div><Progress value={85}/></div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
          <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center mb-3"><Star size={24} className="text-amber-600" /></div>
          <div className="text-xs text-gray-500 font-semibold mb-1">Pontos Acumulados</div>
          <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>1.250</span><span className="text-gray-400 font-semibold">pts</span></div>
          <div className="mt-3"><div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Próximo nível: 2.000</span><span>62%</span></div><Progress value={62} color="bg-amber-400"/></div>
        </div>
      </div>
      <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
        <BadgeCheck size={24} className="text-green-600 mt-0.5" />
        <div>
          <div className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</div>
          <div className="text-xs text-green-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.</div>
        </div>
      </div>
    </div>
  );
}

// ─── TAB: HISTÓRICO ───────────────────────────────────────────────────────────
function TabHistorico() {
  return (
    <div className="space-y-5">
      <div>
        <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Histórico</div>
        <h2 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Suas passagens e economias</h2>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm flex items-center gap-2">
          Abril 2026 — <span className="text-gray-500 font-normal">34 passagens registradas</span>
        </div>
        {MOCK_HISTORICO.map((row, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">{iconePorTipo(row.tipo)}</div>
              <div>
                <div className="font-semibold text-sm text-gray-800">{row.title}</div>
                <div className="text-xs text-gray-400">{row.date}</div>
              </div>
            </div>
            <div className="font-bold text-sm text-green-600">{row.co2} CO₂</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PÁGINA PRINCIPAL ─────────────────────────────────────────────────────────
export default function HubB2C() {
  const navigate = useNavigate();
  const [tab,    setTab]    = useState("meu-rastro");
  const [filtro, setFiltro] = useState("4meses");

  const TABS = [
    { id: "meu-rastro",  label: "Meu Rastro Verde" },
    { id: "resumo",      label: "Resumo"            },
    { id: "marketplace", label: "Marketplace Verde", action: () => navigate("/b2c/marketplace") },
    { id: "historico",   label: "Histórico"          },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Olá, Clara.
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">Bem-vinda ao seu painel sustentável. Veja seu impacto no mundo.</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-5 py-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Coins size={24} className="text-green-600" />
              </div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-xl font-black text-green-700" style={{ fontFamily: "'Syne',sans-serif" }}>1.250 pts</div>
              </div>
            </div>
          </div>
          <div className="flex gap-0">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={t.action ?? (() => setTab(t.id))}
                className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all ${
                  tab === t.id ? "border-green-500 text-green-700" : "border-transparent text-gray-500 hover:text-gray-900"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto">
          {tab === "meu-rastro" && <TabMeuRastro filtro={filtro} setFiltro={setFiltro} />}
          {tab === "resumo"     && <TabResumo />}
          {tab === "historico"  && <TabHistorico />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
