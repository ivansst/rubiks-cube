import { RubiksCube } from './cube'
import * as fs from 'fs/promises'
import * as readline from 'readline'

// Let's get this party started! 🎲
async function runSimulator() {
  // Fire up a new cube
  const cube = new RubiksCube()

  // Show the initial state (should be a perfect cube)
  cube.printState()

  // Set up our input reader
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  // Keep track of moves for fun
  let moveCount = 0

  // Let's keep spinning until someone says stop
  while (true) {
    const move = await new Promise<string>((resolve) => {
      rl.question('Enter move (or q to quit): ', resolve)
    })

    // Time to wrap it up?
    if (move.toLowerCase() === 'q') {
      console.log(`\nThanks for playing! You made ${moveCount} moves.`)
      break
    }

    // Give it a whirl
    cube.applyMoves(move)
    moveCount++

    // Ta-da! 🎩
    cube.printState()
  }

  rl.close()
}

// Kick things off if we're running this directly
if (require.main === module) {
  runSimulator().catch((err) => {
    console.error('Oops, something went wrong:', err)
    process.exit(1)
  })
}
