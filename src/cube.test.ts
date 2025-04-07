import { RubiksCube } from './cube'
import { Color } from './colors'

describe('RubiksCube', () => {
  let cube: RubiksCube

  beforeEach(() => {
    cube = new RubiksCube()
  })

  describe('Initial State', () => {
    it('should initialize with correct colors on each face', () => {
      expect(
        cube.faces.topFace.every((row) =>
          row.every((cell) => cell === Color.White)
        )
      ).toBe(true)
      expect(
        cube.faces.frontFace.every((row) =>
          row.every((cell) => cell === Color.Green)
        )
      ).toBe(true)
      expect(
        cube.faces.rightFace.every((row) =>
          row.every((cell) => cell === Color.Red)
        )
      ).toBe(true)
      expect(
        cube.faces.backFace.every((row) =>
          row.every((cell) => cell === Color.Blue)
        )
      ).toBe(true)
      expect(
        cube.faces.leftFace.every((row) =>
          row.every((cell) => cell === Color.Orange)
        )
      ).toBe(true)
      expect(
        cube.faces.bottomFace.every((row) =>
          row.every((cell) => cell === Color.Yellow)
        )
      ).toBe(true)
    })
  })

  describe('Basic Moves', () => {
    describe('Front Face', () => {
      it('should correctly perform frontFaceClockwise', () => {
        cube.frontFaceClockwise()
        // Check front face rotation
        expect(cube.faces.frontFace[0][0]).toBe(Color.Green)
        // Check affected edges
        expect(cube.faces.topFace[2]).toEqual([
          Color.Orange,
          Color.Orange,
          Color.Orange,
        ])
        expect(cube.faces.rightFace[0][0]).toBe(Color.White)
        expect(cube.faces.rightFace[1][0]).toBe(Color.White)
        expect(cube.faces.rightFace[2][0]).toBe(Color.White)
      })

      it('should correctly perform frontFaceCounterClockwise', () => {
        cube.frontFaceCounterClockwise()
        // Check front face rotation
        expect(cube.faces.frontFace[0][0]).toBe(Color.Green)
        // Check affected edges
        expect(cube.faces.topFace[2]).toEqual([Color.Red, Color.Red, Color.Red])
        expect(cube.faces.leftFace[0][2]).toBe(Color.White)
        expect(cube.faces.leftFace[1][2]).toBe(Color.White)
        expect(cube.faces.leftFace[2][2]).toBe(Color.White)
      })
    })

    describe('Move Sequence', () => {
      const expectedState = {
        topFace: [
          [Color.Red, Color.Orange, Color.Green],
          [Color.Blue, Color.White, Color.White],
          [Color.Blue, Color.Blue, Color.Blue],
        ],
        leftFace: [
          [Color.Green, Color.Yellow, Color.Yellow],
          [Color.Orange, Color.Orange, Color.Green],
          [Color.Blue, Color.Green, Color.Orange],
        ],
        frontFace: [
          [Color.Orange, Color.Red, Color.Red],
          [Color.Orange, Color.Green, Color.White],
          [Color.White, Color.White, Color.White],
        ],
        rightFace: [
          [Color.Yellow, Color.Blue, Color.Orange],
          [Color.Red, Color.Red, Color.White],
          [Color.Orange, Color.Yellow, Color.Red],
        ],
        backFace: [
          [Color.Yellow, Color.Blue, Color.White],
          [Color.Orange, Color.Blue, Color.Yellow],
          [Color.Yellow, Color.Yellow, Color.White],
        ],
        bottomFace: [
          [Color.Green, Color.Green, Color.Blue],
          [Color.Red, Color.Yellow, Color.Red],
          [Color.Red, Color.Green, Color.Green],
        ],
      }

      it("should correctly execute the sequence F R' U B' L D'", () => {
        const moves: Array<[string, () => void]> = [
          ['F', () => cube.frontFaceClockwise()],
          ["R'", () => cube.rightFaceCounterClockwise()],
          ['U', () => cube.topFaceClockwise()],
          ["B'", () => cube.backFaceCounterClockwise()],
          ['L', () => cube.leftFaceClockwise()],
          ["D'", () => cube.bottomFaceCounterClockwise()],
        ]

        moves.forEach(([move, fn]) => {
          fn()
          expect(cube.faces).toBeDefined()
        })

        // Verify final state matches expected state
        Object.entries(expectedState).forEach(([face, expectedColors]) => {
          expect(cube.faces[face as keyof typeof cube.faces]).toEqual(
            expectedColors
          )
        })
      })
    })
  })

  describe('Reset', () => {
    it('should restore the cube to its initial solved state', () => {
      // Apply some moves
      cube.frontFaceClockwise()
      cube.rightFaceCounterClockwise()
      cube.topFaceClockwise()

      // Reset
      cube.reset()

      // Verify all faces are reset to their original colors
      expect(
        cube.faces.topFace.every((row) =>
          row.every((cell) => cell === Color.White)
        )
      ).toBe(true)
      expect(
        cube.faces.frontFace.every((row) =>
          row.every((cell) => cell === Color.Green)
        )
      ).toBe(true)
      expect(
        cube.faces.rightFace.every((row) =>
          row.every((cell) => cell === Color.Red)
        )
      ).toBe(true)
      expect(
        cube.faces.backFace.every((row) =>
          row.every((cell) => cell === Color.Blue)
        )
      ).toBe(true)
      expect(
        cube.faces.leftFace.every((row) =>
          row.every((cell) => cell === Color.Orange)
        )
      ).toBe(true)
      expect(
        cube.faces.bottomFace.every((row) =>
          row.every((cell) => cell === Color.Yellow)
        )
      ).toBe(true)
    })
  })
})
