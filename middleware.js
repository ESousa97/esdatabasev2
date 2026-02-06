// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname, origin } = request.nextUrl;

  // Permitir acesso às rotas internas e estáticas
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|txt|map)$/)
  ) {
    return NextResponse.next();
  }

  // Permitir acesso à rota de login e fake-login
  if (pathname === '/login' || pathname.startsWith('/fake-login')) {
    return NextResponse.next();
  }

  // Permitir /components e páginas que foram clicadas dentro dele
  if (pathname === '/components' || pathname.startsWith('/procedimentos/')) {
    return NextResponse.next();
  }

  // Redireciona para /components se tentarem acessar qualquer outra rota
  return NextResponse.redirect(`${origin}/components`);
}

// Aplica a todas as rotas
export const config = {
  matcher: '/:path*',
};
