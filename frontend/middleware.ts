// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const protectedRoutes = ['/account']
  const isProtected = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

  if (isProtected && !user) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return res
}

export const config = {
  matcher: ['/account'],
}
