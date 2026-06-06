import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import HubB2C from '../pages/B2C/Hub';
import MarketplaceB2C from '../pages/B2C/Marketplace';
import DashboardB2B from '../pages/B2B/Dashboard';
import SimuladorB2B from '../pages/B2B/Simulador';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/b2c/hub" element={<HubB2C />} />
        <Route path="/b2c/marketplace" element={<MarketplaceB2C />} />
        <Route path="/b2b/dashboard" element={<DashboardB2B />} />
        <Route path="/b2b/simulador" element={<SimuladorB2B />} />
        <Route path="/simulador" element={<SimuladorB2B />} />
        <Route path="*" element={
          <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="text-center max-w-md">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🌿</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 mb-3" style={{ fontFamily: "'Syne',sans-serif" }}>404</h1>
              <p className="text-lg font-semibold text-gray-700 mb-2">Página não encontrada</p>
              <p className="text-sm text-gray-400 mb-6">Parece que essa rota não existe. Que tal voltar para o início?</p>
              <a href="/" className="inline-flex items-center gap-2 bg-green-500 text-white text-sm font-bold px-6 py-3 rounded-xl hover:bg-green-600 transition-all shadow-md shadow-green-100">
                ← Voltar para a Home
              </a>
            </div>
          </div>
        } />
      </Routes>
    </BrowserRouter>
  );
}
