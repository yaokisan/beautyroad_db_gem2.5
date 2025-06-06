import { createBrowserClient } from "@supabase/ssr";

import { Database } from "../supabase";

// 汎用的に any を使用していますが、Database 型を用意すると型安全になります。
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
); 