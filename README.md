# Type-Tester 999 – Typing Game

## Overview
**Type-Tester 999** is an interactive browser-based typing game designed to test and improve typing speed and accuracy. The application challenges users to type randomly generated words within a limited time while tracking performance metrics such as hits and accuracy.

The game also features dynamic UI changes and audio effects to enhance user experience and engagement.

## Features

### Core Functionality
* Random word generation from a predefined word list
* Real-time typing validation
* Timer-based gameplay (99 seconds)
* Hit counter (correct words typed)
* Accuracy calculation at the end of the game

### User Interface

* Dynamic background color changes on each new word
* Responsive and modern UI design
* Styled input field and buttons
* Visual feedback:

  * Green text → correct typing
  * Red text → incorrect typing

### Audio Features

* Background music that starts when the user begins typing
* Game-over sound effect when the game ends
* Smooth audio transition:

  * Music volume lowers during game-over sound
  * Restores after sound effect finishes.

## Technologies Used

* **HTML5** – Structure of the application
* **CSS** – Styling, layout, and animations
* **JavaScript** – Game logic and interactivity
* **Font Awesome** – Icons for UI enhancement
* **Audio File** – Background music and sound effects

## How It Works

### 1. Game Initialization

* The game loads a list of words.
* Words are shuffled randomly.
* The first word is displayed.

### 2. Gameplay Flow

* User starts typing → game begins automatically
* Timer starts counting down
* Input is compared with the displayed word:

  * Correct match → next word loads
  * Partial match → text turns green
  * Incorrect input → text turns red

### 3. Background Effects

* Each new word triggers a background color change
* Reset button adapts to match the background

### 4. Audio Logic

* Background music starts when typing begins
* On game end:

  * Music volume decreases
  * Game-over sound plays
  * Music returns to normal after sound ends

### 5. Game End

* Triggered when:

  * Time runs out OR
  * All words are completed
* Displays final score and accuracy.

## LIVE GAME
[Test The Game!](https://pattyruk.github.io/typegame/)