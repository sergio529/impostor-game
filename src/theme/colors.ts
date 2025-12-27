export const colors = {
  // Backgrounds
  background: '#0a0a0f',
  surface: '#12121a',
  surfaceLight: '#1a1a24',
  surfaceLighter: '#222230',

  // Primary - Terminal Green
  primary: '#00ff88',
  primaryDim: '#00cc6a',
  primaryDark: '#009950',
  primaryGlow: 'rgba(0, 255, 136, 0.15)',
  primaryGlowStrong: 'rgba(0, 255, 136, 0.3)',

  // Danger - Impostor Red
  danger: '#ff3366',
  dangerDim: '#cc2952',
  dangerDark: '#991f3d',
  dangerGlow: 'rgba(255, 51, 102, 0.15)',
  dangerGlowStrong: 'rgba(255, 51, 102, 0.3)',

  // Warning - Amber
  warning: '#ffaa00',
  warningDim: '#cc8800',
  warningGlow: 'rgba(255, 170, 0, 0.15)',

  // Info - Cyan
  info: '#00aaff',
  infoDim: '#0088cc',
  infoGlow: 'rgba(0, 170, 255, 0.15)',

  // Text
  text: '#e0e0e0',
  textSecondary: '#888888',
  textMuted: '#555555',
  textInverse: '#0a0a0f',

  // Borders
  border: '#2a2a35',
  borderLight: '#3a3a45',
  borderFocus: '#4a4a55',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.7)',
  overlayLight: 'rgba(0, 0, 0, 0.5)',

  // Transparent
  transparent: 'transparent',
} as const;

export type Colors = typeof colors;
export type ColorKey = keyof Colors;