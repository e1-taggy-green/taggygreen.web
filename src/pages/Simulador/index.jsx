import { Nav, Footer, MetricCard } from "../../components/shared";

export default function SimuladorPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="simulador" />

      <div className="bg-gradient-to-br from-green-700 to-green-950 px-6 py-12 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full">
            <defs>
              <pattern id="g" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1.5" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-xl mx-auto">
          <div className="text-4xl mb-4">🌱</div>
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>
            Simulador de Impacto Verde
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Esta página mostra o design do simulador com seus dados personalizados.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 px-6 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg">👤</span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>Seus Dados</h3>
            </div>
            <div className="p-6 grid grid-cols-2 gap-4">
              {[
                { label: "Nome Completo", value: "Renato Souza" },
                { label: "E-mail Profissional", value: "renato@empresa.com.br" },
                { label: "Telefone", value: "(11) 90000-0000" },
                { label: "Endereço da Empresa", value: "Av. Paulista, 1000" },
              ].map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-bold text-gray-700 mb-1.5">{field.label}</label>
                  <div className="w-full px-3.5 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500 bg-gray-50">
                    {field.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg">🚚</span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>Dados da Frota</h3>
            </div>
            <div className="p-6 space-y-5">
              {[
                { label: "Número de veículos", value: "120" },
                { label: "Km médio mensal/veículo", value: "8.000" },
                { label: "Passagens por mês/veículo", value: "220" },
                { label: "% da frota com Tag Edenred", value: "80%" },
              ].map((field) => (
                <div key={field.label}>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-bold text-gray-700">{field.label}</label>
                    <span className="text-xs text-green-700 font-black">{field.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div className="h-full bg-green-500" style={{ width: field.value.toString().includes("%") ? field.value : "70%" }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full py-4 bg-green-500 text-white rounded-2xl font-black text-lg hover:bg-green-600 transition-all shadow-xl shadow-green-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3" style={{ fontFamily: "'Syne',sans-serif" }}>
            <span>🌱</span> Simulação 
          </button>

          <div className="space-y-4">
            <div className="bg-gradient-to-br from-green-700 to-green-950 rounded-2xl p-6 text-center shadow-xl">
              <div className="text-green-300 text-xs font-bold uppercase tracking-widest mb-2">Projeção Anual </div>
              <div className="text-5xl font-black text-white mb-1" style={{ fontFamily: "'Syne',sans-serif" }}>
                4.375 <span className="text-green-300 text-2xl">kg CO₂</span>
              </div>
              <div className="text-white/60 text-sm">Resultado</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <MetricCard icon="⛽" label="Combustível Poupado/ano" value="1.470" unit="L" bg="bg-blue-50" />
              <MetricCard icon="⏱️" label="Horas Otimizadas/ano" value="142" unit="hrs" bg="bg-amber-50" />
              <MetricCard icon="💰" label="Economia Estimada/ano" value="R$ 18.450" bg="bg-green-50" />
              <MetricCard icon="📈" label="ROI Estimado" value="285" unit="%" bg="bg-purple-50" />
            </div>

            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
