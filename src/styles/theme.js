// src/styles/theme.js
import { createTheme } from '@mui/material/styles';
import {
  lightColors,
  darkColors,
  typography,
  borderRadius,
  layout,
} from './tokens';

/**
 * Light Theme Configuration
 */
export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: lightColors.primary,
      dark: lightColors.primaryDark,
      light: lightColors.primaryLight,
      contrastText: lightColors.primaryContrast,
    },
    secondary: {
      main: lightColors.secondary,
      dark: lightColors.secondaryDark,
      light: lightColors.secondaryLight,
      contrastText: lightColors.secondaryContrast,
    },
    background: {
      default: lightColors.background.default,
      paper: lightColors.background.paper,
    },
    text: {
      primary: lightColors.text.primary,
      secondary: lightColors.text.secondary,
    },
    error: {
      main: lightColors.error,
    },
    warning: {
      main: lightColors.warning,
    },
    info: {
      main: lightColors.info,
    },
    success: {
      main: lightColors.success,
    },
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
  },
  shape: {
    borderRadius: parseInt(borderRadius.lg) * 16 || 8,
  },
});

/**
 * Dark Theme Configuration
 */
export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: darkColors.primary,
      dark: darkColors.primaryDark,
      light: darkColors.primaryLight,
      contrastText: darkColors.primaryContrast,
    },
    secondary: {
      main: darkColors.secondary,
      dark: darkColors.secondaryDark,
      light: darkColors.secondaryLight,
      contrastText: darkColors.secondaryContrast,
    },
    background: {
      default: darkColors.background.default,
      paper: darkColors.background.paper,
    },
    text: {
      primary: darkColors.text.primary,
      secondary: darkColors.text.secondary,
    },
    error: {
      main: darkColors.error,
    },
    warning: {
      main: darkColors.warning,
    },
    info: {
      main: darkColors.info,
    },
    success: {
      main: darkColors.success,
    },
  },
  typography: {
    fontFamily: typography.fontFamily.primary,
  },
  shape: {
    borderRadius: parseInt(borderRadius.lg) * 16 || 8,
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#0d0d0d',
        },
      },
    },
  },
});

// Export layout constants for components
export const LAYOUT = layout;