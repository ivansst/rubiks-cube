import { Color, Face } from './colors'
import createFace from './helpers'

export class RubiksCube {
  faces: {
    topFace: Face
    leftFace: Face
    frontFace: Face
    rightFace: Face
    backFace: Face
    bottomFace: Face
  } = RubiksCube.createSolvedFaces()

  constructor() {}

  static createSolvedFaces() {
    return {
      topFace: createFace(Color.White),
      leftFace: createFace(Color.Orange),
      frontFace: createFace(Color.Green),
      rightFace: createFace(Color.Red),
      backFace: createFace(Color.Blue),
      bottomFace: createFace(Color.Yellow),
    }
  }

  reset(): void {
    this.faces = RubiksCube.createSolvedFaces()
  }

  private rotateClockwise(faceKey: keyof RubiksCube['faces']): void {
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

  private rotateCounterClockwise(faceKey: keyof RubiksCube['faces']): void {
    const face = this.faces[faceKey]
    const N = 3
    for (let i = 0; i < N / 2; i++) {
      for (let j = i; j < N - i - 1; j++) {
        let temp = face[i][j]
        face[i][j] = face[j][N - 1 - i]
        face[j][N - 1 - i] = face[N - 1 - i][N - 1 - j]
        face[N - 1 - i][N - 1 - j] = face[N - 1 - j][i]
        face[N - 1 - j][i] = temp
      }
    }
  }

  frontFaceClockwise(): void {
    this.rotateClockwise('frontFace')
    const temp: Color[] = [
      this.faces.topFace[2][0],
      this.faces.topFace[2][1],
      this.faces.topFace[2][2],
    ]
    this.faces.topFace[2][0] = this.faces.leftFace[2][2]
    this.faces.topFace[2][1] = this.faces.leftFace[1][2]
    this.faces.topFace[2][2] = this.faces.leftFace[0][2]

    this.faces.leftFace[0][2] = this.faces.bottomFace[0][0]
    this.faces.leftFace[1][2] = this.faces.bottomFace[0][1]
    this.faces.leftFace[2][2] = this.faces.bottomFace[0][2]

    this.faces.bottomFace[0][0] = this.faces.rightFace[2][0]
    this.faces.bottomFace[0][1] = this.faces.rightFace[1][0]
    this.faces.bottomFace[0][2] = this.faces.rightFace[0][0]

    this.faces.rightFace[0][0] = temp[0]
    this.faces.rightFace[1][0] = temp[1]
    this.faces.rightFace[2][0] = temp[2]
  }

  frontFaceCounterClockwise(): void {
    this.rotateCounterClockwise('frontFace')
    const temp: Color[] = [
      this.faces.topFace[2][0],
      this.faces.topFace[2][1],
      this.faces.topFace[2][2],
    ]
    this.faces.topFace[2][0] = this.faces.rightFace[0][0]
    this.faces.topFace[2][1] = this.faces.rightFace[1][0]
    this.faces.topFace[2][2] = this.faces.rightFace[2][0]

    this.faces.rightFace[0][0] = this.faces.bottomFace[0][2]
    this.faces.rightFace[1][0] = this.faces.bottomFace[0][1]
    this.faces.rightFace[2][0] = this.faces.bottomFace[0][0]

    this.faces.bottomFace[0][0] = this.faces.leftFace[0][2]
    this.faces.bottomFace[0][1] = this.faces.leftFace[1][2]
    this.faces.bottomFace[0][2] = this.faces.leftFace[2][2]

    this.faces.leftFace[0][2] = temp[2]
    this.faces.leftFace[1][2] = temp[1]
    this.faces.leftFace[2][2] = temp[0]
  }

  rightFaceClockwise(): void {
    this.rotateClockwise('rightFace')
    const temp: Color[] = [
      this.faces.topFace[0][2],
      this.faces.topFace[1][2],
      this.faces.topFace[2][2],
    ]
    this.faces.topFace[0][2] = this.faces.frontFace[0][2]
    this.faces.topFace[1][2] = this.faces.frontFace[1][2]
    this.faces.topFace[2][2] = this.faces.frontFace[2][2]

    this.faces.frontFace[0][2] = this.faces.bottomFace[0][2]
    this.faces.frontFace[1][2] = this.faces.bottomFace[1][2]
    this.faces.frontFace[2][2] = this.faces.bottomFace[2][2]

    this.faces.bottomFace[0][2] = this.faces.backFace[2][0]
    this.faces.bottomFace[1][2] = this.faces.backFace[1][0]
    this.faces.bottomFace[2][2] = this.faces.backFace[0][0]

    this.faces.backFace[0][0] = temp[2]
    this.faces.backFace[1][0] = temp[1]
    this.faces.backFace[2][0] = temp[0]
  }

  rightFaceCounterClockwise(): void {
    this.rotateCounterClockwise('rightFace')
    const temp: Color[] = [
      this.faces.topFace[0][2],
      this.faces.topFace[1][2],
      this.faces.topFace[2][2],
    ]
    this.faces.topFace[0][2] = this.faces.backFace[2][0]
    this.faces.topFace[1][2] = this.faces.backFace[1][0]
    this.faces.topFace[2][2] = this.faces.backFace[0][0]

    this.faces.backFace[0][0] = this.faces.bottomFace[2][2]
    this.faces.backFace[1][0] = this.faces.bottomFace[1][2]
    this.faces.backFace[2][0] = this.faces.bottomFace[0][2]

    this.faces.bottomFace[0][2] = this.faces.frontFace[0][2]
    this.faces.bottomFace[1][2] = this.faces.frontFace[1][2]
    this.faces.bottomFace[2][2] = this.faces.frontFace[2][2]

    this.faces.frontFace[0][2] = temp[0]
    this.faces.frontFace[1][2] = temp[1]
    this.faces.frontFace[2][2] = temp[2]
  }

  topFaceClockwise(): void {
    this.rotateClockwise('topFace')
    const temp: Color[] = this.faces.frontFace[0].slice()
    this.faces.frontFace[0] = this.faces.rightFace[0].slice()
    this.faces.rightFace[0] = this.faces.backFace[0].slice()
    this.faces.backFace[0] = this.faces.leftFace[0].slice()
    this.faces.leftFace[0] = temp
  }

  topFaceCounterClockwise(): void {
    this.rotateCounterClockwise('topFace')
    const temp: Color[] = this.faces.frontFace[0].slice()
    this.faces.frontFace[0] = this.faces.leftFace[0].slice()
    this.faces.leftFace[0] = this.faces.backFace[0].slice()
    this.faces.backFace[0] = this.faces.rightFace[0].slice()
    this.faces.rightFace[0] = temp
  }

  backFaceClockwise(): void {
    this.rotateClockwise('backFace')
    const temp: Color[] = this.faces.topFace[0].slice()

    this.faces.topFace[0][0] = this.faces.rightFace[0][2]
    this.faces.topFace[0][1] = this.faces.rightFace[1][2]
    this.faces.topFace[0][2] = this.faces.rightFace[2][2]

    this.faces.rightFace[0][2] = this.faces.bottomFace[2][2]
    this.faces.rightFace[1][2] = this.faces.bottomFace[2][1]
    this.faces.rightFace[2][2] = this.faces.bottomFace[2][0]

    this.faces.bottomFace[2][0] = this.faces.leftFace[2][0]
    this.faces.bottomFace[2][1] = this.faces.leftFace[1][0]
    this.faces.bottomFace[2][2] = this.faces.leftFace[0][0]

    this.faces.leftFace[0][0] = temp[2]
    this.faces.leftFace[1][0] = temp[1]
    this.faces.leftFace[2][0] = temp[0]
  }

  backFaceCounterClockwise(): void {
    this.rotateCounterClockwise('backFace')
    const temp: Color[] = this.faces.topFace[0].slice()

    this.faces.topFace[0][0] = this.faces.leftFace[2][0]
    this.faces.topFace[0][1] = this.faces.leftFace[1][0]
    this.faces.topFace[0][2] = this.faces.leftFace[0][0]

    this.faces.leftFace[0][0] = this.faces.bottomFace[2][0]
    this.faces.leftFace[1][0] = this.faces.bottomFace[2][1]
    this.faces.leftFace[2][0] = this.faces.bottomFace[2][2]

    this.faces.bottomFace[2][0] = this.faces.rightFace[2][2]
    this.faces.bottomFace[2][1] = this.faces.rightFace[1][2]
    this.faces.bottomFace[2][2] = this.faces.rightFace[0][2]

    this.faces.rightFace[0][2] = temp[0]
    this.faces.rightFace[1][2] = temp[1]
    this.faces.rightFace[2][2] = temp[2]
  }

  leftFaceClockwise(): void {
    this.rotateClockwise('leftFace')
    const temp: Color[] = [
      this.faces.topFace[0][0],
      this.faces.topFace[1][0],
      this.faces.topFace[2][0],
    ]
    this.faces.topFace[0][0] = this.faces.backFace[2][2]
    this.faces.topFace[1][0] = this.faces.backFace[1][2]
    this.faces.topFace[2][0] = this.faces.backFace[0][2]

    this.faces.backFace[0][2] = this.faces.bottomFace[2][0]
    this.faces.backFace[1][2] = this.faces.bottomFace[1][0]
    this.faces.backFace[2][2] = this.faces.bottomFace[0][0]

    this.faces.bottomFace[0][0] = this.faces.frontFace[0][0]
    this.faces.bottomFace[1][0] = this.faces.frontFace[1][0]
    this.faces.bottomFace[2][0] = this.faces.frontFace[2][0]

    this.faces.frontFace[0][0] = temp[0]
    this.faces.frontFace[1][0] = temp[1]
    this.faces.frontFace[2][0] = temp[2]
  }

  leftFaceCounterClockwise(): void {
    this.rotateCounterClockwise('leftFace')
    const temp: Color[] = [
      this.faces.topFace[0][0],
      this.faces.topFace[1][0],
      this.faces.topFace[2][0],
    ]
    this.faces.topFace[0][0] = this.faces.frontFace[0][0]
    this.faces.topFace[1][0] = this.faces.frontFace[1][0]
    this.faces.topFace[2][0] = this.faces.frontFace[2][0]

    this.faces.frontFace[0][0] = this.faces.bottomFace[0][0]
    this.faces.frontFace[1][0] = this.faces.bottomFace[1][0]
    this.faces.frontFace[2][0] = this.faces.bottomFace[2][0]

    this.faces.bottomFace[0][0] = this.faces.backFace[2][2]
    this.faces.bottomFace[1][0] = this.faces.backFace[1][2]
    this.faces.bottomFace[2][0] = this.faces.backFace[0][2]

    this.faces.backFace[0][2] = temp[2]
    this.faces.backFace[1][2] = temp[1]
    this.faces.backFace[2][2] = temp[0]
  }

  bottomFaceClockwise(): void {
    this.rotateClockwise('bottomFace')
    const temp: Color[] = this.faces.frontFace[2].slice()
    this.faces.frontFace[2] = this.faces.leftFace[2].slice()
    this.faces.leftFace[2] = this.faces.backFace[2].slice()
    this.faces.backFace[2] = this.faces.rightFace[2].slice()
    this.faces.rightFace[2] = temp
  }

  bottomFaceCounterClockwise(): void {
    this.rotateCounterClockwise('bottomFace')
    const temp: Color[] = this.faces.frontFace[2].slice()
    this.faces.frontFace[2] = this.faces.rightFace[2].slice()
    this.faces.rightFace[2] = this.faces.backFace[2].slice()
    this.faces.backFace[2] = this.faces.leftFace[2].slice()
    this.faces.leftFace[2] = temp
  }

  applyMoves(move: string): void {
    switch (move) {
      case 'F':
        this.frontFaceClockwise()
        break
      case "F'":
        this.frontFaceCounterClockwise()
        break
      case 'R':
        this.rightFaceClockwise()
        break
      case "R'":
        this.rightFaceCounterClockwise()
        break
      case 'U':
        this.topFaceClockwise()
        break
      case "U'":
        this.topFaceCounterClockwise()
        break
      case 'B':
        this.backFaceClockwise()
        break
      case "B'":
        this.backFaceCounterClockwise()
        break
      case 'L':
        this.leftFaceClockwise()
        break
      case "L'":
        this.leftFaceCounterClockwise()
        break
      case 'D':
        this.bottomFaceClockwise()
        break
      case "D'":
        this.bottomFaceCounterClockwise()
        break
      default:
        console.warn(`Attempted to apply unknown move: ${move}`)
    }
  }

  printState(): void {
    const pad = '       '
    console.log('\n--- Cube State ---')
    if (!this.faces || !this.faces.topFace) {
      console.error('Error: Cube state not initialized.')
      return
    }
    for (let i = 0; i < 3; i++) {
      console.log(`${pad}${this.faces.topFace[i].join(' ')}`)
    }
    console.log('')
    for (let i = 0; i < 3; i++) {
      const lRow = this.faces.leftFace[i].join(' ')
      const fRow = this.faces.frontFace[i].join(' ')
      const rRow = this.faces.rightFace[i].join(' ')
      const bRow = this.faces.backFace[i].join(' ')
      console.log(`${lRow}  ${fRow}  ${rRow}  ${bRow}`)
    }
    console.log('')
    for (let i = 0; i < 3; i++) {
      console.log(`${pad}${this.faces.bottomFace[i].join(' ')}`)
    }
    console.log('------------------\n')
  }
}
