import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importação das Páginas
import HubB2C from '../pages/B2C/Hub';
// import MarketplaceB2C from '../pages/B2C/Marketplace';
import DashboardB2B from '../pages/B2B/Dashboard';
// import SimuladorB2B from '../pages/B2B/Simulador';

// Um componente simples (Home) para substituir o Login e servir de menu inicial
import Home from '../App'; 

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Tela Inicial (A "Homepage" com os botões B2C e B2B) */}
        <Route path="/" element={<Home />} />

        {/* Módulo B2C (Motorista) */}
        <Route path="/b2c/hub" element={<HubB2C />} />
        {/* <Route path="/b2c/marketplace" element={<MarketplaceB2C />} /> */}

        {/* Módulo B2B (Gestor de Frota) */}
        <Route path="/b2b/dashboard" element={<DashboardB2B />} />
        {/* <Route path="/b2b/simulador" element={<SimuladorB2B />} /> */}

        {/* Rota de Fallback */}
        <Route path="*" element={<h1 className="text-center mt-10">404 - Página Não Encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}