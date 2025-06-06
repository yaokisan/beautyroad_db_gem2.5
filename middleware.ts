import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  // 保護対象: /dashboard と /project/ 以下
  const protectedPath = pathname.startsWith('/dashboard') || pathname.startsWith('/project')
  const isLoginPath = pathname.startsWith('/login')

  if (protectedPath && !isLoginPath) {
    const isAuth = req.cookies.get('admin_auth')?.value === '1'
    if (!isAuth) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/login'
      loginUrl.searchParams.set('from', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/project/:path*']
} 