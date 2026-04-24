import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';

import Login from '../pages/Auth/Login';
import HubB2C from '../pages/B2C/Hub';
import DashboardB2B from '../pages/B2B/Dashboard';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota Inicial */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Rota B2C */}
        <Route element={<PrivateRoute allowedRole="b2c" />}>
          <Route path="/b2c/hub" element={<HubB2C />} />
        </Route>

        {/* Rota B2B */}
        <Route element={<PrivateRoute allowedRole="b2b" />}>
          <Route path="/b2b/dashboard" element={<DashboardB2B />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}