# Assembly: Endgame

A word-guessing game (similar to Hangman) built with React.  
Your goal is to guess the hidden programming term before Assembly takes over the programming world.

## Live Demo

Check the site here : [Assembly-EndGame-WebApp]https://assembly-endgame-webapp.netlify.app/

## How to Play

-A random word is chosen at the start of the game.
-Click on the on-screen letters to guess.
-Each wrong guess eliminates one programming language (shown as colored chips).
-You win if you reveal all the letters in time.
-You lose if you make 8 wrong guesses.

## Features

-Randomly chosen word each game
-On-screen keyboard with letter feedback (correct / wrong)
-Visual progress with programming language chips
-Win and Lose states with custom messages
-Reset button to start a new game

## Tech Stack

-[React](https://react.dev/) (functional components + hooks) -[clsx](https://github.com/lukeed/clsx) for conditional classNames
-CSS for styling

## Getting Started

# Clone and install dependencies:

```bash
git clone https://github.com/your-username/assembly-endgame.git
cd assembly-endgame
npm install
```

# Run the development server:

```bash
npm run dev
```

# Build for production:

```bash

npm run build
```
