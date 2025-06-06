import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
// 型生成ツールで生成した Database 型を使用する場合は下記の import を有効にしてください。
// import { Database } from "@/types/supabase";

// 汎用的に any を使用していますが、Database 型を用意すると型安全になります。
export const supabase = createBrowserSupabaseClient<any>(); 