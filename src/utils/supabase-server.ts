import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
// 型生成ツールで生成した Database 型を使用する場合は下記の import を有効にしてください。
// import { Database } from "@/types/supabase";

export function createSupabaseServer() {
  const cookieStore = cookies()

  return createServerComponentClient<Database>({
    cookies: () => cookieStore,
  })
} 