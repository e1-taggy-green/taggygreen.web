import { useNavigate } from 'react-router-dom';
import { TreePine, Car, Lightbulb, ArrowLeft, Award } from 'lucide-react';

export default function HubB2C() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-taggy-light p-6 font-sans text-taggy-dark">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Simples */}
        <header className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/')} className="text-gray-400 hover:text-taggy-green">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-xl font-bold">Olá, Renato 👋</h1>
              <p className="text-sm text-gray-500">Veja seu impacto no mundo.</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-2 rounded-lg font-semibold">
            <Award size={20} />
            <span>1.250 pts</span>
          </div>
        </header>

        {/* Card Principal: Meu Rastro */}
        <section className="bg-taggy-green text-white rounded-3xl p-8 shadow-lg flex items-center justify-between">
          <div>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">ABRIL / 2026</span>
            <h2 className="text-6xl font-bold mt-4 mb-2">45 kg</h2>
            <p className="text-green-50 max-w-sm">
              de CO₂ evitados usando a sua Tag Edenred nas passagens de pedágio e postos.
            </p>
          </div>
          <TreePine size={120} className="text-white/20" />
        </section>

        {/* Conversor Lúdico */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-700">O que isso significa na prática?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <TreePine size={32} className="text-taggy-green mb-4" />
              <h4 className="text-2xl font-bold mb-1">4.5</h4>
              <p className="text-sm font-semibold text-gray-700">Árvores plantadas</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Car size={32} className="text-blue-500 mb-4" />
              <h4 className="text-2xl font-bold mb-1">450</h4>
              <p className="text-sm font-semibold text-gray-700">Km a menos</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <Lightbulb size={32} className="text-yellow-500 mb-4" />
              <h4 className="text-2xl font-bold mb-1">225</h4>
              <p className="text-sm font-semibold text-gray-700">Horas de lâmpada</p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}