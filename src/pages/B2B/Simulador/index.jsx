import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Footer } from "../../../components/shared";
import {
  Calculator, Car, Fuel, Clock, Coins, Activity,
  User, Mail, Phone, MapPin, Truck, AlertTriangle, Leaf,
} from "lucide-react";
import { b2bService } from "../../../services/b2bService";
import { useSpinner } from "../../../contexts/SpinnerContext";
import { useToast } from "../../../contexts/ToastContext";

// ─── TELA DE RESULTADO ────────────────────────────────────────────────────────
function ResultadoSimulacao({ resultados, onRefazer }) {
  const navigate = useNavigate();

  const cards = [
    { icon: <Activity size={28} className="text-green-600" />, label: "Emissões de CO₂ evitadas", value: resultados.economiaCo2.toLocaleString("pt-BR", { maximumFractionDigits: 1 }), unit: "kg", bg: "bg-green-50" },
    { icon: <Fuel     size={28} className="text-blue-500"  />, label: "Combustível economizado",  value: resultados.combustivelPoupado.toLocaleString("pt-BR", { maximumFractionDigits: 1 }), unit: "L",  bg: "bg-blue-50"  },
    { icon: <Clock    size={28} className="text-purple-500"/>, label: "Tempo poupado em filas",   value: resultados.tempoOtimizado.toLocaleString("pt-BR"), unit: "h",  bg: "bg-purple-50"},
    { icon: <Coins    size={28} className="text-amber-500" />, label: "Economia financeira total", value: `R$ ${resultados.economiaEstimada.toLocaleString("pt-BR", { maximumFractionDigits: 2 })}`, unit: "", bg: "bg-amber-50" },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Nav activePage="simulador" />

      <div className="flex-1 bg-gray-50 flex items-center justify-center px-4 sm:px-6 py-10 sm:py-16">
        <div className="max-w-2xl w-full text-center space-y-6 sm:space-y-8">
          {/* Ícone */}
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Leaf size={32} className="text-green-600" />
            </div>
          </div>

          {/* Título */}
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Syne',sans-serif" }}>
              Seu Impacto Verde Estimado
            </h1>
            <p className="text-sm text-gray-500">
              Com a Tag Edenred, sua frota pode alcançar a seguinte economia anual:
            </p>
          </div>

          {/* Cards de resultado */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-left w-full">
            {cards.map((card, i) => (
              <div key={i} className={`${card.bg} rounded-2xl p-4 sm:p-5 flex items-start gap-3 sm:gap-4`}>
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                  {card.icon}
                </div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">{card.label}</div>
                  <div className="text-xl sm:text-2xl font-black text-gray-900 break-all" style={{ fontFamily: "'Syne',sans-serif" }}>
                    {card.value} <span className="text-base font-semibold text-gray-400">{card.unit}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botões */}
          <div className="flex items-center justify-center gap-4 pt-2">
            <button
              onClick={onRefazer}
              className="px-6 py-3 rounded-xl border border-gray-300 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all"
            >
              Refazer Simulação
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 rounded-xl bg-green-500 text-white text-sm font-bold hover:bg-green-600 transition-all shadow-md shadow-green-100 flex items-center gap-2"
            >
              <Leaf size={16} /> Ir para Home
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

// ─── FORMULÁRIO ───────────────────────────────────────────────────────────────
export default function SimuladorPage() {
  const [formData, setFormData] = useState({
    nome: "", email: "", telefone: "", endereco: "",
    qtdCarros: "", qtdCaminhoes: "",
    pedagiosCarro: "", pedagiosCaminhao: "",
    estacCarro: "", estacCaminhao: "",
  });
  const [resultados, setResultados] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState(null);
  const { showSpinner, hideSpinner } = useSpinner();
  const { addToast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSimular = async (e) => {
    if (e) e.preventDefault();
    setErro(null);

    if (!formData.nome || !formData.email) {
      setErro("Por favor, preencha os campos obrigatórios (Nome e E-mail) para continuar.");
      return;
    }

    setLoading(true);
    showSpinner("Calculando impacto sustentável...");
    try {
      const payload = {
        lead: {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone || null,
          endereco: formData.endereco || null,
        },
        frota: {
          qtd_carros: Number(formData.qtdCarros) || 0,
          qtd_caminhoes: Number(formData.qtdCaminhoes) || 0,
          eventos_pedagio_carros: Number(formData.pedagiosCarro) || 0,
          eventos_estacionamento_carros: Number(formData.estacCarro) || 0,
          eventos_pedagio_caminhoes: Number(formData.pedagiosCaminhao) || 0,
          eventos_estacionamento_caminhoes: Number(formData.estacCaminhao) || 0,
        },
      };

      if (payload.frota.qtd_carros === 0 && payload.frota.qtd_caminhoes === 0) {
        setErro("A frota deve conter pelo menos 1 veículo (carro ou caminhão).");
        setLoading(false);
        return;
      }

      const { data } = await b2bService.postSimulacao(payload);

      setResultados({
        combustivelPoupado: data.economia_gasolina_litros,
        tempoOtimizado: Math.round(data.economia_tempo_minutos / 60),
        economiaEstimada: data.dinheiro_economizado,
        economiaCo2: data.economia_co2_kg,
      });
    } catch (error) {
      console.error("Erro ao simular:", error);
      if (error.response?.status === 422) {
        setErro("Verifique os campos preenchidos. O e-mail deve ter um formato válido.");
      } else {
        setErro("Ocorreu um erro ao conectar com o servidor. Tente novamente.");
      }
    } finally {
      setLoading(false);
      hideSpinner();
    }
  };

  // Mostra tela de resultado quando há dados
  if (resultados) {
    return (
      <ResultadoSimulacao
        resultados={resultados}
        onRefazer={() => setResultados(null)}
      />
    );
  }

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
          <form onSubmit={handleSimular} className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

            {/* Dados do Contato */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <User size={20} className="text-gray-900" />
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>Dados do Contato</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-100">
              {[
                { field: "nome",     label: "Nome Completo",     icon: <User  size={16} className="text-gray-400" />, placeholder: "Ex: João Silva",          type: "text"  },
                { field: "email",    label: "E-mail",            icon: <Mail  size={16} className="text-gray-400" />, placeholder: "Ex: joao@empresa.com",    type: "email" },
                { field: "telefone", label: "Telefone",          icon: <Phone size={16} className="text-gray-400" />, placeholder: "Ex: (11) 99999-9999",     type: "text"  },
                { field: "endereco", label: "Endereço / Empresa", icon: <MapPin size={16} className="text-gray-400" />, placeholder: "Ex: Av. Paulista, 1000", type: "text"  },
              ].map(({ field, label, icon, placeholder, type }) => (
                <div key={field}>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                    {icon} {label}
                  </label>
                  <input
                    type={type}
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    placeholder={placeholder}
                  />
                </div>
              ))}
            </div>

            {/* Dados da Frota */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2 bg-gray-50">
              <Car size={20} className="text-gray-900" />
              <h3 className="font-black text-gray-900" style={{ fontFamily: "'Syne',sans-serif" }}>Dados da Frota</h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { field: "qtdCarros",        label: "Quantidade de Carros",               icon: <Car   size={16} className="text-gray-400" />, placeholder: "Ex: 10" },
                { field: "qtdCaminhoes",     label: "Quantidade de Caminhões",             icon: <Truck size={16} className="text-gray-400" />, placeholder: "Ex: 5"  },
                { field: "pedagiosCarro",    label: "Passagens de Pedágio (Carros) / mês",    icon: null, placeholder: "Ex: 40" },
                { field: "pedagiosCaminhao", label: "Passagens de Pedágio (Caminhões) / mês", icon: null, placeholder: "Ex: 20" },
                { field: "estacCarro",       label: "Estacionamentos (Carros) / mês",         icon: null, placeholder: "Ex: 10" },
                { field: "estacCaminhao",    label: "Estacionamentos (Caminhões) / mês",      icon: null, placeholder: "Ex: 5"  },
              ].map(({ field, label, icon, placeholder }) => (
                <div key={field}>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-2">
                    {icon} {label}
                  </label>
                  <input
                    type="number"
                    value={formData[field]}
                    onChange={(e) => handleInputChange(field, e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 bg-white"
                    placeholder={placeholder}
                    min="0"
                  />
                </div>
              ))}
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
                {loading ? "Calculando impacto..." : "Simular Economia"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
