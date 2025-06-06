"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase-browser";

interface Props {
  children: React.ReactNode;
  initialSession: Session | null;
}

export function SupabaseProvider({ children, initialSession }: Props) {
  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={initialSession}>
      {children}
    </SessionContextProvider>
  );
} 