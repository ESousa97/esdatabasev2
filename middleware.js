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

  // Se precisar de lógica futura para autenticação ou permissões, adicione aqui

  return NextResponse.next(); // Deixa o Next.js seguir e tratar 404 normalmente
}

// Aplica a todas as rotas
export const config = {
  matcher: '/:path*',
};
