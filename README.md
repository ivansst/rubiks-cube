# Simple Rubik's Cube Simulator

A clear and explainable Rubik's Cube simulator for the terminal, built with TypeScript. This project demonstrates the core logic of cube rotations in an understandable way.

## Features

- Represents the state of a 3x3 Rubik’s Cube.
- Initializes to a standard solved state:

  - **White on top (Up)**
  - **Green on the front (Front)**
  - **Red on the right (Right)**
  - **Orange on the left (Left)**
  - **Blue on the back (Back)**
  - **Yellow on the bottom (Down)**

- Supports all **12 basic face rotations** used in standard cube notation:

  - **F / F'** — Front face

    - `F` rotates the front face **clockwise**
    - `F'` rotates the front face **counter clockwise**

  - **R / R'** — Right face

    - `R` rotates the right face **clockwise**
    - `R'` rotates the right face **counter clockwise**

  - **U / U'** — Up (top) face

    - `U` rotates the top face **clockwise**
    - `U'` rotates the top face **counter clockwise**

  - **B / B'** — Back face

    - `B` rotates the back face **clockwise**
    - `B'` rotates the back face **counter clockwise**

  - **L / L'** — Left face

    - `L` rotates the left face **clockwise**
    - `L'` rotates the left face **counter clockwise**

  - **D / D'** — Down (bottom) face
    - `D` rotates the bottom face **clockwise**
    - `D'` rotates the bottom face **counter clockwise**

- Includes an **interactive terminal menu** to perform moves step-by-step.
- Displays the current cube state in an **exploded view** using single-letter color codes:
  - `W` = White
  - `G` = Green
  - `R` = Red
  - `B` = Blue
  - `O` = Orange
  - `Y` = Yellow

## Prerequisites

- [Node.js](https://nodejs.org/) (includes npm) - Version 16 or later recommended.
- A terminal or command prompt.

## Setup

1.  Clone or download the project.
2.  Navigate to the project directory in your terminal.
3.  Run `npm install` to install dependencies.

## Building

Run `npm run build` to compile TypeScript to JavaScript (output to `dist/`).

## Running

- **Development:** `npm run dev` (uses ts-node to run TypeScript directly)
- **Production:** `npm start` (runs the compiled JavaScript from `dist/`)

_(Current state only displays the initial solved cube)_
