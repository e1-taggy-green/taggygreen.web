import { Leaf } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center border border-gray-100 max-w-md w-full">
        <div className="flex justify-center mb-4 text-taggy-green">
          <Leaf size={48} />
        </div>
        <h1 className="text-3xl font-bold mb-2">TaggyGreen</h1>
        <p className="text-gray-500 mb-6">Ambiente configurado com sucesso!</p>
        
        <div className="flex gap-4 justify-center">
          <button className="bg-taggy-green text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">
            Motorista
          </button>
          <button className="bg-edenred-orange text-white px-4 py-2 rounded-lg font-semibold hover:opacity-90">
            Gestor B2B
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;