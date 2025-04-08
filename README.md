# Rubik's Cube CLI

A terminal-based Rubik's cube simulator. Perfect for practicing algorithms or just messing around with cube rotations when you're stuck in the terminal.

## What's this?

It's a 3x3 Rubik's cube that you can play with in your terminal. The cube starts solved with:

- White up
- Green front
- Red right
- Orange left
- Blue back
- Yellow down

## Controls

Basic moves (standard cube notation):

```
F/F' - Front face turns
R/R' - Right face turns
U/U' - Top (Up) face turns
B/B' - Back face turns
L/L' - Left face turns
D/D' - Bottom (Down) face turns
```

(Add ' for counter-clockwise. Example: F' turns front face counter-clockwise)

The cube state is shown using letters for colors:

```
W = White   R = Red     B = Blue
G = Green   O = Orange  Y = Yellow
```

## Quick Start

1. Make sure you have Node.js installed (v16+ recommended)
2. Clone this repo
3. `npm install`
4. `npm run dev` to start playing

## Dev Notes

- Built with TypeScript because I like catching errors before they happen
- Uses `inquirer` for the menu because nobody likes raw readline
- Run `npm test` if you want to make sure I didn't break anything

Pro tip: The cube state is shown in an "unwrapped" view - imagine peeling the stickers off and laying them flat. Takes a bit to get used to, but it's the best way I found to show it in the terminal.
