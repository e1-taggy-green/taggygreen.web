import { useState } from "react";
import { Nav, Footer, MetricCard } from "../../../components/shared";
import { Calculator, Car, LineChart, CheckCircle, Fuel, Clock, Coins, Activity, User, Mail, Phone, MapPin, Truck, AlertTriangle } from "lucide-react";
import { b2bService } from "../../../services/b2bService";

export default function SimuladorPage() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    endereco: "",
    qtdCarros: "",
    qtdCaminhoes: "",
    pedagiosCarro: "",
    pedagiosCaminhao: "",
    estacCarro: "",
    estacCaminhao: ""
  });
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSimular = async (e) => {
    if (e) e.preventDefault();
    setErro(null);

    if (!formData.nome || !formData.email) {
      setErro("Por favor, preencha os campos obrigatórios (Nome e E-mail) para continuar.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        lead: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone || null,
          endereco: formData.endereco || null
        },
        frota: {
          qtd_carros: Number(formData.qtdCarros) || 0,
          qtd_caminhoes: Number(formData.qtdCaminhoes) || 0,
          eventos_pedagio_carros: Number(formData.pedagiosCarro) || 0,
          eventos_estacionamento_carros: Number(formData.estacCarro) || 0,
          eventos_pedagio_caminhoes: Number(formData.pedagiosCaminhao) || 0,
          eventos_estacionamento_caminhoes: Number(formData.estacCaminhao) || 0
        }
      };

      // Fallback para evitar erro de validação (A API exige no mínimo 1 veículo no total)
      if (payload.frota.qtd_carros === 0 && payload.frota.qtd_caminhoes === 0) {
        setErro("A frota deve conter pelo menos 1 veículo (carro ou caminhão).");
        setLoading(false);
        return;
      }
      
      const { data } = await b2bService.postSimulacao(payload);
      
      setResultados({
        combustivelPoupado: data.economia_gasolina_litros,
        tempoOtimizado: Math.round(data.economia_tempo_minutos / 60), // Convertendo para horas
        economiaEstimada: data.dinheiro_economizado,
        economiaCo2: data.economia_co2_kg
      });
    } catch (error) {
      console.error("Erro ao simular mitigação:", error);
      if (error.response && error.response.status === 422) {
        setErro("Verifique os campos preenchidos. O e-mail deve ter um formato válido.");
      } else {
        setErro("Ocorreu um erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
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
          <div className="mb-4">
            <Calculator size={48} className="text-green-200 mx-auto" />
          </div>
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
          <form onSubmit={handleSimular} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            
            {/* DADOS DO CONTATO */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <span>
                <User size={20} className="text-gray-900" />
              </span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Dados do Contato
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <User size={16} className="text-gray-400" /> Nome Completo
                </label>
                <input
                  type="text"
                  value={formData.nome || ""}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: João Silva"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <Mail size={16} className="text-gray-400" /> E-mail
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: joao@empresa.com"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <Phone size={16} className="text-gray-400" /> Telefone
                </label>
                <input
                  type="text"
                  value={formData.telefone || ""}
                  onChange={(e) => handleInputChange('telefone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: (11) 99999-9999"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <MapPin size={16} className="text-gray-400" /> Endereço / Empresa
                </label>
                <input
                  type="text"
                  value={formData.endereco || ""}
                  onChange={(e) => handleInputChange('endereco', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: Av. Paulista, 1000"
                />
              </div>
            </div>

            {/* DADOS DA FROTA */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <span>
                <Car size={20} className="text-gray-900" />
              </span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Dados da Frota
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <Car size={16} className="text-gray-400" /> Quantidade de Carros
                </label>
                <input
                  type="number"
                  value={formData.qtdCarros || ""}
                  onChange={(e) => handleInputChange('qtdCarros', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 10"
                  min="0"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  <Truck size={16} className="text-gray-400" /> Quantidade de Caminhões
                </label>
                <input
                  type="number"
                  value={formData.qtdCaminhoes || ""}
                  onChange={(e) => handleInputChange('qtdCaminhoes', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 5"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Passagens de Pedágio (Carros) / mês
                </label>
                <input
                  type="number"
                  value={formData.pedagiosCarro || ""}
                  onChange={(e) => handleInputChange('pedagiosCarro', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 40"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Passagens de Pedágio (Caminhões) / mês
                </label>
                <input
                  type="number"
                  value={formData.pedagiosCaminhao || ""}
                  onChange={(e) => handleInputChange('pedagiosCaminhao', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 20"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Estacionamentos (Carros) / mês
                </label>
                <input
                  type="number"
                  value={formData.estacCarro || ""}
                  onChange={(e) => handleInputChange('estacCarro', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 10"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
                  Estacionamentos (Caminhões) / mês
                </label>
                <input
                  type="number"
                  value={formData.estacCaminhao || ""}
                  onChange={(e) => handleInputChange('estacCaminhao', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white relative z-10"
                  placeholder="Ex: 5"
                  min="0"
                />
              </div>
            </div>

            {erro && (
              <div className="px-6 py-3 bg-red-50 border-t border-red-100 flex items-center gap-2 text-red-700 text-sm font-semibold">
                <AlertTriangle size={18} /> {erro}
              </div>
            )}

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                type="submit"
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-sm disabled:opacity-50 flex items-center gap-2"
              >
                {loading ? 'Calculando impacto...' : 'Simular Economia'}
              </button>
            </div>
          </form>

          {/* RESULTADOS */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <span>
                <LineChart size={20} className="text-gray-900" />
              </span>
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>
                Simulação
              </h3>
            </div>
            <div className="p-6">
              {resultados ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <MetricCard icon={<Fuel size={20} />} label="Combustível Poupado" value={resultados.combustivelPoupado.toLocaleString(undefined, {maximumFractionDigits: 1})} unit="L" bg="bg-blue-50" />
                    <MetricCard icon={<Clock size={20} />} label="Tempo Otimizado" value={resultados.tempoOtimizado.toLocaleString()} unit="hrs" bg="bg-amber-50" />
                    <MetricCard icon={<Coins size={20} />} label="Economia Estimada" value={`R$ ${resultados.economiaEstimada.toLocaleString(undefined, {maximumFractionDigits: 2})}`} bg="bg-green-50" />
                    <MetricCard icon={<Activity size={20} />} label="CO₂ Evitado" value={resultados.economiaCo2.toLocaleString(undefined, {maximumFractionDigits: 1})} unit="kg" bg="bg-purple-50" />
                  </div>

                  <div className="bg-green-50 border border-green-200 border-l-4 border-l-green-500 rounded-2xl p-4 flex items-start gap-3">
                    <span className="mt-0.5 flex-shrink-0">
                      <CheckCircle size={24} className="text-green-600" />
                    </span>
                    <div>
                      <div className="font-bold text-green-800 text-sm mb-1">Simulação Concluída</div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-10 text-gray-500 font-medium">
                  Preencha os dados da frota e clique em "Simular Economia" para ver o cálculo de mitigação.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
