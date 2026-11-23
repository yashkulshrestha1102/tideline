// Colours are final (dark theme) — these helpers are kept so the ripple
// effects keep a single place to read brand colours from.
export const THEME_EVENT = 'rd-theme-change';

export function themed(r: number, g: number, b: number): [number, number, number] {
  return [r, g, b];
}
