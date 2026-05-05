import { useState, useEffect, useRef } from "react";

const IMAGES = {
  mercado: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80",
  cafe: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&q=80",
  bikes: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
  ezolt: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=400&q=80",
  restaurante: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  kit: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80",
  academia: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80",
  lavagem: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?w=400&q=80",
};

const OFFERS = [
  { id:1, cat:"alimentacao", label:"Alimentação", title:"Mercado Orgânico", discount:"20% de Desconto", pts:500, img: IMAGES.mercado, color:"#16a34a" },
  { id:2, cat:"alimentacao", label:"Alimentação", title:"Café Orgânico Matinal", discount:"Compre 1 Leve 2", pts:300, img: IMAGES.cafe, color:"#16a34a" },
  { id:3, cat:"alimentacao", label:"Alimentação", title:"Restaurante Vegano Roots", discount:"Prato 50% OFF", pts:600, img: IMAGES.restaurante, color:"#16a34a" },
  { id:4, cat:"mobilidade", label:"Mobilidade", title:"Estação Recarga EZ", discount:"R$ 15 em Crédito", pts:800, img: IMAGES.ezolt, color:"#2563eb" },
  { id:5, cat:"mobilidade", label:"Mobilidade", title:"Bikes Itaú / Tembici", discount:"1 Mês Grátis", pts:1000, img: IMAGES.bikes, color:"#2563eb" },
  { id:6, cat:"estilo",      label:"Estilo de Vida", title:"Kit Produtos Ecológicos", discount:"15% de Desconto", pts:450, img: IMAGES.kit, color:"#7c3aed" },
  { id:7, cat:"estilo",      label:"Estilo de Vida", title:"Academia Verde", discount:"30 dias Grátis", pts:700, img: IMAGES.academia, color:"#7c3aed" },
  { id:8, cat:"servicos",    label:"Serviços", title:"Lavagem a Seco", discount:"R$ 10 OFF", pts:350, img: IMAGES.lavagem, color:"#d97706" },
];

const CAT_COLORS = {
  alimentacao: "bg-green-100 text-green-800",
  mobilidade:  "bg-blue-100 text-blue-800",
  estilo:      "bg-purple-100 text-purple-800",
  servicos:    "bg-amber-100 text-amber-800",
};

/* ── LOGO ── */
function Logo({ size = "md", onClick }) {
  const sizes = { sm: "text-base", md: "text-xl", lg: "text-3xl" };
  const iconSizes = { sm: "w-7 h-7 text-sm", md: "w-9 h-9 text-lg", lg: "w-14 h-14 text-2xl" };
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 focus:outline-none">
      <div className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-green-400 to-green-700 flex items-center justify-center shadow-lg shadow-green-200 flex-shrink-0`}>
        <span>🌿</span>
      </div>
      <span className={`${sizes[size]} font-black tracking-tight`} style={{fontFamily:"'Syne',sans-serif"}}>
        Edenred <span className="text-green-600">TaggyGreen</span>
      </span>
    </button>
  );
}

/* ── NAV ── */
function Nav({ page, setPage, showB2bB2c = true }) {
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
        <Logo size="md" onClick={() => setPage("home")} />
        {showB2bB2c && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage("b2c")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${page==="b2c"||page==="marketplace"||page==="historico" ? "bg-green-500 text-white shadow-md shadow-green-200" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <span>👤</span> Portal B2C
            </button>
            <button
              onClick={() => setPage("b2b")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-150 ${page==="b2b"||page==="performance" ? "bg-green-500 text-white shadow-md shadow-green-200" : "text-gray-600 hover:bg-gray-100"}`}
            >
              <span>🏢</span> Gestão B2B
            </button>
            <button
              onClick={() => setPage("simulador")}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border-2 border-green-500 text-green-700 hover:bg-green-50 transition-all duration-150"
            >
              <span>🌱</span> Simulador
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ── FOOTER ── */
function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 px-6 py-8">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-white font-bold text-sm" style={{fontFamily:"'Syne',sans-serif"}}>Edenred TaggyGreen</span>
        </div>
        <span className="text-xs">© 2026 Edenred EcoTag. Todos os direitos reservados.</span>
        <div className="flex gap-5 text-xs">
          {["Sustentabilidade","Termos","Privacidade"].map(l => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── METRIC CARD ── */
function MetricCard({ icon, label, value, unit, change, changeDir = "up", bg = "bg-green-50" }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center text-xl mb-3`}>{icon}</div>
      <div className="text-xs text-gray-500 font-semibold mb-1">{label}</div>
      <div className="flex items-baseline gap-1">
        <span className="text-3xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>{value}</span>
        {unit && <span className="text-base text-gray-400 font-semibold">{unit}</span>}
      </div>
      {change && (
        <div className={`mt-2 text-xs font-semibold flex items-center gap-1 ${changeDir==="up"?"text-green-600":"text-red-500"}`}>
          <span>{changeDir==="up"?"↑":"↓"}</span> {change}
        </div>
      )}
    </div>
  );
}

/* ── PROGRESS ── */
function Progress({ value, color = "bg-green-500" }) {
  return (
    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
      <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{width:`${value}%`}}></div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: HOME (escolha do perfil)
══════════════════════════════════════════════ */
function HomePage({ setPage }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <Logo size="lg" />
        </div>
      </nav>

      {/* HERO */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden">
        {/* bg decoration */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full" style={{background:"radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)"}}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{background:"radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)"}}></div>
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full" style={{background:"radial-gradient(circle,rgba(34,197,94,0.05) 0%,transparent 70%)"}}></div>
          {/* dots grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="#16a34a"/></pattern></defs>
            <rect width="100%" height="100%" fill="url(#dots)"/>
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Plataforma 2026 — Sustentabilidade em escala
          </div>

          <h1 className="text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-5" style={{fontFamily:"'Syne',sans-serif"}}>
            Sua tag faz<br/>
            <span className="text-green-600 relative">
              mais do que você imagina
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,5" stroke="#86efac" strokeWidth="3" fill="none" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Com a Tag Edenred, você economiza tempo nos pedágios, reduz emissões de CO₂ e converte seu impacto verde em recompensas reais.
          </p>

          {/* STATS */}
          <div className="bg-gray-950 rounded-2xl px-8 py-6 flex justify-around gap-6 mb-14 max-w-2xl mx-auto shadow-xl">
            {[
              { v:"4.375", u:"kg", l:"CO₂ evitados/mês" },
              { v:"1.000", u:"+", l:"veículos ativos" },
              { v:"285",   u:"%", l:"ROI médio" },
            ].map((s,i) => (
              <div key={i} className={`text-center ${i<2?"border-r border-white/10 pr-6":""}`}>
                <div className="text-3xl font-black text-white leading-none" style={{fontFamily:"'Syne',sans-serif"}}>
                  {s.v}<span className="text-green-400">{s.u}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1.5">{s.l}</div>
              </div>
            ))}
          </div>

          {/* ESCOLHA */}
          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Escolha como quer acessar</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-2xl mx-auto mb-8">
            {/* B2C */}
            <button
              onMouseEnter={() => setHovered("b2c")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPage("b2c")}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered==="b2c"?"border-green-500 shadow-xl shadow-green-100 -translate-y-1":"border-gray-200 hover:border-green-300"} bg-white`}
            >
              <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered==="b2c"?"bg-green-500 text-white":"bg-green-100 text-green-700"} transition-colors`}>Grátis</div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4">🚗</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pessoa Física · B2C</div>
              <div className="text-xl font-black text-gray-900 mb-2" style={{fontFamily:"'Syne',sans-serif"}}>Portal do Motorista</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Acompanhe seu rastro de CO₂, converta em pontos e resgate no Marketplace Verde.</p>
              <ul className="space-y-1.5 mb-5">
                {["Meu Rastro — CO₂ evitado em tempo real","Pontos de carbono convertíveis","Marketplace Verde exclusivo","Histórico de passagens e postos"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full flex-shrink-0"></span>{f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 bg-green-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-green-200 group-hover:bg-green-600 transition-colors w-full justify-center">
                Entrar como Pessoa Física →
              </div>
            </button>

            {/* B2B */}
            <button
              onMouseEnter={() => setHovered("b2b")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setPage("b2b")}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered==="b2b"?"border-blue-500 shadow-xl shadow-blue-100 -translate-y-1":"border-gray-200 hover:border-blue-300"} bg-white`}
            >
              <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered==="b2b"?"bg-blue-500 text-white":"bg-blue-100 text-blue-700"} transition-colors`}>Corporativo</div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">🏢</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Empresa · B2B</div>
              <div className="text-xl font-black text-gray-900 mb-2" style={{fontFamily:"'Syne',sans-serif"}}>Gestão de Frotas e ESG</div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Relatórios ESG auditáveis, performance por veículo e simulador de impacto sustentável.</p>
              <ul className="space-y-1.5 mb-5">
                {["Relatório ESG — certificação GHG Protocol","Performance por veículo e rota","Exportação CSV/Excel e PDF auditável","Simulador de expansão de frota"].map(f => (
                  <li key={f} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>{f}
                  </li>
                ))}
              </ul>
              <div className="flex items-center gap-2 bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-blue-200 group-hover:bg-blue-600 transition-colors w-full justify-center">
                Entrar como Empresa →
              </div>
            </button>
          </div>

          {/* SIMULADOR BANNER */}
          <button onClick={() => setPage("simulador")} className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl px-7 py-5 hover:from-green-800 hover:to-green-950 transition-all group shadow-lg shadow-green-900/20">
            <div className="text-left">
              <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-1">🌱 Ferramenta gratuita</div>
              <div className="text-lg font-black text-white" style={{fontFamily:"'Syne',sans-serif"}}>Simulador de Impacto Verde</div>
              <div className="text-sm text-white/60 mt-0.5">Descubra o potencial de economia da sua frota.</div>
            </div>
            <div className="flex-shrink-0 bg-white text-green-800 font-bold text-sm px-5 py-2.5 rounded-xl group-hover:bg-green-50 transition-colors shadow">
              Ver Simulação →
            </div>
          </button>
        </div>
      </section>
      <Footer/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: B2C — Portal do Motorista
══════════════════════════════════════════════ */
function B2CPage({ setPage }) {
  const [tab, setTab] = useState("rastro");
  const [filterCat, setFilterCat] = useState("all");

  const filteredOffers = filterCat === "all" ? OFFERS : OFFERS.filter(o => o.cat === filterCat);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav page="b2c" setPage={setPage}/>

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
            {[{id:"rastro",label:"📍 Meu Rastro"},{id:"marketplace",label:"🛍️ Marketplace Verde"},{id:"historico",label:"📋 Histórico"}].map(t => (
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

              {/* Ofertas preview */}
              <div className="flex items-center justify-between">
                <div className="font-black text-lg text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>🛍️ Ofertas para você</div>
                <button onClick={() => setTab("marketplace")} className="text-sm text-green-600 font-semibold hover:text-green-800 transition-colors">Ver todas →</button>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {OFFERS.slice(0,3).map(o => <OfferCard key={o.id} offer={o}/>)}
              </div>
            </div>
          )}

          {/* ── MARKETPLACE ── */}
          {tab === "marketplace" && (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Marketplace Verde</div>
                <h2 className="text-2xl font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Troque seus pontos por benefícios</h2>
                <p className="text-sm text-gray-500 mt-1">Explore todas as ofertas e converta seus pontos de carbono em descontos exclusivos.</p>
              </div>
              {/* Filtros */}
              <div className="flex gap-2 flex-wrap">
                {[{id:"all",label:"Todos"},{id:"alimentacao",label:"🥦 Alimentação"},{id:"mobilidade",label:"🚗 Mobilidade"},{id:"estilo",label:"✨ Estilo de Vida"},{id:"servicos",label:"🔧 Serviços"}].map(f => (
                  <button key={f.id} onClick={() => setFilterCat(f.id)}
                    className={`px-4 py-2 rounded-full border text-sm font-semibold transition-all ${filterCat===f.id?"bg-green-500 text-white border-green-500 shadow-md shadow-green-100":"border-gray-200 text-gray-600 hover:border-green-400 hover:text-green-700"}`}>
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {filteredOffers.map(o => <OfferCard key={o.id} offer={o} showBadge/>)}
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

function OfferCard({ offer, showBadge }) {
  const [resgated, setResgated] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="relative">
        <img src={offer.img} alt={offer.title} className="w-full h-36 object-cover"/>
        {showBadge && (
          <span className={`absolute top-2 left-2 text-xs font-bold px-2 py-0.5 rounded-full ${CAT_COLORS[offer.cat]}`}>{offer.label}</span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        {!showBadge && <div className="text-xs text-gray-400 font-semibold mb-0.5">{offer.label}</div>}
        <div className="font-bold text-gray-900 text-sm mb-1">{offer.title}</div>
        <div className="font-bold text-green-600 text-sm mb-3">{offer.discount}</div>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-xs text-gray-400 flex items-center gap-1">🏆 {offer.pts.toLocaleString()} pts</div>
          <button
            onClick={() => setResgated(!resgated)}
            className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${resgated?"bg-gray-100 text-gray-500":"bg-green-500 text-white hover:bg-green-600 shadow-md shadow-green-100"}`}>
            {resgated ? "Resgatado ✓" : "Resgatar"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: B2B — Gestão de Frotas e ESG
══════════════════════════════════════════════ */
function B2BPage({ setPage }) {
  const [tab, setTab] = useState("esg");
  const [periodo, setPeriodo] = useState("Abril/2026");

  const veiculos = [
    {rank:1, placa:"ABC-1234", modelo:"Ford Transit", rota:"SP–Campinas", pass:280, co2:580, pct:100},
    {rank:2, placa:"DEF-5678", modelo:"VW Delivery",  rota:"SP–Santos",   pass:210, co2:440, pct:76},
    {rank:3, placa:"GHI-9012", modelo:"Fiat Ducato",  rota:"SP–Interior", pass:190, co2:390, pct:67},
    {rank:4, placa:"JKL-3456", modelo:"Renault Master",rota:"SP–ABC",     pass:170, co2:310, pct:53},
    {rank:5, placa:"MNO-7890", modelo:"Iveco Daily",  rota:"SP–Litoral",  pass:140, co2:280, pct:48},
  ];

  const catPerf = [
    {icon:"🚗", cat:"Carros e Utilitários", veic:620, ef:89, co2:"2.140", pot:"+260", status:"Ótimo", color:"bg-green-500"},
    {icon:"🚚", cat:"Caminhões e Pesados",   veic:240, ef:62, co2:"1.850", pot:"+520", status:"Atenção", color:"bg-amber-400"},
    {icon:"🏍️", cat:"Motos",                 veic:100, ef:95, co2:"385",   pot:"+20",  status:"Excelente", color:"bg-green-500"},
    {icon:"🚐", cat:"Vans e Kombis",          veic:40,  ef:73, co2:"280",   pot:"+104", status:"Regular", color:"bg-gray-400"},
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav page="b2b" setPage={setPage}/>

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
              <button className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all">📊 Exportar CSV/Excel</button>
              <button className="flex items-center gap-1.5 text-xs font-semibold border border-gray-300 rounded-xl px-4 py-2 hover:border-green-500 hover:text-green-700 hover:bg-green-50 transition-all">📄 Baixar PDF Auditável</button>
              <button onClick={() => setPage("simulador")} className="flex items-center gap-1.5 text-xs font-bold bg-green-500 text-white rounded-xl px-4 py-2 hover:bg-green-600 transition-all shadow-md shadow-green-100">🌱 Simulador</button>
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
                <MetricCard icon="🌿" label="CO₂ Evitado"         value="4.375" unit="kg"    change="+12% vs mês anterior" bg="bg-green-50"/>
                <MetricCard icon="⛽" label="Combustível Poupado"  value="1.470" unit="L"     change="+8% vs mês anterior"  bg="bg-blue-50"/>
                <MetricCard icon="⏱️" label="Tempo Otimizado"      value="142"   unit="hrs"   change="+5% eficiência"        bg="bg-amber-50"/>
                <MetricCard icon="🚚" label="Frota Total"          value="1.000" unit="veíc." change="+50 integrados"        bg="bg-teal-50"/>
                <MetricCard icon="💰" label="R$ Economizado"       value="18.450" unit="R$"   change="+18% retorno"          bg="bg-purple-50"/>
                <MetricCard icon="📈" label="ROI"                  value="285"   unit="%"     change="Excelente performance"  bg="bg-red-50"/>
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

              {/* Table + Ranking */}
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
                      {[
                        ["🚗 Carros","4.820","2.140 kg","R$ 8.950"],
                        ["🚚 Caminhões","1.230","1.850 kg","R$ 7.200"],
                        ["🏍️ Motos","980","385 kg","R$ 1.800"],
                        ["🅿️ Estacionamentos","2.400","0 kg","R$ 500"],
                      ].map(([c,p,co2,eco],i) => (
                        <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-3 text-gray-800 font-medium">{c}</td>
                          <td className="px-4 py-3 text-gray-600">{p}</td>
                          <td className="px-4 py-3 text-green-600 font-bold">{co2}</td>
                          <td className="px-4 py-3 text-gray-600">{eco}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Ranking */}
                <div className="col-span-2 bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                  <div className="px-5 py-4 border-b border-gray-100 font-bold text-gray-800 text-sm">🏆 Top Veículos</div>
                  {veiculos.map(v => (
                    <div key={v.rank} className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 ${v.rank===1?"bg-amber-100 text-amber-800":v.rank===2?"bg-gray-200 text-gray-700":v.rank===3?"bg-orange-100 text-orange-800":"bg-gray-100 text-gray-500"}`}>{v.rank}</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs text-gray-800 truncate">{v.placa} · {v.modelo}</div>
                        <div className="text-xs text-gray-400">{v.rota}</div>
                        <div className="mt-1.5"><Progress value={v.pct}/></div>
                      </div>
                      <div className="text-xs font-bold text-green-600 flex-shrink-0">+{v.co2} kg</div>
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
                    {catPerf.map((row,i) => (
                      <tr key={i} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-800 font-medium">{row.icon} {row.cat}</td>
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
      </div>
      <Footer/>
    </div>
  );
}

/* ══════════════════════════════════════════════
   PAGE: SIMULADOR
══════════════════════════════════════════════ */
function SimuladorPage({ setPage }) {
  const [form, setForm] = useState({
    nome:"", email:"", telefone:"", empresa:"",
    veiculos:50, km:8000, passagens:200,
    combustivel:"diesel", percentTag:80
  });
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);

  function calcular() {
    setLoading(true);
    setTimeout(() => {
      const fator = form.combustivel === "diesel" ? 2.65 : 2.31;
      const efic  = form.percentTag / 100;
      const co2   = Math.round(form.veiculos * form.km * 0.001 * fator * efic * 12);
      const comb  = Math.round(form.veiculos * form.km * 0.0001 * efic * 12);
      const tempo = Math.round(form.passagens * form.veiculos * efic * 0.08 * 12);
      const econ  = Math.round(form.veiculos * form.passagens * 3.5 * 12);
      const roi   = Math.round(((econ - form.veiculos * 180) / (form.veiculos * 180)) * 100);
      setResultado({ co2, comb, tempo, econ, roi });
      setLoading(false);
    }, 800);
  }

  function inp(key, val) { setForm(f => ({...f, [key]: val})); setResultado(null); }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav page="simulador" setPage={setPage}/>

      {/* Header */}
      <div className="bg-gradient-to-br from-green-700 to-green-950 px-6 py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full"><defs><pattern id="g" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="white"/></pattern></defs><rect width="100%" height="100%" fill="url(#g)"/></svg>
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-4xl mb-4">🌱</div>
          <h1 className="text-4xl font-black text-white mb-3" style={{fontFamily:"'Syne',sans-serif"}}>Simulador de Impacto Verde</h1>
          <p className="text-white/70 text-base leading-relaxed">Descubra o potencial de economia e sustentabilidade da sua frota com a Tag Edenred. Preencha os dados para receber sua projeção personalizada.</p>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Dados pessoais */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg">👤</span>
              <h3 className="font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Seus Dados</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                {label:"Nome Completo",     key:"nome",     ph:"Ex: João da Silva",       type:"text"},
                {label:"E-mail Profissional",key:"email",   ph:"joao@empresa.com.br",     type:"email"},
                {label:"Telefone",          key:"telefone", ph:"(11) 90000-0000",         type:"text"},
                {label:"Endereço da Empresa",key:"empresa", ph:"Rua, Número, Cidade",     type:"text"},
              ].map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">{f.label}</label>
                  <input type={f.type} placeholder={f.ph} value={form[f.key]}
                    onChange={e => inp(f.key, e.target.value)}
                    className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"/>
                </div>
              ))}
            </div>
          </div>

          {/* Dados da frota */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <h3 className="font-black text-gray-900" style={{fontFamily:"'Syne',sans-serif"}}>Dados da Frota</h3>
            </div>
            <div className="p-6 space-y-5">
              {/* Sliders */}
              {[
                {label:"Número de veículos",  key:"veiculos",   min:1,    max:5000, step:10,  suffix:"veículos"},
                {label:"Km médio mensal/veículo",key:"km",       min:500,  max:50000,step:500, suffix:"km"},
                {label:"Passagens por mês/veículo",key:"passagens",min:1, max:1000,  step:5,   suffix:"passagens"},
                {label:"% da frota com Tag Edenred",key:"percentTag",min:10,max:100,step:5,   suffix:"%"},
              ].map(s => (
                <div key={s.key}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-bold text-gray-700">{s.label}</label>
                    <span className="text-xs font-black text-green-700">{s.key==="veiculos"||s.key==="km"||s.key==="passagens"?form[s.key].toLocaleString():form[s.key]} {s.suffix}</span>
                  </div>
                  <input type="range" min={s.min} max={s.max} step={s.step} value={form[s.key]}
                    onChange={e => inp(s.key, Number(e.target.value))}
                    className="w-full accent-green-500"/>
                  <div className="flex justify-between text-xs text-gray-300 mt-0.5">
                    <span>{s.min.toLocaleString()}</span><span>{s.max.toLocaleString()}</span>
                  </div>
                </div>
              ))}

              {/* Combustível */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-2">Tipo de combustível predominante</label>
                <div className="flex gap-3">
                  {[{id:"diesel",label:"⛽ Diesel"},{id:"gasolina",label:"🔴 Gasolina"},{id:"etanol",label:"🌽 Etanol"},{id:"eletrico",label:"⚡ Elétrico"}].map(c => (
                    <button key={c.id} onClick={() => inp("combustivel", c.id)}
                      className={`flex-1 py-2 text-sm font-semibold rounded-xl border-2 transition-all ${form.combustivel===c.id?"border-green-500 bg-green-50 text-green-700":"border-gray-200 text-gray-500 hover:border-gray-300"}`}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <button onClick={calcular} disabled={loading}
            className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            style={{fontFamily:"'Syne',sans-serif"}}>
            {loading ? (
              <><span className="animate-spin text-xl">🌀</span> Calculando...</>
            ) : (
              <><span>🌱</span> Ver Simulação</>
            )}
          </button>

          {/* RESULTADO */}
          {resultado && (
            <div className="space-y-4">
              <div className="bg-gradient-to-br from-green-700 to-green-950 rounded-2xl p-6 text-center shadow-xl">
                <div className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">Projeção Anual — {form.veiculos.toLocaleString()} veículos</div>
                <div className="text-5xl font-black text-white mb-1" style={{fontFamily:"'Syne',sans-serif"}}>
                  {resultado.co2.toLocaleString()} <span className="text-green-300 text-2xl">kg CO₂</span>
                </div>
                <div className="text-white/60 text-sm">evitados por ano com a Tag Edenred</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard icon="⛽" label="Combustível Poupado/ano" value={resultado.comb.toLocaleString()} unit="L" bg="bg-blue-50"/>
                <MetricCard icon="⏱️" label="Horas Otimizadas/ano"    value={resultado.tempo.toLocaleString()} unit="hrs" bg="bg-amber-50"/>
                <MetricCard icon="💰" label="Economia Estimada/ano"   value={`R$ ${resultado.econ.toLocaleString()}`} bg="bg-green-50"/>
                <MetricCard icon="📈" label="ROI Estimado"            value={resultado.roi} unit="%" bg="bg-purple-50"/>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4">
                <span className="text-2xl">✅</span>
                <div>
                  <div className="font-bold text-green-800 text-sm mb-0.5">Cálculo certificado — GHG Protocol</div>
                  <div className="text-xs text-green-700">Estimativas em conformidade com as diretrizes de emissões de escopo 1 e 3.</div>
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

/* ══════════════════════════════════════════════
   ROOT — Router
══════════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");

  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  const pages = {
    home:      <HomePage setPage={setPage}/>,
    b2c:       <B2CPage  setPage={setPage}/>,
    b2b:       <B2BPage  setPage={setPage}/>,
    simulador: <SimuladorPage setPage={setPage}/>,
  };

  return pages[page] || pages["home"];
}
