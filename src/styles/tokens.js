/**
 * Design Tokens - ES Database V2
 *
 * Centralized design system tokens for consistent styling across the application.
 * Import these tokens in styled components and theme configurations.
 */

// ===================
// Color Palette
// ===================

export const palette = {
  // Primary colors
  primary: {
    main: '#4f46e5',
    light: '#818cf8',
    dark: '#4338ca',
    contrast: '#ffffff',
  },

  // Secondary colors
  secondary: {
    main: '#00c482',
    light: '#6ee7b7',
    dark: '#059669',
    contrast: '#ffffff',
  },

  // Neutral colors
  neutral: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  // Semantic colors
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    main: '#f97316',
    light: '#fb923c',
    dark: '#ea580c',
  },
  error: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
};

// ===================
// Light Theme Colors
// ===================

export const lightColors = {
  primary: palette.primary.main,
  primaryDark: palette.primary.dark,
  primaryLight: palette.primary.light,
  primaryContrast: palette.primary.contrast,

  secondary: palette.secondary.main,
  secondaryDark: palette.secondary.dark,
  secondaryLight: palette.secondary.light,
  secondaryContrast: palette.secondary.contrast,

  background: {
    default: palette.neutral[50],
    paper: '#ffffff',
    muted: palette.neutral[100],
    accent: '#eef2ff',
  },

  text: {
    primary: palette.neutral[700],
    secondary: palette.neutral[500],
    disabled: palette.neutral[400],
    heading: palette.neutral[900],
  },

  border: {
    default: palette.neutral[200],
    light: palette.neutral[100],
    dark: palette.neutral[300],
  },

  action: {
    hover: 'rgba(0, 0, 0, 0.04)',
    selected: 'rgba(0, 0, 0, 0.08)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },

  ...palette.success && { success: palette.success.main },
  ...palette.warning && { warning: palette.warning.main },
  ...palette.error && { error: palette.error.main },
  ...palette.info && { info: palette.info.main },

  shadow: 'rgba(0, 0, 0, 0.1)',
  overlay: 'rgba(0, 0, 0, 0.3)',
  link: '#2563eb',
};

// ===================
// Dark Theme Colors
// ===================

export const darkColors = {
  primary: '#6366f1',
  primaryDark: '#4f46e5',
  primaryLight: '#a5b4fc',
  primaryContrast: '#ffffff',

  secondary: '#007a52',
  secondaryDark: '#065f46',
  secondaryLight: '#34d399',
  secondaryContrast: '#ffffff',

  background: {
    default: palette.neutral[800],
    paper: '#27303f',
    muted: '#2b3441',
    accent: '#2a2e3a',
  },

  text: {
    primary: '#f9fafb',
    secondary: '#9ca3af',
    disabled: palette.neutral[500],
    heading: '#ffffff',
  },

  border: {
    default: palette.neutral[600],
    light: palette.neutral[700],
    dark: palette.neutral[500],
  },

  action: {
    hover: 'rgba(255, 255, 255, 0.08)',
    selected: 'rgba(255, 255, 255, 0.16)',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },

  success: palette.success.main,
  warning: palette.warning.main,
  error: palette.error.light,
  info: palette.info.main,

  shadow: 'rgba(0, 0, 0, 0.5)',
  overlay: 'rgba(0, 0, 0, 0.6)',
  link: '#60a5fa',
};

// ===================
// Typography
// ===================

export const typography = {
  fontFamily: {
    primary: '"Roboto", "Helvetica", "Arial", sans-serif',
    mono: '"Roboto Mono", "Consolas", monospace',
  },

  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  fontSize: {
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem', // 36px
  },

  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// ===================
// Spacing
// ===================

export const spacing = {
  0: '0',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  16: '4rem', // 64px
  20: '5rem', // 80px
};

// ===================
// Breakpoints
// ===================

export const breakpoints = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// ===================
// Shadows
// ===================

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  card: '0 8px 25px rgba(0, 0, 0, 0.3)',
  cardHover: '0 12px 30px rgba(0, 0, 0, 0.4)',
};

// ===================
// Border Radius
// ===================

export const borderRadius = {
  none: '0',
  sm: '0.125rem', // 2px
  md: '0.375rem', // 6px
  lg: '0.5rem', // 8px
  xl: '0.75rem', // 12px
  '2xl': '1rem', // 16px
  full: '9999px',
};

// ===================
// Transitions
// ===================

export const transitions = {
  fast: '150ms ease',
  normal: '200ms ease',
  slow: '300ms ease',
  spring: '300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
};

// ===================
// Z-Index
// ===================

export const zIndex = {
  dropdown: 1000,
  sticky: 1020,
  fixed: 1030,
  modalBackdrop: 1040,
  modal: 1050,
  popover: 1060,
  tooltip: 1070,
};

// ===================
// Layout
// ===================

export const layout = {
  appBar: {
    heightDesktop: 64,
    heightMobile: 56,
  },
  drawer: {
    width: 350,
    widthMobile: '100vw',
  },
  maxContentWidth: 1200,
};

// ===================
// Utility: Get color by mode
// ===================

export const getColors = (isDarkMode) => (isDarkMode ? darkColors : lightColors);

// Legacy support - keeping old variable names for backward compatibility
export const colors = lightColors;
