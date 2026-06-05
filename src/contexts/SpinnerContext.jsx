import { createContext, useContext, useState, useCallback } from "react";
import { Leaf } from "lucide-react";

const SpinnerContext = createContext(null);

export function SpinnerProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("Carregando...");

  const showSpinner = useCallback((msg = "Carregando...") => {
    setMessage(msg);
    setLoading(true);
  }, []);

  const hideSpinner = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <SpinnerContext.Provider value={{ showSpinner, hideSpinner }}>
      {children}
      {loading && (
        <div className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white rounded-2xl px-8 py-6 flex flex-col items-center gap-4 shadow-2xl max-w-xs w-full mx-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-spin">
              <Leaf size={24} className="text-green-600" />
            </div>
            <p className="text-sm font-semibold text-gray-700 text-center">{message}</p>
          </div>
        </div>
      )}
    </SpinnerContext.Provider>
  );
}

export function useSpinner() {
  const ctx = useContext(SpinnerContext);
  if (!ctx) throw new Error("useSpinner must be used within SpinnerProvider");
  return ctx;
}
