import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from "@/integrations/supabase/types";

type AppRole = Database["public"]["Enums"]["app_role"];

export const useUserRoles = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["user_roles", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user!.id);
      if (error) throw error;
      return (data ?? []).map((r) => r.role);
    },
    staleTime: 5 * 60 * 1000,
  });
};

export const useHasRole = (role: AppRole) => {
  const { data: roles, isLoading } = useUserRoles();
  return { hasRole: roles?.includes(role) ?? false, isLoading };
};
