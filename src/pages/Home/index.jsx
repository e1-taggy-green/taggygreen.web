import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Footer } from "../../components/shared";

export default function HomePage() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="px-6 py-5">
        <div className="max-w-6xl mx-auto">
          <Logo size="lg" onClick={() => navigate("/")} />
        </div>
      </nav>

      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-6 py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full" style={{ background: "radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)" }}></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)" }}></div>
          <div className="absolute top-20 right-10 w-32 h-32 rounded-full" style={{ background: "radial-gradient(circle,rgba(34,197,94,0.05) 0%,transparent 70%)" }}></div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#16a34a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-1.5 text-sm font-semibold text-green-700 mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Plataforma 2026 — Sustentabilidade em escala
          </div>

          <h1 className="text-6xl font-black tracking-tight text-gray-900 leading-[1.05] mb-5" style={{ fontFamily: "'Syne',sans-serif" }}>
            Sua tag faz<br />
            <span className="text-green-600 relative">
              mais do que você imagina
              <svg className="absolute -bottom-1 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,5" stroke="#86efac" strokeWidth="3" fill="none" strokeLinecap="round" />
              </svg>
            </span>
          </h1>

          <p className="text-lg text-gray-500 max-w-xl mx-auto leading-relaxed mb-10">
            Com a Tag Edenred, você economiza tempo nos pedágios, reduz emissões de CO₂ e converte seu impacto verde em recompensas reais.
          </p>

          <div className="bg-gray-950 rounded-2xl px-8 py-6 flex justify-around gap-6 mb-14 max-w-2xl mx-auto shadow-xl">
            {[
              { v: "4.375", u: "kg", l: "CO₂ evitados/mês" },
              { v: "1.000", u: "+", l: "veículos ativos" },
              { v: "285", u: "%", l: "ROI médio" },
            ].map((stat, index) => (
              <div key={index} className={`text-center ${index < 2 ? "border-r border-white/10 pr-6" : ""}`}>
                <div className="text-3xl font-black text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                  {stat.v}<span className="text-green-400">{stat.u}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1.5">{stat.l}</div>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Escolha como quer acessar</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-2xl mx-auto mb-8">
            <button
              onMouseEnter={() => setHovered("b2c")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate("/b2c/hub")}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered === "b2c" ? "border-green-500 shadow-xl shadow-green-100 -translate-y-1" : "border-gray-200 hover:border-green-300"} bg-white`}
            >
              <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered === "b2c" ? "bg-green-500 text-white" : "bg-green-100 text-green-700"} transition-colors`}>
                Grátis
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4">🚗</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pessoa Física · B2C</div>
              <div className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                Portal do Motorista
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Acompanhe seu rastro de CO₂, converta em pontos e resgate no Marketplace Verde.</p>
              <div className="flex items-center gap-2 bg-green-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-green-200 group-hover:bg-green-600 transition-colors w-full justify-center">
                Entrar como Pessoa Física →
              </div>
            </button>

            <button
              onMouseEnter={() => setHovered("b2b")}
              onMouseLeave={() => setHovered(null)}
              onClick={() => navigate("/b2b/dashboard")}
              className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered === "b2b" ? "border-blue-500 shadow-xl shadow-blue-100 -translate-y-1" : "border-gray-200 hover:border-blue-300"} bg-white`}
            >
              <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered === "b2b" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"} transition-colors`}>
                Corporativo
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4">🏢</div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Empresa · B2B</div>
              <div className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                Gestão de Frotas e ESG
              </div>
              <p className="text-sm text-gray-500 leading-relaxed mb-4">Relatórios ESG auditáveis, performance por veículo e simulação mockada de impacto sustentável.</p>
              <div className="flex items-center gap-2 bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-blue-200 group-hover:bg-blue-600 transition-colors w-full justify-center">
                Entrar como Empresa →
              </div>
            </button>
          </div>

          <button onClick={() => navigate("/simulador")} className="w-full max-w-2xl mx-auto flex items-center justify-between gap-4 bg-gradient-to-r from-green-700 to-green-900 rounded-2xl px-7 py-5 hover:from-green-800 hover:to-green-950 transition-all group shadow-lg shadow-green-900/20">
            <div className="text-left">
              <div className="text-xs font-bold text-green-300 uppercase tracking-widest mb-1">🌱 Ferramenta mockada</div>
              <div className="text-lg font-black text-white" style={{ fontFamily: "'Syne',sans-serif" }}>Simulador de Impacto Verde</div>
              <div className="text-sm text-white/60 mt-0.5">Veja o design com dados fictícios e sem cálculos ao vivo.</div>
            </div>
            <div className="flex-shrink-0 bg-white text-green-800 font-bold text-sm px-5 py-2.5 rounded-xl group-hover:bg-green-50 transition-colors shadow">
              Ver Simulação →
            </div>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
