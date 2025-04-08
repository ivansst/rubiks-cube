import { RubiksCube } from './cube'
import { Color } from './colors'

// Time to put our cube through its paces! 🧊
describe('RubiksCube', () => {
  let cube: RubiksCube

  // Fresh cube for each test
  beforeEach(() => {
    cube = new RubiksCube()
  })

  // Make sure we start with a perfect cube
  it('starts with all faces the right color', () => {
    expect(cube.faces.up.flat()).toEqual(Array(9).fill(Color.White))
    expect(cube.faces.front.flat()).toEqual(Array(9).fill(Color.Green))
    expect(cube.faces.right.flat()).toEqual(Array(9).fill(Color.Red))
    expect(cube.faces.back.flat()).toEqual(Array(9).fill(Color.Blue))
    expect(cube.faces.left.flat()).toEqual(Array(9).fill(Color.Orange))
    expect(cube.faces.down.flat()).toEqual(Array(9).fill(Color.Yellow))
  })

  // Let's try some basic moves
  describe('basic moves', () => {
    it('spins the front face clockwise', () => {
      cube.turnFront()
      // Check a few key spots
      expect(cube.faces.up[2]).toEqual([
        Color.Orange,
        Color.Orange,
        Color.Orange,
      ])
      expect(cube.faces.right[0][0]).toEqual(Color.White)
      expect(cube.faces.right[1][0]).toEqual(Color.White)
      expect(cube.faces.right[2][0]).toEqual(Color.White)
    })

    it('spins the right face clockwise', () => {
      cube.turnRight()
      // Should see white on the back face
      expect(cube.faces.back[0][0]).toEqual(Color.White)
      expect(cube.faces.back[1][0]).toEqual(Color.White)
      expect(cube.faces.back[2][0]).toEqual(Color.White)
    })

    it('spins the top face clockwise', () => {
      cube.spinUp()
      // Front face should now show red
      expect(cube.faces.front[0]).toEqual([Color.Red, Color.Red, Color.Red])
    })
  })

  // Now for some fancy sequences
  describe('move sequences', () => {
    it("handles the sexy move (R U R' U')", () => {
      const moves = ['R', 'U', "R'", "U'"]
      moves.forEach((move) => cube.applyMoves(move))

      // Check if the pattern looks right
      expect(cube.faces.front[0][2]).toEqual(Color.White)
      expect(cube.faces.right[0][0]).toEqual(Color.Green)
    })

    it('can solve a simple pattern', () => {
      // Mess it up a bit
      const scramble = ['F', 'R', 'U']
      scramble.forEach((move) => cube.applyMoves(move))

      // Fix it
      const solution = ["U'", "R'", "F'"]
      solution.forEach((move) => cube.applyMoves(move))

      // Should be back to normal!
      expect(cube.faces.up.flat()).toEqual(Array(9).fill(Color.White))
      expect(cube.faces.front.flat()).toEqual(Array(9).fill(Color.Green))
    })
  })

  // Edge cases and error handling
  describe('error handling', () => {
    it('ignores bogus moves', () => {
      const originalState = JSON.stringify(cube.faces)
      cube.applyMoves('X') // Not a real move!
      expect(JSON.stringify(cube.faces)).toBe(originalState)
    })

    it('can handle empty moves', () => {
      expect(() => cube.applyMoves('')).not.toThrow()
    })
  })
})
