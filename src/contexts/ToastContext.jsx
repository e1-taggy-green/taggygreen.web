import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";

const ToastContext = createContext(null);

function ToastItem({ toast, onRemove }) {
  const icons = {
    error:   <AlertTriangle size={18} className="text-red-500 flex-shrink-0 mt-0.5" />,
    success: <CheckCircle  size={18} className="text-green-500 flex-shrink-0 mt-0.5" />,
    info:    <Info         size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />,
  };
  const styles = {
    error:   "border-red-200 bg-red-50",
    success: "border-green-200 bg-green-50",
    info:    "border-blue-200 bg-blue-50",
  };

  return (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl border shadow-lg w-full ${styles[toast.type]}`}>
      {icons[toast.type]}
      <p className="text-sm font-semibold text-gray-800 flex-1 leading-snug">{toast.message}</p>
      <button onClick={() => onRemove(toast.id)} className="flex-shrink-0 text-gray-400 hover:text-gray-600 mt-0.5">
        <X size={16} />
      </button>
    </div>
  );
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info", duration = 5000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev.slice(-2), { id, message, type }]); // máx 3 toasts
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Escuta erros globais do interceptador Axios
  useEffect(() => {
    const handler = (e) => addToast(e.detail.message, "error");
    window.addEventListener("api-error", handler);
    return () => window.removeEventListener("api-error", handler);
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-96 z-[9999] flex flex-col gap-2 pointer-events-none">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onRemove={removeToast} />
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast deve ser usado dentro do ToastProvider");
  return ctx;
}
