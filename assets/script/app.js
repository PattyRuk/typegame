'use strict';

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

// Background Colors
const colors = [
    "#1a142c",
    "#201735",
    "#2a2145",
    "#312750",
    "#231b3b",
    "#3a2e5c"
];

const wordDisplay = document.getElementById('wordDisplay');
const headDisplay = document.getElementById('headDisplay')
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('timer');
const hitsDisplay = document.getElementById('wordCount');
const totalWordsDisplay = document.getElementById('totalWords');
const wordInput = document.getElementById('wordInput');
const resetBtn = document.getElementById('resetBtn');

//Game Info
const popup = document.getElementById('popUp');
const open = document.getElementById('openBtn');
const close = document.getElementById('closeBtn');

let randomWords = [];
let userPlaying = false;
let currentIndex = 0;
let hits = 0;
let timeLeft = 99;
let timer = null;


// Game Sound
const bgMusic = new Audio("./assets/media/game-sound.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.5;

// Game-over Sound
const endSound = new Audio("./assets/media/game-over.mp3");
endSound.volume = 1.0;


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
        changeBackground(); // change color on new words

    } else { 
        endGame("All Available Words Have Been Entered! CONGRATULATIONS!!"); 

    } 
} 

//Compare Inputted Word
function compareInput() {
    if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
    }

    if (!userPlaying && wordInput.value.length> 0) {
        userPlaying = true;
        timer = setInterval(updateTimer, 1000);
    }

    const currentWord = randomWords[currentIndex];
    const inputValue = wordInput.value;

    if (inputValue === currentWord) {
        wordInput.placeholder = "";
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

    const container = document.querySelector(".container");

    container.style.background = randomColor;

    // Match reset button with background
    resetBtn.style.background = randomColor;
    resetBtn.style.borderColor = randomColor;
    // match close button
    close.style.background = randomColor;
    close.style.borderColor = randomColor;
}

// Reset Game
function resetGame() {
    clearInterval(timer);
    userPlaying = false;
    timeLeft = 99;
    hits = 0;
    currentIndex = 0;
    randomWords = [...wordList].sort(() => Math.random() - 0.5); //randomize words, formula assisted by chatgpt
    timeDisplay.innerText = '99';
    hitsDisplay.innerText = '0';
    totalWordsDisplay.innerText = wordList.length;
    headDisplay.innerText = 'TEST YOUR SPEED!';
    headDisplay.style.fontSize = '3.5rem';
    wordInput.value = '';
    wordInput.disabled = false;
    wordInput.placeholder = "Type to begin...";

    bgMusic.currentTime = 0;
    bgMusic.pause();
    changeBackground();

    nextWord();
    wordInput.focus();
}

function endGame(message) {
    clearInterval(timer);
    wordInput.disabled = true;
    wordDisplay.innerText = "GAME OVER!";
    wordDisplay.style.color = 'var(--error)';
    headDisplay.style.fontSize = '2.5rem';
    // Calculate final accuracy percentage
    const accuracy = Math.round((currentIndex / wordList.length) * 100);
    // Create the Score object
    const finalScore = new Score(currentIndex, accuracy);
    // Use the object to update the head display
    headDisplay.innerText = `${finalScore.summary}`;

    // to lower background music, not stop.
    bgMusic.volume = 0.2;
    // to play end-game sound.
    endSound.currentTime = 0;
    endSound.play();

    // retores music after end-game sound.
    endSound.onended = () => {
        bgMusic.volume = 0.2;
    };
}

// Show popup
open.addEventListener('click', () => {
  popup.style.display = 'block';
});

// Hide popup
close.addEventListener('click', () => {
  popup.style.display = 'none';
});

//Starting Game
wordInput.addEventListener('input', compareInput);
resetBtn.addEventListener('click', resetGame);

document.addEventListener("input", () => {
    bgMusic.play();
}, { once: true });

resetGame();