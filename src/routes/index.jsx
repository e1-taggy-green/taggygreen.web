import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home           from '../pages/Home';
import HubB2C         from '../pages/B2C/Hub';
import MeuRastroVerde from '../pages/B2C/MeuRastro';
import MarketplaceB2C from '../pages/B2C/Marketplace';
import DashboardB2B   from '../pages/B2B/Dashboard';
import SimuladorB2B   from '../pages/B2B/Simulador';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                element={<Home />} />
        <Route path="/b2c/hub"         element={<HubB2C />} />
        <Route path="/b2c/meu-rastro"  element={<MeuRastroVerde />} />
        <Route path="/b2c/marketplace" element={<MarketplaceB2C />} />
        <Route path="/b2b/dashboard"   element={<DashboardB2B />} />
        <Route path="/b2b/simulador"   element={<SimuladorB2B />} />
        <Route path="/simulador"       element={<SimuladorB2B />} />
        <Route path="*"                element={<h1 className="text-center mt-10">404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
