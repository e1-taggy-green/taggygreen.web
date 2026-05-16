import { useState } from "react";
import { Nav, Footer, MetricCard } from "../../../components/shared";

export default function SimuladorPage() {
  const [formData, setFormData] = useState({
    veiculos: 120,
    kmMes: 8200,
    passagens: 210,
    percTag: 78
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resultados = {
    combustivelPoupado: 1420,
    tempoOtimizado: 136,
    economiaEstimada: 17900,
    roiEstimado: 278
  };

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
          <div className="text-4xl mb-4"></div>
          <h1 className="text-4xl font-black text-white mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>
            Simulador Corporativo
          </h1>
          <p className="text-white/70 text-base leading-relaxed">
            Calcule o impacto sustentável da Tag Edenred na sua frota.
          </p>
        </div>
      </div>

      <div className="flex-1 bg-gray-50 px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* FORMULÁRIO */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg"></span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Dados da Frota
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Número de Veículos
                </label>
                <input
                  type="number"
                  value={formData.veiculos}
                  onChange={(e) => handleInputChange('veiculos', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  placeholder="Ex: 120"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Km percorridos por mês
                </label>
                <input
                  type="number"
                  value={formData.kmMes}
                  onChange={(e) => handleInputChange('kmMes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  placeholder="Ex: 8200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Passagens por mês
                </label>
                <input
                  type="number"
                  value={formData.passagens}
                  onChange={(e) => handleInputChange('passagens', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  placeholder="Ex: 210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  % da frota com Tag Edenred
                </label>
                <input
                  type="number"
                  value={formData.percTag}
                  onChange={(e) => handleInputChange('percTag', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500"
                  placeholder="Ex: 78"
                />
              </div>
            </div>
          </div>

          {/* RESULTADOS */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span className="text-lg"></span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Simulação
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <MetricCard icon="" label="Combustível Poupado" value={resultados.combustivelPoupado.toLocaleString()} unit="L" bg="bg-blue-50" />
                <MetricCard icon="" label="Tempo Otimizado" value={resultados.tempoOtimizado.toLocaleString()} unit="hrs" bg="bg-amber-50" />
                <MetricCard icon="" label="Economia Estimada" value={`R$ ${resultados.economiaEstimada.toLocaleString()}`} bg="bg-green-50" />
                <MetricCard icon="" label="ROI Estimado" value={resultados.roiEstimado.toLocaleString()} unit="%" bg="bg-purple-50" />
              </div>

              <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl mt-0.5 flex-shrink-0">✅</span>
                <div>
                  <div className="font-bold text-green-800 text-sm mb-1">Simulação Concluída</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
