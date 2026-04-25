import { useNavigate } from 'react-router-dom';
import { TreePine, Car, Lightbulb, ArrowLeft, Award, Loader2 } from 'lucide-react';
import { useB2CDashboard } from '../../../hooks/useB2CDashboard';

export default function HubB2C() {
  const navigate = useNavigate();
  const { data, loading, error } = useB2CDashboard();

  // Estado de Carregamento
  if (loading) {
    return (
      <div className="min-h-screen bg-taggy-light flex items-center justify-center">
        <Loader2 className="animate-spin text-taggy-green" size={48} />
      </div>
    );
  }

  // Tratamento de Erro Básico
  if (error) {
    return (
      <div className="min-h-screen bg-taggy-light flex items-center justify-center text-red-500 font-bold">
        Ops! Ocorreu um erro ao carregar seus dados: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-taggy-light p-6 font-sans text-taggy-dark">
      <div className="max-w-4xl mx-auto space-y-6">
        
        <header className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-taggy-green">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Olá, {data.user?.userName || 'Visitante'} 👋</h1>
              <p className="text-sm text-gray-500">Veja seu impacto no mundo.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-semibold">
            <Award size={20} />
            <span>{data.user?.userPoints || 0} pts</span>
          </div>
        </header>

        <section className="bg-taggy-green text-white rounded-3xl p-8 shadow-lg flex items-center justify-between">
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">ESTE MÊS</span>
            <h2 className="text-6xl font-bold mt-4 mb-2">{data.rastro?.co2Evitado || 0} kg</h2>
            <p className="text-green-50 max-w-sm">
              de CO₂ evitados usando a sua Tag Edenred nas passagens de pedágio e postos.
            </p>
          </div>
          <TreePine size={120} className="text-white/20" />
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">O que isso significa na prática?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <TreePine size={32} className="text-taggy-green mb-4" />
              <h4 className="text-2xl font-bold mb-1">{data.rastro?.arvoresSalvas || 0}</h4>
              <p className="text-sm font-semibold text-gray-700">Árvores plantadas</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Car size={32} className="text-blue-500 mb-4" />
              <h4 className="text-2xl font-bold mb-1">{data.rastro?.kmPoupados || 0}</h4>
              <p className="text-sm font-semibold text-gray-700">Km a menos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Lightbulb size={32} className="text-yellow-500 mb-4" />
              <h4 className="text-2xl font-bold mb-1">{data.rastro?.horasLampada || 0}</h4>
              <p className="text-sm font-semibold text-gray-700">Horas de lâmpada</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}