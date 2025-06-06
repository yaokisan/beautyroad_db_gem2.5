import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// 型生成ツールで生成した Database 型を使用する場合は下記の import を有効にしてください。
// import { Database } from "@/types/supabase";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function createSupabaseServer() {
  const cookieStore = cookies();
  // `any` を Database 型に置き換えることで型安全になります。
  return createServerComponentClient<any>({
    cookies: () => cookieStore,
  });
} 