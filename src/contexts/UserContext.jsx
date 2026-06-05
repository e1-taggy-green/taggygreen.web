import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { b2cService } from "../services/b2cService";

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [userName,   setUserName]   = useState(null);
  const [userId,     setUserId]     = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [loading,    setLoading]    = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await b2cService.getUser();
      setUserName(res.data?.userName ?? null);
      setUserPoints(res.data?.userPoints ?? null);
      // O endpoint /b2c/user não retorna o ID ainda.
      // Fallback: ID 1 é o usuário teste.b2c@taggy.com no seed.
      setUserId(res.data?.userId ?? res.data?.id ?? 1);
    } catch {
      // silencia — dados ficam nulos
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  // Atualiza saldo localmente após resgate
  const debitarPontos = useCallback((pontos) => {
    setUserPoints((prev) => prev != null ? Math.max(0, prev - pontos) : prev);
  }, []);

  return (
    <UserContext.Provider value={{ userName, userId, userPoints, loading, debitarPontos, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser deve ser usado dentro do UserProvider");
  return ctx;
}
