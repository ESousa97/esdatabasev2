// src/styles/theme.js

/**
 * Configurações comuns de tema.
 * Contém definições compartilhadas entre os temas claro e escuro,
 * como tipografia e formato dos componentes.
 */
const baseThemeOptions = {
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    // Outras variantes tipográficas podem ser adicionadas aqui.
  },
  shape: {
    borderRadius: 8,
  },
};

/**
 * Tema claro
 *
 * Define as cores e estilos para o modo claro.
 */
const lightTheme = {
  ...baseThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
};

/**
 * Tema escuro
 *
 * Define as cores e estilos para o modo escuro, com ênfase em fundos e textos adequados.
 */
const darkTheme = {
  ...baseThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: '#283593',
    },
    secondary: {
      main: '#f44336',
    },
    background: {
      default: '#121212', // Fundo geral para o modo escuro
      paper: '#1d1d1d',   // Fundo para cards, diálogos etc.
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
};

export { lightTheme, darkTheme };
