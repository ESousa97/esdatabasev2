// src/styles/variables.js

export const colors = {
  /* === Cores principais (tema claro) === */
  primary: '#4f46e5',              // Cor primária (botões, links, destaques)
  secondary: '#00c482',            // Cor secundária complementar (ações especiais)
  backgroundDefault: '#f8fafc',    // Fundo geral da aplicação (bem claro)
  backgroundPaper: '#ffffff',      // Superfície para cards, modais, painéis
  textPrimary: '#374151',          // Texto principal em cinza escuro moderno
  textSecondary: '#6b7280',        // Texto auxiliar, descrições, legendas
  border: '#e5e7eb',               // Cor padrão para bordas discretas
  border2: '#d7d9dd',              // Cor de borda secundária (menos destaque)
  inputBackground: '#ffffff',      // Fundo de inputs e áreas editáveis
  shadow: 'rgba(0, 0, 0, 0.1)',    // Sombra leve usada em caixas/modais

  /* === Cores de status e feedback === */
  success: '#34d399',              // Verde para feedback de sucesso (ex: uploads)
  warning: '#f97316',              // Laranja para alertas de atenção
  error: '#ef4444',                // Vermelho forte para erros e falhas
  alert: '#fbbf24',                // Amarelo vibrante para alertas informativos
  info: '#3b82f6',                 // Azul vibrante para mensagens informativas
  disabled: '#9ca3af',             // Cor para inputs/botões desabilitados

  /* === Extras visuais === */
  mutedBackground: '#f1f5f9',      // Fundo levemente destacado (hover, cartões suaves)
  accentBackground: '#eef2ff',     // Fundo com leve tom azulado (blocos de destaque)
  heading: '#111827',              // Cor para títulos principais com alto contraste
  link: '#2563eb',                 // Azul tradicional para links clicáveis
  progressBg: '#e5e7eb',           // Fundo da barra de progresso (neutro)
  overlay: 'rgba(0, 0, 0, 0.3)',   // Sombra escura para sobreposição/modais
};

export const darkColors = {
  /* === Cores principais (tema escuro) === */
  primary: '#6366f1',              // Índigo suavizado para destaque em dark
  secondary: '#007a52',            // Teal escuro com bom contraste
  backgroundDefault: '#1f2937',    // Fundo principal escuro
  backgroundPaper: '#27303f',      // Superfície para cartões/modais em dark
  textPrimary: '#f9fafb',          // Texto quase branco para legibilidade
  textSecondary: '#484a4e',        // Texto auxiliar ainda legível
  border: '#374151',               // Borda visível mas discreta
  border2: '#2d3744',              // Borda secundária (menos visível)
  inputBackground: '#374151',      // Fundo de campos/input no dark
  shadow: 'rgba(0, 0, 0, 0.5)',    // Sombra mais intensa para destaque em dark

  /* === Cores de status e feedback === */
  success: '#10b981',              // Verde mais escuro para sucesso
  warning: '#f97316',              // Laranja mantém vibração no escuro
  error: '#f87171',                // Vermelho levemente suavizado para não agredir
  alert: '#fbbf24',                // Amarelo vibrante para alertas
  info: '#3b82f6',                 // Azul claro para informações
  disabled: '#6b7280',             // Texto desabilitado em dark

  /* === Extras visuais === */
  mutedBackground: '#2b3441',      // Fundo com leve contraste, ideal para hover em dark
  accentBackground: '#2a2e3a',     // Fundo de destaque em dark (cards, blocos)
  heading: '#ffffff',              // Títulos bem visíveis no escuro
  link: '#60a5fa',                 // Azul claro para links clicáveis
  progressBg: '#475569',           // Fundo neutro para barra de progresso
  overlay: 'rgba(0, 0, 0, 0.6)',   // Sombra intensa para modais em dark
};
