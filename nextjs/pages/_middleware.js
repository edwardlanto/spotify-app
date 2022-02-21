import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  // Token will exist if user is logged in
  const token = await getToken({ req, secret: process.env.JWT_SECRET })
  const { pathname } = req.nextUrl
  const url = req.nextUrl;

  if (token && pathname.includes('/login')) {
    return NextResponse.redirect(new URL('/', url.origin));
  }

  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next()
  }

  if(!token && pathname !== '/login'){
    return NextResponse.redirect(new URL('/login', url.origin));
}

}

