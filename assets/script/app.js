'strict';
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
const wordCountDisplay = document.getElementById('wordCount');
const totalWordsDisplay = document.getElementById('totalWords');
const wordInput = document.getElementById('wordInput');
const resetBtn = document.getElementById('resetBtn');

let randomWords = [];
let isPlaying = false;
let currentIndex = 0;
let typedChars = 0;
let timeLeft = 99;
let timer = null;

//Start Game
function start() {
    totalWordsDisplay.innerText = wordList.length;
    resetGame();
    wordInput.addEventListener('input', handleInput);
    resetBtn.addEventListener('click', resetGame);
}

// Calculate Score
    // I used the WPM score set up (but changed the 5>10 and 60>99), 
    // to make it more suitable for the time constraint and length of word will affect score 
function calculateScore() {
    const timeSpent = 99 - timeLeft;
    if (timeSpent > 0) {
        const score = Math.round((typedChars / 10) / (timeSpent / 99));
        scoreDisplay.innerText = score;
    }
}  

// Update Time
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeDisplay.innerText = timeLeft;
        calculateScore();
    } else {
        endGame("Time's up!");
    }
}








// Reset Game
function resetGame() {
    isPlaying = false;
    timeLeft = 99;
    typedChars = 0;
    currentIndex = 0;
    // Randomize the word pool

}