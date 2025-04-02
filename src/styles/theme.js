// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import { colors } from './variables';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
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
  shape: {
    borderRadius: 8,
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.primary },
    secondary: { main: colors.secondary },
    background: {
      default: '#121212', // Fundo geral para o modo escuro
      paper: '#1d1d1d',   // Fundo para cards e dialogs
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
});
