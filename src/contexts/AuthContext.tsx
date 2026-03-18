import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  requireAuth: () => boolean;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signOut: async () => {},
  requireAuth: () => false,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setLoading(false);

        if (event === "SIGNED_OUT" || event === "TOKEN_REFRESHED" && !session) {
          toast.error("Your session has expired. Please log in again.");
          window.location.href = "/auth";
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const requireAuth = useCallback(() => {
    if (!session?.user) {
      toast.error("Please log in to continue.");
      window.location.href = "/auth";
      return false;
    }
    return true;
  }, [session]);

  return (
    <AuthContext.Provider value={{ session, user: session?.user ?? null, loading, signOut, requireAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
