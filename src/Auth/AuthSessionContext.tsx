import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { Session } from "@supabase/supabase-js";

type authSessionContextType = {
  session: Session | null;
  loading: boolean;
};

const authSessionContext = createContext<authSessionContextType>(
  {} as authSessionContextType
);

type AuthSessionProviderProps = {
  children: React.ReactNode;
};
export const AuthSessionProvider = ({ children }: AuthSessionProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const auth = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) console.error("Error getting session", error);
      else setSession(session);
      setLoading(false);
    };
    auth();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return<authSessionContext.Provider value={{ session, loading }}>
    {children}
  </authSessionContext.Provider>;
};

export const useAuthSession = () => {
  return useContext(authSessionContext);
};