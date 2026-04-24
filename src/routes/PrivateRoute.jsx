import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute({ allowedRole }) {
  // Simulando que o usuário está logado sempre (Ajustem depois para integrar com o Auth real)
  const isAuthenticated = true; 
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}