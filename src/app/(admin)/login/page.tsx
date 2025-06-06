import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export default function AdminLoginPage() {
  async function login(formData: FormData) {
    'use server'
    const password = formData.get('password') as string
    if (password === process.env.ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set('admin_auth', '1', { httpOnly: true, path: '/', maxAge: 60 * 60 * 24 * 7 })
      redirect('/admin/dashboard')
    }
    redirect('/admin/login?error=1')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form action={login} className="w-full max-w-sm bg-white p-6 rounded shadow flex flex-col gap-4">
        <h1 className="text-lg font-semibold text-center">Admin Login</h1>
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border rounded p-2"
          required
        />
        <button type="submit" className="bg-black text-white rounded p-2 hover:bg-gray-800">
          Login
        </button>
        {typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('error') && (
          <p className="text-red-600 text-sm text-center">Invalid password</p>
        )}
      </form>
    </div>
  )
} 