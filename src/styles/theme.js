// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { colors } from './variables';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,           // Cor principal (botões, links, destaques)
      dark: '#4338ca',                // Tom mais escuro para estados ativos
      light: '#818cf8',               // Tom claro para hover ou bordas
      contrastText: '#ffffff',        // Cor do texto sobre o botão primário
    },
    secondary: {
      main: colors.secondary,         // Cor secundária complementar
      dark: '#059669',
      light: '#6ee7b7',
      contrastText: '#ffffff',
    },
    background: {
      default: colors.backgroundDefault, // Fundo principal da aplicação
      paper: colors.backgroundPaper,     // Fundo de superfícies como cards/modais
    },
    text: {
      primary: colors.textPrimary,    // Cor principal de texto
      secondary: colors.textSecondary,// Cor de descrições e textos menores
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1',                // Índigo suavizado para destaque em dark
      dark: '#4f46e5',                // Versão escura do primário
      light: '#a5b4fc',               // Hover ou leve destaque
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#007a52',                // Teal escuro para ações secundárias
      dark: '#065f46',
      light: '#34d399',
      contrastText: '#ffffff',
    },
    background: {
      default: '#1f2937',             // Fundo geral escuro
      paper: '#27303f',               // Superfícies como cards/modais escuros
    },
    text: {
      primary: '#f9fafb',             // Texto principal claro
      secondary: '#9ca3af',           // Texto secundário desabilitado
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d0d0d', // AppBar customizado para dark mode
        },
      },
    },
  },
});