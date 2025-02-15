import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

const routes = {
  admin: ['/admin/:path*', '/admin'],
  user: ['/elibrary/:path*', '/elibrary'],
  adminLogin: ['/login/admin'],
  userLogin: ['/login/user'],
};

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Redirect to /admin if admin is logged in and tries to access /login/admin
  if (routes.adminLogin.some(route => pathname.startsWith(route))) {
    if (token?.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  // Redirect to /elibrary/dashboard if user is logged in and tries to access /login/user
  if (routes.userLogin.some(route => pathname.startsWith(route))) {
    if (token?.role === 'user') {
      return NextResponse.redirect(new URL('/elibrary/dashboard', req.url));
    }
    return NextResponse.next();
  }

  // Protect admin routes
  if (routes.admin.some(route => pathname.match(new RegExp(`^${route.replace(':path*', '.*')}$`)))) {
    if (token?.role === 'admin') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login/admin', req.url));
  }

  // Protect user routes
  if (routes.user.some(route => pathname.match(new RegExp(`^${route.replace(':path*', '.*')}$`)))) {
    if (token?.role === 'user') {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL('/login/user', req.url));
  }

  // Default behavior: allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/elibrary/:path*', '/login/admin', '/login/user'],
};
