// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { supabase } from "@/db/supabaseClient";

export const useAuth = () => {
  const [session, setSession] = useState<any>(null); // Estado para armazenar a sessão do usuário

  useEffect(() => {
    // Obtém a sessão atual assim que o componente for montado
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // Configura o listener para mudanças de estado de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Atualiza o estado com a nova sessão
    });

    // Cleanup: desinscreve do listener quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return session;
};
