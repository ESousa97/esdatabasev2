// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Se for uma rota interna do Next (/_next/...), não redirecione!
  // Também pode ignorar rotas de arquivos estáticos, favicon etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/assets') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|txt|map)$/)
  ) {
    return NextResponse.next();
  }

  // Agora definimos as rotas "públicas" que você quer permitir
  // (ou seja, não redirecionar)
  const allowedPaths = ['/', '/login', '/components', '/procedimentos', '/api'];
  
  // Verifica se o pathname é igual ou começa com uma das rotas permitidas
  const isAllowed = allowedPaths.some((path) =>
    pathname === path || pathname.startsWith(`${path}/`)
  );

  // Se não estiver entre as rotas permitidas, redireciona para /components
  if (!isAllowed) {
    const url = request.nextUrl.clone();
    url.pathname = '/components';
    return NextResponse.redirect(url);
  }

  // Se estiver permitido, segue a requisição normalmente
  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
