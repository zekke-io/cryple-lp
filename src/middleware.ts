import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const locales = ['en', 'pt-br', 'es'];
export const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow these paths to bypass the middleware
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.endsWith('/opengraph-image') ||
    pathname.match(/\.(png|jpg|jpeg|svg|webp|ico)$/)
  ) {
    return;
  }

  // Prevent users from manually typing the default locale /en in the URL. Redirect them to the root.
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    const newPath = pathname.replace(/^\/en/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), 308);
  }

  // Check if there is a supported non-default locale in the pathname (like /pt-br or /es)
  const pathnameHasOtherLocale = locales
    .filter(locale => locale !== defaultLocale)
    .some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

  // If the URL already has a valid alternate locale, do nothing (let it render)
  if (pathnameHasOtherLocale) return;

  // Otherwise, it's the root path (`/`). Without redirecting the browser, we tell 
  // Next.js to mentally process this as `/en/...` so it renders our default english dictionary.
  const rewrittenUrl = new URL(`/${defaultLocale}${pathname}`, request.url);
  return NextResponse.rewrite(rewrittenUrl);
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)']
};
