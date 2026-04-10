'use strict';

const bgMusic = new Audio("./assets/media/game-sound.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Background Colors
const colors = [
    "#1c1c4c",
    "#2b2d42",
    "#3a0ca3",
    "#14213d",
    "#1b263b",
    "#0f3460"
];

class Score {
    #date;
    #hits;
    #percentage;

    constructor(hits, percentage) {
        this.#date = new Date();
        this.#hits = hits;
        this.#percentage = percentage;
    }

    get date() { return this.#date.toLocaleDateString()}
    get hits() { return this.#hits;}
    get percentage() { return this.#percentage;}
    get summary() {
        return `Final Score On ${this.date}: ${this.#hits} hits (${this.#percentage}% accuracy)`;
    }
}


const wordList = 
['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 
'population', 'weather', 'bottle','history','dream', 'character', 
'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 
'rainbow', 'bicycle','eclipse', 'calculator', 'trouble', 'watermelon', 
'developer', 'philosophy', 'database', 'periodic', 'capitalism',
'abominable','component', 'future', 'pasta', 'microwave', 'jungle', 
'wallet', 'canada', 'coffee', 'beauty', 'agency','chocolate', 'eleven', 
'technology', 'alphabet', 'knowledge', 'magician', 'professor', 'triangle',
'earthquake','baseball', 'beyond', 'evolution', 'banana', 'perfumer', 
'computer', 'management', 'discovery', 'ambition', 'music','eagle', 'crown', 
'chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button', 'superman', 
'library', 'unboxing','bookstore', 'language', 'homework', 'fantastic', 
'economy', 'interview', 'awesome', 'challenge', 'science', 'mystery',
'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 
'yellow', 'keyboard', 'window'];

const wordDisplay = document.getElementById('wordDisplay');
const headDisplay = document.getElementById('headDisplay')
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('timer');
const hitsDisplay = document.getElementById('wordCount');
const totalWordsDisplay = document.getElementById('totalWords');
const wordInput = document.getElementById('wordInput');
const resetBtn = document.getElementById('resetBtn');

let randomWords = [];
let userPlaying = false;
let currentIndex = 0;
let hits = 0;
let timeLeft = 99;
let timer = null;

//Start Game
function start() {
    totalWordsDisplay.innerText = wordList.length;
    resetGame();
    wordInput.addEventListener('input', compareInput);
    resetBtn.addEventListener('click', resetGame);
}

// Update Timer 
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
    } else {
        endGame("Time's up!");
    }
}

//Next Word function
function nextWord() {
    if (currentIndex < randomWords.length) { 
        wordDisplay.innerText = randomWords[currentIndex];
        wordDisplay.style.color = 'var(--primary-text-color)' ; 
        hitsDisplay.innerText = currentIndex; 
    } else { 
        endGame("All Available Words Have Been Entered! CONGRATULATIONS!!"); 

    } 
} 

//Compare Inputted Word
function compareInput() {
    if (!userPlaying && wordInput.value.length> 0) {
        userPlaying = true;
        timer = setInterval(updateTimer, 1000);
    }
    const currentWord = randomWords[currentIndex];
    const inputValue = wordInput.value;
    if (inputValue === currentWord) {
        wordInput.value = '';
        currentIndex++;
        hits++;
        nextWord();
        return;
    }
    if (currentWord.startsWith(inputValue)) {
    // Input matches the start of the word
    wordDisplay.style.color = 'var(--success)';
    } else {
    // Input does not match
    wordDisplay.style.color = 'var(--error)';
    }
}

// Background change
function changeBackground() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const container = document.querySelector(".game-container");

    container.style.background = randomColor;

    // Match reset button with background
    resetBtn.style.background = randomColor;
    resetBtn.style.borderColor = randomColor;
}

// Reset Game
function resetGame() {
    clearInterval(timer);
    userPlaying = false;
    timeLeft = 99;
    hits = 0;
    typedChars = 0;
    currentIndex = 0;
    randomWords = [...wordList].sort(() => Math.random() - 0.5); //randomize words, formula assisted by chatgpt
    timeDisplay.innerText = '99';
    hitsDisplay.innerText = '0';
    headDisplay.innerText = 'Lets Test Your Speed!';
    wordInput.value = '';
    wordInput.disabled = false;
    wordInput.placeholder = "Type to begin...";
    nextWord();
    wordInput.focus();
}

function endGame(message) {
    clearInterval(timer);
    wordInput.disabled = true;
    wordDisplay.innerText = "Done!";
    wordDisplay.style.color = 'var(--error)';
    headDisplay.style.fontSize = '2rem';
    // Calculate final accuracy percentage
    const accuracy = Math.round((currentIndex / wordList.length) * 100);
    // Create the Score object
    const finalScore = new Score(currentIndex, accuracy);
    // Use the object to update the UI
    headDisplay.innerText = `${finalScore.summary}`;
}
start();