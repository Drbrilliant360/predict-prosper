import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useWallet = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["wallet", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
};

export const useProfile = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });
};

export const usePunditProfiles = () => {
  return useQuery({
    queryKey: ["pundit_profiles"],
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pundit_profiles")
        .select("*, profiles!pundit_profiles_user_id_profiles_fkey(display_name, avatar_url)")
        .order("roi", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useSlips = () => {
  return useQuery({
    queryKey: ["slips"],
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("slips")
        .select("*, profiles!slips_pundit_id_profiles_fkey(display_name)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useMyPurchases = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["purchases", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("purchases")
        .select("*, slips(*, profiles!slips_pundit_id_profiles_fkey(display_name))")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};

export const useFollowedPunters = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["followed_punters", user?.id],
    enabled: !!user,
    staleTime: 60_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("followers")
        .select("*, profiles!followers_pundit_id_profiles_fkey(display_name, avatar_url)")
        .eq("follower_id", user!.id);
      if (error) throw error;
      return data;
    },
  });
};

export const useTransactions = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["transactions", user?.id],
    enabled: !!user,
    staleTime: 30_000,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });
};
