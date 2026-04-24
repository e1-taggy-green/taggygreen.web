import { Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-taggy-light text-taggy-dark font-sans">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 max-w-md w-full">
        <div className="flex justify-center mb-4 text-taggy-green">
          <Leaf size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2">TaggyGreen</h1>
        <p className="text-gray-500 mb-6">Selecione a visão do MVP:</p>
        
        <div className="flex gap-4 justify-center">
          <button 
            onClick={() => navigate('/b2c/hub')}
            className="bg-taggy-green text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Motorista (B2C)
          </button>
          <button 
            onClick={() => navigate('/b2b/dashboard')}
            className="bg-edenred-orange text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-all"
          >
            Gestor (B2B)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;