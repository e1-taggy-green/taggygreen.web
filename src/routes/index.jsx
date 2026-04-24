import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HubB2C from '../pages/B2C/Hub';
// import MarketplaceB2C from '../pages/B2C/Marketplace';
import DashboardB2B from '../pages/B2B/Dashboard';
// import SimuladorB2B from '../pages/B2B/Simulador';

// Componente simples (Home)
import Home from '../App'; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/b2c/hub" element={<HubB2C />} />
        {/* <Route path="/b2c/marketplace" element={<MarketplaceB2C />} /> */}

        <Route path="/b2b/dashboard" element={<DashboardB2B />} />
        {/* <Route path="/b2b/simulador" element={<SimuladorB2B />} /> */}

        <Route path="*" element={<h1 className="text-center mt-10">404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}