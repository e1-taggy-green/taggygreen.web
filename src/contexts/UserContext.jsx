import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { b2cService } from "../services/b2cService";

const UserContext = createContext(null);

// E-mail do usuário demo B2C (cadastrado no seed do backend).
const DEFAULT_B2C_EMAIL = "teste.b2c@taggy.com";

export function UserProvider({ children }) {
  const [userName,   setUserName]   = useState(null);
  const [userId,     setUserId]     = useState(null);
  const [userEmail,  setUserEmail]  = useState(DEFAULT_B2C_EMAIL);
  const [userPoints, setUserPoints] = useState(null);
  const [loading,    setLoading]    = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const res = await b2cService.getUser(DEFAULT_B2C_EMAIL);
      setUserName(res.data?.userName ?? null);
      setUserPoints(res.data?.userPoints ?? null);
      // O endpoint /b2c/user não retorna o ID ainda.
      // Fallback: ID 1 é o usuário teste.b2c@taggy.com no seed.
      setUserId(res.data?.userId ?? res.data?.id ?? 1);
      setUserEmail(res.data?.userEmail ?? res.data?.email ?? DEFAULT_B2C_EMAIL);
    } catch {
      // silencia — dados ficam nulos
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUser(); }, [fetchUser]);

  // Aplica o saldo ABSOLUTO devolvido pelo backend após um resgate
  // (POST /resgatar → { saldo_atualizado }). Fonte da verdade é o backend.
  const atualizarSaldo = useCallback((saldoAbsoluto) => {
    if (saldoAbsoluto != null) setUserPoints(saldoAbsoluto);
  }, []);

  return (
    <UserContext.Provider
      value={{ userName, userId, userEmail, userPoints, loading, atualizarSaldo, fetchUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser deve ser usado dentro do UserProvider");
  return ctx;
}