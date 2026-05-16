import { useEffect } from "react";

/**
 * Toast/Snackbar Component
 * Notificações temporárias para feedback ao usuário
 */
export function Toast({ message, type = "error", onClose, autoCloseDuration = 5000 }) {
  useEffect(() => {
    if (message && autoCloseDuration > 0) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
  }, [message, autoCloseDuration, onClose]);

  if (!message) return null;

  const typeStyles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconMap = {
    error: "Erro",
    warning: "Atenção",
    success: "Sucesso",
    info: "Info",
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 shadow-lg ${typeStyles[type]}`}>
        <span className="text-sm font-semibold flex-shrink-0">{iconMap[type]}</span>
        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-2 flex-shrink-0 text-lg hover:opacity-70 transition-opacity"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
