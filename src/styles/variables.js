// src/styles/variables.js
//
// This file is kept for backward compatibility.
// It re-exports the new design tokens from src/styles/tokens.js
//
// Prefer importing from src/styles/tokens.js in new code.

import { lightColors, darkColors, palette } from './tokens';

// Legacy names
export const colors = {
  primary: lightColors.primary,
  secondary: lightColors.secondary,
  backgroundDefault: lightColors.background.default,
  backgroundPaper: lightColors.background.paper,
  textPrimary: lightColors.text.primary,
  textSecondary: lightColors.text.secondary,
  border: lightColors.border.default,
  border2: lightColors.border.dark,
  inputBackground: lightColors.background.paper,
  shadow: lightColors.shadow,
  success: palette.success.main,
  warning: palette.warning.main,
  error: palette.error.main,
  alert: palette.warning.light,
  info: palette.info.main,
  disabled: lightColors.text.disabled,
  mutedBackground: lightColors.background.muted,
  accentBackground: lightColors.background.accent,
  heading: lightColors.text.heading,
  link: lightColors.link,
  progressBg: lightColors.border.default,
  overlay: lightColors.overlay,
};

export { darkColors };
