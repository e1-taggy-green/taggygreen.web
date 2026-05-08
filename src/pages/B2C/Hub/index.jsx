import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer, MetricCard, Progress } from "../../../components/shared";

/**
 * B2C HUB PAGE
 * Portal do Motorista - Acompanhe seu rastro de CO₂ e marketplace
 */
export default function HubB2C() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("rastro");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="b2c" />

      {/* HEADER PAINEL */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-0">
          <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Olá, Renato 👋</h1>
              <p className="text-sm text-gray-500 mt-0.5">Bem-vindo ao seu painel sustentável. Veja seu impacto no mundo.</p>
            </div>
            <div className="flex items-center gap-3 bg-gradient-to-r from-green-50 to-white border-2 border-green-200 rounded-2xl px-5 py-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center text-xl">🏆</div>
              <div>
                <div className="text-xs text-gray-500 font-semibold">Meus Pontos de Carbono</div>
                <div className="text-xl font-black text-green-700" style={{fontFamily:"'Syne',sans-serif"}}>1.250 pts</div>
              </div>
            </div>
          </div>
          {/* TABS */}
          <div className="flex gap-0">
            {[{id:"rastro",label:"📍 Meu Rastro"},{id:"marketplace",label:"🛍️ Marketplace Verde", action: () => navigate("/b2c/marketplace")},{id:"historico",label:"📋 Histórico"}].map(t => (
              <button key={t.id} onClick={t.action || (() => setTab(t.id))}
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

          {/* ── RASTRO ── */}
          {tab === "rastro" && (
            <div className="space-y-5">
              {/* Hero rastro */}
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
                <div className="relative z-10 text-8xl opacity-70 flex-shrink-0">🌱</div>
              </div>

              {/* Métricas */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center text-xl mb-3">⛽</div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Combustível Economizado</div>
                  <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>18</span><span className="text-gray-400 font-semibold">L</span></div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Meta: 25L</span><span>72%</span></div>
                    <Progress value={72}/>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-xl mb-3">🛣️</div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Pedágios com Tag</div>
                  <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>34</span><span className="text-gray-400 font-semibold">pass.</span></div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Tempo otimizado</span><span>8h</span></div>
                    <Progress value={85}/>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <div className="w-11 h-11 bg-amber-50 rounded-xl flex items-center justify-center text-xl mb-3">🏆</div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">Pontos Acumulados</div>
                  <div className="flex items-baseline gap-1"><span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>1.250</span><span className="text-gray-400 font-semibold">pts</span></div>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Próximo nível: 2.000</span><span>62%</span></div>
                    <Progress value={62} color="bg-amber-400"/>
                  </div>
                </div>
              </div>

              {/* Info GHG */}
              <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl mt-0.5">✅</span>
                <div>
                  <div className="font-bold text-green-800 text-sm mb-1">Dados Certificados — GHG Protocol</div>
                  <div className="text-xs text-green-700 leading-relaxed">Todos os cálculos estão em conformidade com as diretrizes do GHG Protocol para emissões de escopo 1 e 3.</div>
                </div>
              </div>
            </div>
          )}

          {/* ── HISTORICO ── */}
          {tab === "historico" && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Histórico</div>
                <h2 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Suas passagens e economias</h2>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm flex items-center gap-2">
                  📋 Abril 2026 — <span className="text-gray-500 font-normal">34 passagens registradas</span>
                </div>
                {[
                  {icon:"🛣️", title:"Pedágio — SP-280 KM 32",           date:"24 abr · 08:42", co2:"−1,8 kg"},
                  {icon:"⛽", title:"Posto Shell — Marginal Pinheiros",   date:"23 abr · 17:15", co2:"−2,4 kg"},
                  {icon:"🅿️", title:"Estacionamento — Shopping Ibirapuera",date:"22 abr · 14:03", co2:"−0,9 kg"},
                  {icon:"🛣️", title:"Pedágio — Castelo Branco KM 18",     date:"21 abr · 06:58", co2:"−1,5 kg"},
                  {icon:"⛽", title:"Posto BR Mania — Av. Paulista",       date:"20 abr · 11:22", co2:"−3,1 kg"},
                  {icon:"🛣️", title:"Pedágio — Anhanguera KM 54",         date:"18 abr · 07:30", co2:"−2,2 kg"},
                ].map((row,i) => (
                  <div key={i} className="flex items-center justify-between px-5 py-3.5 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center text-base">{row.icon}</div>
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
          )}
        </div>
      </div>
      <Footer/>
    </div>
  );
}