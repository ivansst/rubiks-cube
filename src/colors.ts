/**
 * Represents the possible colors on a Rubik's Cube face using single letters.
 */
export enum Color {
  White = 'W',
  Yellow = 'Y',
  Green = 'G',
  Blue = 'B',
  Red = 'R',
  Orange = 'O',
}

/**
 * Represents a 3x3 face of the cube as a 2D array of colors.
 */
export type Face = Color[][]
