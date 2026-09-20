# Blackjack

A simple single-player Blackjack game built with React and TypeScript. You play against the dealer, and every move has a 10-second timer.

[Live Demo](https://blackjack-omega-ten.vercel.app/)

## Features

- Classic Blackjack rules: get as close to 21 as possible without going over
- 10-second countdown for each move; when time runs out, the dealer plays automatically
- Dealer draws cards until reaching 18 or beating the player's total
- Dealer's ace automatically switches from 11 to 1 to avoid busting
- Instant result display: **You Won!**, **You Lost!** or **Draw!**
- Start overlay and a "new game" button to restart at any time

## Tech Stack

- React
- Typescript
- Sass

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn / pnpm)

### Installation

```bash
git clone <repository-url>
cd <project-folder>
npm install
```

### Run in development mode

```bash
npm run dev
```

Then open the URL shown in the terminal (usually `http://localhost:5173`).

### Build for production

```bash
npm run build
```

## How to Play

1. Press **start** to begin the game. You get two cards and the dealer gets one.
2. Choose an action before the timer runs out:
   - **hit**: take another card (the timer resets to 10 seconds)
   - **stand**: keep your hand; the dealer plays and the winner is decided
3. If you reach 21 or go over, the round ends immediately.
4. Press **new game** to return to the start screen.

### Card values

| Card          | Value |
| ------------- | ----- |
| 2-10          | Face value |
| J, Q, K       | 10    |
| Ace           | 11 (dealer's ace becomes 1 if needed) |

### Dealer rules

- The dealer draws while their total is **not higher than yours** and **below 18**.
- If you bust (over 21), the dealer does not draw any cards.

### Winning conditions

| Situation                              | Result       |
| -------------------------------------- | ------------ |
| You go over 21                         | You Lost!    |
| Dealer goes over 21                    | You Won!     |
| Both have 21                           | Draw!        |
| You have 21                            | You Won!     |
| Dealer has 21                          | You Lost!    |
| Higher total wins                      | Won / Lost   |
| Equal totals                           | Draw!        |

## Project Structure

```
src/
├── App.tsx      # Main game component (state, timer, UI)
├── App.sass     # Styles
└── utils.ts     # Pure helpers: randomCard, getWinner, winnerColor
public/
└── dealer.png   # Dealer image
```
