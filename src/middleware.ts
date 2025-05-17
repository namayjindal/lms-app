import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Only protect /professor/* and /student/* routes
  if (pathname.startsWith('/professor') || pathname.startsWith('/student')) {
    if (!token || !JWT_SECRET) {
      return NextResponse.redirect(new URL('/login', req.url));
    }
    try {
      const user = jwt.verify(token, JWT_SECRET) as any;
      if (pathname.startsWith('/professor') && user.role !== 'professor') {
        return NextResponse.redirect(new URL('/student/dashboard', req.url));
      }
      if (pathname.startsWith('/student') && user.role !== 'student') {
        return NextResponse.redirect(new URL('/professor/dashboard', req.url));
      }
    } catch {
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/professor/:path*', '/student/:path*'],
}; 