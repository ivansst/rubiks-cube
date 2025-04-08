import { Color, Face } from './colors'
import createFace from './helpers'

export class RubiksCube {
  // Each face is a 3x3 grid of colors
  faces: {
    up: Face // White by default
    left: Face // Orange
    front: Face // Green
    right: Face // Red
    back: Face // Blue
    down: Face // Yellow
  } = RubiksCube.createSolvedCube()

  constructor() {}

  // Creates a fresh solved cube - all faces have their default colors
  static createSolvedCube() {
    return {
      up: createFace(Color.White),
      left: createFace(Color.Orange),
      front: createFace(Color.Green),
      right: createFace(Color.Red),
      back: createFace(Color.Blue),
      down: createFace(Color.Yellow),
    }
  }

  // Back to square one
  reset(): void {
    this.faces = RubiksCube.createSolvedCube()
  }

  // The magic that makes a face spin clockwise
  private spin(faceKey: keyof RubiksCube['faces']): void {
    const face = this.faces[faceKey]
    const N = 3
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        let temp = face[i][j]
        face[i][j] = face[N - 1 - j][i]
        face[N - 1 - j][i] = face[N - 1 - i][N - 1 - j]
        face[N - 1 - i][N - 1 - j] = face[j][N - 1 - i]
        face[j][N - 1 - i] = temp
      }
    }
  }

  // Same as spin but the other way around
  private spinBack(faceKey: keyof RubiksCube['faces']): void {
    // Do it three times clockwise - same as once counter-clockwise
    // (yeah, it's lazy but it works)
    this.spin(faceKey)
    this.spin(faceKey)
    this.spin(faceKey)
  }

  // Front face moves
  turnFront(): void {
    this.spin('front')
    const temp: Color[] = [
      this.faces.up[2][0],
      this.faces.up[2][1],
      this.faces.up[2][2],
    ]
    this.faces.up[2][0] = this.faces.left[2][2]
    this.faces.up[2][1] = this.faces.left[1][2]
    this.faces.up[2][2] = this.faces.left[0][2]

    this.faces.left[0][2] = this.faces.down[0][0]
    this.faces.left[1][2] = this.faces.down[0][1]
    this.faces.left[2][2] = this.faces.down[0][2]

    this.faces.down[0][0] = this.faces.right[2][0]
    this.faces.down[0][1] = this.faces.right[1][0]
    this.faces.down[0][2] = this.faces.right[0][0]

    this.faces.right[0][0] = temp[0]
    this.faces.right[1][0] = temp[1]
    this.faces.right[2][0] = temp[2]
  }

  turnFrontReverse(): void {
    this.spinBack('front')
    const temp: Color[] = [
      this.faces.up[2][0],
      this.faces.up[2][1],
      this.faces.up[2][2],
    ]
    this.faces.up[2][0] = this.faces.right[0][0]
    this.faces.up[2][1] = this.faces.right[1][0]
    this.faces.up[2][2] = this.faces.right[2][0]

    this.faces.right[0][0] = this.faces.down[0][2]
    this.faces.right[1][0] = this.faces.down[0][1]
    this.faces.right[2][0] = this.faces.down[0][0]

    this.faces.down[0][0] = this.faces.left[0][2]
    this.faces.down[0][1] = this.faces.left[1][2]
    this.faces.down[0][2] = this.faces.left[2][2]

    this.faces.left[0][2] = temp[2]
    this.faces.left[1][2] = temp[1]
    this.faces.left[2][2] = temp[0]
  }

  // Right face moves
  turnRight(): void {
    this.spin('right')
    const temp: Color[] = [
      this.faces.up[0][2],
      this.faces.up[1][2],
      this.faces.up[2][2],
    ]
    this.faces.up[0][2] = this.faces.front[0][2]
    this.faces.up[1][2] = this.faces.front[1][2]
    this.faces.up[2][2] = this.faces.front[2][2]

    this.faces.front[0][2] = this.faces.down[0][2]
    this.faces.front[1][2] = this.faces.down[1][2]
    this.faces.front[2][2] = this.faces.down[2][2]

    this.faces.down[0][2] = this.faces.back[2][0]
    this.faces.down[1][2] = this.faces.back[1][0]
    this.faces.down[2][2] = this.faces.back[0][0]

    this.faces.back[0][0] = temp[2]
    this.faces.back[1][0] = temp[1]
    this.faces.back[2][0] = temp[0]
  }

  turnRightReverse(): void {
    this.spinBack('right')
    const temp: Color[] = [
      this.faces.up[0][2],
      this.faces.up[1][2],
      this.faces.up[2][2],
    ]
    this.faces.up[0][2] = this.faces.back[2][0]
    this.faces.up[1][2] = this.faces.back[1][0]
    this.faces.up[2][2] = this.faces.back[0][0]

    this.faces.back[0][0] = this.faces.down[2][2]
    this.faces.back[1][0] = this.faces.down[1][2]
    this.faces.back[2][0] = this.faces.down[0][2]

    this.faces.down[0][2] = this.faces.front[0][2]
    this.faces.down[1][2] = this.faces.front[1][2]
    this.faces.down[2][2] = this.faces.front[2][2]

    this.faces.front[0][2] = temp[0]
    this.faces.front[1][2] = temp[1]
    this.faces.front[2][2] = temp[2]
  }

  // Top face moves
  spinUp(): void {
    this.spin('up')
    // For top spins we can just rotate entire rows - much simpler!
    const temp = this.faces.front[0].slice()
    this.faces.front[0] = this.faces.right[0].slice()
    this.faces.right[0] = this.faces.back[0].slice()
    this.faces.back[0] = this.faces.left[0].slice()
    this.faces.left[0] = temp
  }

  spinUpReverse(): void {
    this.spinBack('up')
    const temp = this.faces.front[0].slice()
    this.faces.front[0] = this.faces.left[0].slice()
    this.faces.left[0] = this.faces.back[0].slice()
    this.faces.back[0] = this.faces.right[0].slice()
    this.faces.right[0] = temp
  }

  // Back face moves
  turnBack(): void {
    this.spin('back')
    const temp = this.faces.up[0].slice()

    this.faces.up[0][0] = this.faces.right[0][2]
    this.faces.up[0][1] = this.faces.right[1][2]
    this.faces.up[0][2] = this.faces.right[2][2]

    this.faces.right[0][2] = this.faces.down[2][2]
    this.faces.right[1][2] = this.faces.down[2][1]
    this.faces.right[2][2] = this.faces.down[2][0]

    this.faces.down[2][0] = this.faces.left[2][0]
    this.faces.down[2][1] = this.faces.left[1][0]
    this.faces.down[2][2] = this.faces.left[0][0]

    this.faces.left[0][0] = temp[2]
    this.faces.left[1][0] = temp[1]
    this.faces.left[2][0] = temp[0]
  }

  turnBackReverse(): void {
    this.spinBack('back')
    const temp = this.faces.up[0].slice()

    this.faces.up[0][0] = this.faces.left[2][0]
    this.faces.up[0][1] = this.faces.left[1][0]
    this.faces.up[0][2] = this.faces.left[0][0]

    this.faces.left[0][0] = this.faces.down[2][0]
    this.faces.left[1][0] = this.faces.down[2][1]
    this.faces.left[2][0] = this.faces.down[2][2]

    this.faces.down[2][0] = this.faces.right[2][2]
    this.faces.down[2][1] = this.faces.right[1][2]
    this.faces.down[2][2] = this.faces.right[0][2]

    this.faces.right[0][2] = temp[0]
    this.faces.right[1][2] = temp[1]
    this.faces.right[2][2] = temp[2]
  }

  // Left face moves
  turnLeft(): void {
    this.spin('left')
    const temp: Color[] = [
      this.faces.up[0][0],
      this.faces.up[1][0],
      this.faces.up[2][0],
    ]
    this.faces.up[0][0] = this.faces.back[2][2]
    this.faces.up[1][0] = this.faces.back[1][2]
    this.faces.up[2][0] = this.faces.back[0][2]

    this.faces.back[0][2] = this.faces.down[2][0]
    this.faces.back[1][2] = this.faces.down[1][0]
    this.faces.back[2][2] = this.faces.down[0][0]

    this.faces.down[0][0] = this.faces.front[0][0]
    this.faces.down[1][0] = this.faces.front[1][0]
    this.faces.down[2][0] = this.faces.front[2][0]

    this.faces.front[0][0] = temp[0]
    this.faces.front[1][0] = temp[1]
    this.faces.front[2][0] = temp[2]
  }

  turnLeftReverse(): void {
    this.spinBack('left')
    const temp: Color[] = [
      this.faces.up[0][0],
      this.faces.up[1][0],
      this.faces.up[2][0],
    ]
    this.faces.up[0][0] = this.faces.front[0][0]
    this.faces.up[1][0] = this.faces.front[1][0]
    this.faces.up[2][0] = this.faces.front[2][0]

    this.faces.front[0][0] = this.faces.down[0][0]
    this.faces.front[1][0] = this.faces.down[1][0]
    this.faces.front[2][0] = this.faces.down[2][0]

    this.faces.down[0][0] = this.faces.back[2][2]
    this.faces.down[1][0] = this.faces.back[1][2]
    this.faces.down[2][0] = this.faces.back[0][2]

    this.faces.back[0][2] = temp[2]
    this.faces.back[1][2] = temp[1]
    this.faces.back[2][2] = temp[0]
  }

  // Bottom face moves
  spinDown(): void {
    this.spin('down')
    const temp = this.faces.front[2].slice()
    this.faces.front[2] = this.faces.left[2].slice()
    this.faces.left[2] = this.faces.back[2].slice()
    this.faces.back[2] = this.faces.right[2].slice()
    this.faces.right[2] = temp
  }

  spinDownReverse(): void {
    this.spinBack('down')
    const temp = this.faces.front[2].slice()
    this.faces.front[2] = this.faces.right[2].slice()
    this.faces.right[2] = this.faces.back[2].slice()
    this.faces.back[2] = this.faces.left[2].slice()
    this.faces.left[2] = temp
  }

  // Maps old notation to new method names
  applyMoves(move: string): void {
    const moveMap = {
      F: () => this.turnFront(),
      "F'": () => this.turnFrontReverse(),
      R: () => this.turnRight(),
      "R'": () => this.turnRightReverse(),
      U: () => this.spinUp(),
      "U'": () => this.spinUpReverse(),
      B: () => this.turnBack(),
      "B'": () => this.turnBackReverse(),
      L: () => this.turnLeft(),
      "L'": () => this.turnLeftReverse(),
      D: () => this.spinDown(),
      "D'": () => this.spinDownReverse(),
    }

    const fn = moveMap[move as keyof typeof moveMap]
    if (fn) {
      fn()
    } else {
      console.warn(`Huh? Don't know how to do move: ${move}`)
    }
  }

  // Shows the current state of the cube in the terminal
  printState(): void {
    const pad = '       '
    console.log('\n--- Current Cube State ---')
    if (!this.faces || !this.faces.up) {
      console.error('Oops - cube not initialized properly!')
      return
    }

    // Print top face
    for (let i = 0; i < 3; i++) {
      console.log(`${pad}${this.faces.up[i].join(' ')}`)
    }
    console.log('')

    // Print middle strip (left, front, right, back)
    for (let i = 0; i < 3; i++) {
      const row = [
        this.faces.left[i].join(' '),
        this.faces.front[i].join(' '),
        this.faces.right[i].join(' '),
        this.faces.back[i].join(' '),
      ].join('  ')
      console.log(row)
    }
    console.log('')

    // Print bottom face
    for (let i = 0; i < 3; i++) {
      console.log(`${pad}${this.faces.down[i].join(' ')}`)
    }
    console.log('------------------\n')
  }
}
