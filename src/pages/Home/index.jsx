import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Footer } from "../../components/shared";
import { User, Building2, Calculator } from "lucide-react";

import dioramaImage from "../../assets/taggy-ilustrator.png"; 

export default function HomePage() {
  const [hovered, setHovered] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* BARRA DE NAVEGAÇÃO: Com o Simulador acoplado no topo direito (Range Corrigido) */}
      <nav className="px-4 sm:px-6 py-5 border-b border-gray-50 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Logo size="lg" onClick={() => navigate("/")} />
          
          <div className="hidden sm:flex items-center justify-end flex-1 pl-8">
            <button 
              onClick={() => navigate("/simulador")} 
              className="w-full max-w-[280px] flex items-center gap-3.5 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl px-5 py-3.5 transition-all shadow-md shadow-green-900/10 border border-green-500/20 text-left group"
            >
              <Calculator size={18} className="text-green-200 group-hover:scale-110 transition-transform flex-shrink-0" />
              <div className="flex flex-col justify-center">
                <span className="text-[10px] font-bold text-green-200 uppercase tracking-widest leading-none mb-1">
                  Ferramenta
                </span>
                <span className="text-sm font-black leading-tight" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Simulador de Impacto Verde →
                </span>
              </div>
            </button>
          </div>

        </div>
      </nav>

      <section className="relative flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 sm:py-16 overflow-hidden">
        
        {/* Camada de Efeitos Abstratos de Fundo */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div 
            className="absolute -top-32 left-1/2 -translate-x-1/2 w-[150vw] h-[150vw] sm:w-[700px] sm:h-[700px] rounded-full" 
            style={{ background: "radial-gradient(circle,rgba(34,197,94,0.08) 0%,transparent 70%)" }}
          ></div>
          <div 
            className="absolute bottom-0 left-0 w-40 h-40 sm:w-64 sm:h-64 rounded-full" 
            style={{ background: "radial-gradient(circle,rgba(34,197,94,0.06) 0%,transparent 70%)" }}
          ></div>
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="#16a34a" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dots)" />
          </svg>
        </div>

        {/* Contêiner de Conteúdo Fluido */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          
          {/* Grid Principal: Texto à esquerda (5 colunas) | Imagem à direita (7 colunas) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center text-center lg:text-left mb-16">
            
            {/* COLUNA DA ESQUERDA: Textos e Métricas */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start w-full">
              
              {/* Badge da Plataforma */}
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold text-green-700 mb-5 max-w-full truncate">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0 animate-pulse"></span>
                <span className="truncate">Plataforma 2026 — Sustentabilidade em escala</span>
              </div>

              {/* Título com Tipografia Syne */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 leading-[1.1] mb-5" style={{ fontFamily: "'Syne',sans-serif" }}>
                Sua tag faz<br />
                <span className="text-green-600 relative inline-block">
                  mais do que você imagina
                  <svg className="absolute -bottom-2 left-0 w-full" height="6" viewBox="0 0 100 6" preserveAspectRatio="none">
                    <path d="M0,5 Q50,0 100,5" stroke="#86efac" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>
              </h1>

              {/* Descrição do Produto */}
              <p className="text-base sm:text-lg text-gray-500 max-w-xl lg:max-w-none leading-relaxed mb-6">
                Com a Taggy Edenred, você economiza tempo nos pedágios, reduz emissões de CO₂ e converte seu impacto verde em recompensas reais.
              </p>

              {/* Fallback do Simulador para Mobile: Oculto no desktop, visível apenas em telas pequenas */}
              <div className="w-full max-w-md mb-6 block sm:hidden">
                <button 
                  onClick={() => navigate("/simulador")} 
                  className="w-full flex items-center justify-between gap-4 bg-gradient-to-r from-green-600 to-green-800 rounded-2xl p-4 text-left shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <Calculator size={20} className="text-green-200" />
                    <div>
                      <div className="text-[9px] font-bold text-green-200 uppercase tracking-widest">Ferramenta</div>
                      <div className="text-sm font-black text-white" style={{ fontFamily: "'Syne',sans-serif" }}>Simulador de Impacto Verde</div>
                    </div>
                  </div>
                  <div className="bg-white text-green-800 font-bold text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                    Simular →
                  </div>
                </button>
              </div>

              {/* Painel Escuro de Estatísticas (Métricas ESG) */}
              <div className="bg-gray-950 rounded-2xl p-4 grid grid-cols-3 gap-2 w-full max-w-md shadow-xl border border-white/5">
                {[
                  { v: "4.375", u: "kg", l: "CO₂/mês" },
                  { v: "1.000", u: "+", l: "ativos" },
                  { v: "285", u: "%", l: "ROI" },
                ].map((stat, index) => (
                  <div 
                    key={index} 
                    className={`text-center flex flex-col justify-center ${index < 2 ? "border-r border-white/10" : ""}`}
                  >
                    <div className="text-xl sm:text-2xl font-black text-white leading-none" style={{ fontFamily: "'Syne',sans-serif" }}>
                      {stat.v}<span className="text-green-400">{stat.u}</span>
                    </div>
                    <div className="text-[9px] sm:text-xs text-gray-400 mt-1.5 px-1 tracking-tight">
                      {stat.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COLUNA DA DIREITA: Exibição do Diorama 3D */}
            <div className="lg:col-span-7 flex justify-center items-center w-full px-2 sm:px-6 lg:px-0">
              <div className="relative w-full max-w-lg lg:max-w-none">
                {/* Efeito de Brilho de Fundo */}
                <div className="absolute inset-0 bg-green-400/5 rounded-full blur-3xl pointer-events-none transform scale-75"></div>
                <img 
                  src={dioramaImage} 
                  alt="Diorama 3D Interativo Ecossistema Taggy Edenred" 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.12)]"
                  loading="eager"
                />
              </div>
            </div>

          </div>

          {/* SEÇÃO INFERIOR: Portais de Acesso Compartilhados (Abaixo da Dobra) */}
          <div className="w-full text-center border-t border-gray-100 pt-12">
            <p className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-6">Escolha seu portal de acesso profissional</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left max-w-3xl mx-auto px-2 sm:px-0">
              
              {/* Card de Acesso B2C */}
              <button
                onMouseEnter={() => setHovered("b2c")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate("/b2c/hub")}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered === "b2c" ? "border-green-500 shadow-xl shadow-green-100 -translate-y-1" : "border-gray-200 hover:border-green-300"} bg-white flex flex-col h-full`}
              >
                <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered === "b2c" ? "bg-green-500 text-white" : "bg-green-100 text-green-700"} transition-colors`}>
                  Grátis
                </div>
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                  <User size={28} className="text-green-600" />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Pessoa Física · B2C</div>
                <div className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Portal do Motorista
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">Acompanhe seu rastro de CO₂, converta em pontos e resgate no Marketplace Verde.</p>
                <div className="flex items-center gap-2 bg-green-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-green-200 group-hover:bg-green-600 transition-colors w-full justify-center mt-auto">
                  Entrar como Pessoa Física →
                </div>
              </button>

              {/* Card de Acesso B2B */}
              <button
                onMouseEnter={() => setHovered("b2b")}
                onMouseLeave={() => setHovered(null)}
                onClick={() => navigate("/b2b/dashboard")}
                className={`relative rounded-2xl border-2 p-6 cursor-pointer text-left transition-all duration-200 group ${hovered === "b2b" ? "border-blue-500 shadow-xl shadow-blue-100 -translate-y-1" : "border-gray-200 hover:border-blue-300"} bg-white flex flex-col h-full`}
              >
                <div className={`absolute top-3 right-3 text-xs font-bold px-2 py-0.5 rounded-full ${hovered === "b2b" ? "bg-blue-500 text-white" : "bg-blue-100 text-blue-700"} transition-colors`}>
                  Corporativo
                </div>
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-2xl mb-4 flex-shrink-0">
                  <Building2 size={28} className="text-blue-600" />
                </div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Empresa · B2B</div>
                <div className="text-xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Gestão de Frotas e ESG
                </div>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">Relatórios ESG auditáveis, performance por veículo e simulação de impacto sustentável.</p>
                <div className="flex items-center gap-2 bg-blue-500 text-white rounded-xl px-4 py-2.5 text-sm font-bold shadow-md shadow-blue-200 group-hover:bg-blue-600 transition-colors w-full justify-center mt-auto">
                  Entrar como Empresa →
                </div>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Rodapé Global */}
      <Footer />
    </div>
  );
}