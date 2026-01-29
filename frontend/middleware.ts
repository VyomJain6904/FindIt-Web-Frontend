import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { applySecurityHeaders } from './src/security/headers';

// Protected routes that require authentication
const protectedRoutes = ['/dashboard'];

// Auth routes (redirect if already authenticated)
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Create response
  const response = NextResponse.next();

  // Apply security headers
  applySecurityHeaders(response.headers);

  // Check for authenticated user (placeholder - replace with actual auth check)
  const isAuthenticated = request.cookies.get('auth_token')?.value;

  // Redirect to login if accessing protected route without auth
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!isAuthenticated) {
      // For now, allow access without auth for development
      // Uncomment below for production auth enforcement:
      // const loginUrl = new URL('/login', request.url);
      // loginUrl.searchParams.set('redirect', pathname);
      // return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect to dashboard if accessing auth routes while authenticated
  if (authRoutes.some(route => pathname.startsWith(route))) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};
