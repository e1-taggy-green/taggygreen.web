import { useState } from "react";
import { Nav, Footer } from "../../../components/shared";
import { Leaf, MapPin, TreePine, Droplets, Wind, BadgeCheck, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import GamificacaoEngine from "../../../components/GamificacaoEngine";
import { useRastroVerde } from "../../../hooks/useRastroVerde";

function CustomTooltip({ active, payload, label }) {
  if (active && payload?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-md text-sm">
        <p className="font-bold text-gray-700">{label}</p>
        <p className="text-green-600 font-black">{payload[0].value.toFixed(1).replace(".", ",")} kg CO₂</p>
      </div>
    );
  }
  return null;
}

function SkeletonBlock({ h = "h-40" }) {
  return <div className={`${h} rounded-2xl animate-pulse bg-gray-100`} />;
}

function EquivCard({ icon, label, value, unit, bg }) {
  return (
    <div className={`${bg} rounded-2xl p-4 flex flex-col items-center text-center gap-1`}>
      <div className="w-10 h-10 bg-white bg-opacity-60 rounded-xl flex items-center justify-center mb-1">
        {icon}
      </div>
      <span className="text-xs text-gray-500 font-semibold">{label}</span>
      <span className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
        {value}
      </span>
      <span className="text-xs text-gray-400">{unit}</span>
    </div>
  );
}

function ExtratoItem({ item }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
          <MapPin size={18} className="text-green-600" />
        </div>
        <div>
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
  );
}

function ExtratoEmpty() {
  return (
    <div className="flex flex-col items-center justify-center py-14 text-center px-6">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-4">
        <Leaf size={32} className="text-green-400" />
      </div>
      <p className="font-bold text-gray-800 text-base">Você ainda não passou por pedágios.</p>
      <p className="text-sm text-gray-400 mt-1">Sua jornada verde está prestes a começar!</p>
    </div>
  );
}

function ErroState({ mensagem, onRetry }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3">
      <AlertTriangle size={22} className="text-red-500 mt-0.5 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-bold text-red-800 text-sm">{mensagem}</p>
        <button
          onClick={onRetry}
          className="mt-2 text-xs font-bold text-white bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-full transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}

/**
 * US-05 — Meu Rastro Verde: página conectada à API real
 * Rota: /b2c/meu-rastro
 */
export default function MeuRastroVerde() {
  const [filtro, setFiltro] = useState("4meses");
  const { historico, extrato, rastro, loading, error, refetch } = useRastroVerde(filtro);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Meu Rastro Verde
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                Acompanhe o impacto real das suas passagens nos pedágios.
              </p>
            </div>
            {/* Filtro de período — dispara re-fetch via useRastroVerde */}
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
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 bg-gray-50 px-6 py-7">
        <div className="max-w-6xl mx-auto space-y-5">

          {error && <ErroState mensagem={error} onRetry={refetch} />}

          {/* Painel central — somatório bruto de getUserRastroHistorico */}
          {loading ? (
            <SkeletonBlock h="h-52" />
          ) : !error && rastro && (
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
                  Economia de Carbono — Abr/2026
                </div>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="text-6xl font-black text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                    {rastro.co2_evitado.toFixed(1).replace(".", ",")}
                  </span>
                  <span className="text-2xl font-bold text-green-300">kg CO₂</span>
                </div>
                <p className="text-white/65 text-sm max-w-xs leading-relaxed">
                  de CO₂ mitigados com suas passagens pela Tag Edenred nos pedágios.
                </p>
              </div>
              <div className="relative z-10 opacity-70 flex-shrink-0">
                <Leaf size={120} className="text-white" />
              </div>
            </div>
          )}

          {/* Engine de Gamificação (US-06) — reage ao estado rastro */}
          {!loading && !error && rastro && (
            <GamificacaoEngine totalKgCO2={rastro.co2_evitado} />
          )}

          {/* Cards de equivalência */}
          {loading ? (
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => <SkeletonBlock key={i} h="h-32" />)}
            </div>
          ) : !error && rastro && (
            <div className="grid grid-cols-3 gap-4">
              <EquivCard icon={<TreePine size={22} className="text-green-600" />} label="Árvores equivalentes" value={rastro.arvores_equivalentes} unit="plantadas/ano" bg="bg-green-50" />
              <EquivCard icon={<Droplets size={22} className="text-blue-500" />}  label="Água economizada"     value={rastro.litros_agua}           unit="litros"        bg="bg-blue-50"  />
              <EquivCard icon={<Wind size={22} className="text-teal-500" />}      label="Ar purificado"         value={rastro.horas_vento}           unit="horas de vento" bg="bg-teal-50" />
            </div>
          )}

          {/* Gráfico — histórico de getUserRastroHistorico */}
          {loading ? (
            <SkeletonBlock h="h-56" />
          ) : !error && historico.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-gray-800 text-sm">Histórico de Mitigação</p>
                <span className="text-xs bg-gray-100 text-gray-500 font-bold px-2 py-0.5 rounded-full">
                  {filtro === "4meses" ? "últimos 4 meses" : filtro}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={historico} barCategoryGap="30%">
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: "#9ca3af", fontWeight: 600 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "#d1d5db" }} axisLine={false} tickLine={false} unit=" kg" width={48} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f0fdf4" }} />
                  <Bar dataKey="kg" radius={[8, 8, 0, 0]}>
                    {historico.map((_, i) => (
                      <Cell key={i} fill={i === historico.length - 1 ? "#16a34a" : "#86efac"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Certificação GHG */}
          {!loading && !error && (
            <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
              <BadgeCheck size={24} className="text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</p>
                <p className="text-xs text-green-700 leading-relaxed">
                  Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.
                </p>
              </div>
            </div>
          )}

          {/* Extrato — itera getUserExtrato com .map() / empty state quando vazio */}
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm flex items-center gap-2">
              Extrato de Eventos
              {!loading && (
                <span className="text-gray-400 font-normal">
                  — {extrato.length} passagem{extrato.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
            {loading ? (
              <div className="p-4 space-y-3">
                {[1, 2, 3].map((i) => <SkeletonBlock key={i} h="h-14" />)}
              </div>
            ) : extrato.length === 0 ? (
              <ExtratoEmpty />
            ) : (
              extrato.map((item) => <ExtratoItem key={item.id} item={item} />)
            )}
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
