import { RubiksCube } from './cube'
import inquirer from 'inquirer' // Use inquirer for interactive prompts

/**
 * Main asynchronous function to run the interactive Rubik's Cube simulator.
 */
async function runSimulator() {
  const cube = new RubiksCube()

  console.log("--- Simple Rubik's Cube Simulator ---")
  console.log('Uses explicit rotation logic for clarity.')
  console.log('Use Arrow Keys to navigate, Enter to select.')
  console.log('Initial Solved State:')
  cube.printState()

  const moveChoices = [
    { name: 'F  (Front clockwise)', value: 'F' },
    { name: "F' (Front counter-clockwise)", value: "F'" },
    new inquirer.Separator(),
    { name: 'R  (Right clockwise)', value: 'R' },
    { name: "R' (Right counter-clockwise)", value: "R'" },
    new inquirer.Separator(),
    { name: 'U  (Up clockwise)', value: 'U' },
    { name: "U' (Up counter-clockwise)", value: "U'" },
    new inquirer.Separator(),
    { name: 'B  (Back clockwise)', value: 'B' },
    { name: "B' (Back counter-clockwise)", value: "B'" },
    new inquirer.Separator(),
    { name: 'L  (Left clockwise)', value: 'L' },
    { name: "L' (Left counter-clockwise)", value: "L'" },
    new inquirer.Separator(),
    { name: 'D  (Down clockwise)', value: 'D' },
    { name: "D' (Down counter-clockwise)", value: "D'" },
    new inquirer.Separator('= Options ='),
    { name: 'RESET to Solved', value: 'RESET' },
    { name: 'Quit', value: 'QUIT' },
  ]

  while (true) {
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectedAction',
        message: 'Select Action:',
        choices: moveChoices,
        pageSize: 17,
        loop: false,
      },
    ])
    const action = answers.selectedAction

    if (action === 'QUIT') {
      console.log('Goodbye!')
      break
    }
    if (action === 'RESET') {
      console.log('Resetting cube...')
      cube.reset()
    } else {
      console.log(`Applying move: ${action}`)
      cube.applyMoves(action)
    }

    console.log('\nCurrent State:')
    cube.printState()
  }
}

runSimulator().catch((error) => {
  console.error('An error occurred:', error)
})
