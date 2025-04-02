// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { colors } from './variables';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,      // Por exemplo, "#283593"
      dark: '#1A237E',
      light: '#5C6BC0',
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.secondary,
      dark: '#D32F2F',
      light: '#FFCDD2',
      contrastText: '#ffffff',
    },
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
    text: {
      primary: colors.textPrimary,
      secondary: colors.textSecondary,
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
      main: '#456681',
      dark: '#42a5f5',
      light: '#e3f2fd',
      contrastText: '#000000',
    },
    secondary: {
      main: colors.secondary,
      dark: '#d32f2f',
      light: '#ef9a9a',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
  components: {
    // Sobrescreve o estilo do AppBar apenas no modo escuro
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d0d0d', // Cor personalizada para o AppBar no modo escuro
        },
      },
    },
  },
});
