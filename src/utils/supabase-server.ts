import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/supabase";
// 型生成ツールで生成した Database 型を使用する場合は下記の import を有効にしてください。
// import { Database } from "@/types/supabase";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createSupabaseServer() {
  const cookieStore = cookies();
  // `any` を Database 型に置き換えることで型安全になります。
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
} 