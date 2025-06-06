import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { createSupabaseServer } from '@/utils/supabase-server'
import type { Database } from '@/types/supabase'

export const dynamic = 'force-dynamic'

export default async function Dashboard() {
  const supabase = createSupabaseServer()
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('shoot_date', { ascending: true })

  async function createProject(formData: FormData) {
    'use server'
    const supabase = createSupabaseServer()
    const title = formData.get('title') as string
    const insert: Database['public']['Tables']['projects']['Insert'] = { title }
    await supabase.from('projects').insert(insert)
    revalidatePath('/dashboard')
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>

      <form action={createProject} className="flex gap-2">
        <input name="title" placeholder="New project title" className="border p-2 flex-grow" required />
        <button className="bg-black text-white px-4">Add</button>
      </form>

      {error && <p className="text-red-600">{error.message}</p>}

      <ul className="space-y-2">
        {projects?.map((p) => (
          <li key={p.id} className="border p-2 flex justify-between">
            <span>{p.title}</span>
            <Link href={`/project/${p.id}`} className="underline">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
} 