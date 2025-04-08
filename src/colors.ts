/**
 * The classic Rubik's cube colors! 🎨
 */
export enum Color {
  White = 'W',
  Orange = 'O',
  Green = 'G',
  Red = 'R',
  Blue = 'B',
  Yellow = 'Y',
}

/**
 * A face is a 3x3 grid of colors
 */
export type Face = Color[][]

// Helper to check if something is a valid color
export function isValidColor(color: string): color is Color {
  return Object.values(Color).includes(color as Color)
}
