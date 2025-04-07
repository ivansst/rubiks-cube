import { Color, Face } from './colors'

export default function createFace(color: Color): Face {
  return [
    [color, color, color],
    [color, color, color],
    [color, color, color],
  ]
}
