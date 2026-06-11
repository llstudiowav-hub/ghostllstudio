import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface AdminSessionState {
  loading: boolean;
  userId: string | null;
  email: string | null;
  isAdmin: boolean;
}

export function useAdminSession(): AdminSessionState {
  const [state, setState] = useState<AdminSessionState>({ loading: true, userId: null, email: null, isAdmin: false });

  useEffect(() => {
    let cancelled = false;

    const check = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        if (!cancelled) setState({ loading: false, userId: null, email: null, isAdmin: false });
        return;
      }
      const { data: roles } = await supabase.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
      if (!cancelled) {
        setState({ loading: false, userId: user.id, email: user.email ?? null, isAdmin: (roles?.length ?? 0) > 0 });
      }
    };

    check();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") check();
    });
    return () => { cancelled = true; sub.subscription.unsubscribe(); };
  }, []);

  return state;
}
