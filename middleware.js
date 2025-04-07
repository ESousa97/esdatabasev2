// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Ignora rotas internas do Next/arquivos estáticos etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|txt|map)$/)
  ) {
    return NextResponse.next();
  }

  // Aqui não tem '/', note que deixamos /login, /components, /procedimentos, /api:
  const allowedPaths = ['/login', '/components', '/procedimentos', '/api'];

  // Verifica se o pathname é igual ou começa com as rotas liberadas
  const isAllowed = allowedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Se não estiver nas liberadas, redireciona para /components
  if (!isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = '/components';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Aplica a todas as rotas
export const config = {
  matcher: '/:path*',
};
