/**
 * Design Tokens - Spotify-inspired dark theme
 * Centralized design system for consistency across the application
 */

export const colors = {
  // Warm sand backgrounds (hrisa.tech style)
  background: {
    primary: '#faf8f5',    // sand-50 - main background
    elevated: '#f5f1ea',   // sand-100 - cards, modals
    surface: '#ede7dc',    // sand-200 - secondary surfaces
    card: '#e6dfd1',       // sand-300 - content cards
    subtle: '#d4c8b8',     // sand-400 - borders
  },

  // Terracotta red and teal brand colors
  accent: {
    primary: '#d97757',    // terracotta-500 - primary actions
    secondary: '#0d9488',  // teal-600 - secondary actions
    danger: '#dc2626',     // red-600 - destructive actions
  },

  // Dark charcoal text on warm backgrounds
  text: {
    primary: '#1c1917',    // sand-950 - primary text
    secondary: '#57534e',  // sand-700 - secondary text
    tertiary: '#78716c',   // sand-600 - tertiary text
    disabled: '#a8a29e',   // sand-500 - disabled state
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  base: '16px',
  lg: '20px',
  xl: '24px',
  xxl: '32px',
} as const;

export const borderRadius = {
  sm: '6px',
  md: '12px',
  lg: '16px',
  pill: '20px',
  full: '9999px',
} as const;

export const fontSize = {
  h1: '32px',
  h2: '28px',
  h3: '22px',
  h4: '20px',
  body: '16px',
  bodySmall: '14px',
  caption: '12px',
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;
