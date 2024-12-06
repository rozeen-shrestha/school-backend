import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const routes = {
  admin: ['/admin/:path*', '/admin'],
  user: ['/elibrary/:path*', '/elibrary'],
  open: ['/login'],
};

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  if (routes.admin.some(route => pathname.match(new RegExp(`^${route.replace(':path*', '.*')}$`)))) {
    if (token?.role === 'admin') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (routes.user.some(route => pathname.match(new RegExp(`^${route.replace(':path*', '.*')}$`)))) {
    if (token?.role === 'user') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (routes.open.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/elibrary/:path*', '/login'], // Apply middleware to relevant routes
};
