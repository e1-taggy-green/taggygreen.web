import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRoutes from './routes/index.jsx' 
import { SpinnerProvider } from './contexts/SpinnerContext.jsx'
import { ToastProvider } from './contexts/ToastContext.jsx'
import { UserProvider } from './contexts/UserContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SpinnerProvider>
      <ToastProvider>
        <UserProvider>
          <AppRoutes />
        </UserProvider>
      </ToastProvider>
    </SpinnerProvider>
  </StrictMode>,
)