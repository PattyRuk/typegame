 'use strict';

// score class
class Score {
    constructor(hits, percentage) {
        this.date = new Date().toLocaleDateString();
        this.hits = hits;
        this.percentage = percentage;
    }

    get summary() {
        return `Final Score On ${this.date}: ${this.hits} hits (${this.percentage}% accuracy)`;
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
const headDisplay = document.getElementById('headDisplay');
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

// Scoreboard display
const openScoreBtn = document.getElementById("openScoreBtn");
const closeScoreBtn = document.getElementById("closeScore");
const scoreSidebar = document.getElementById("scoreSidebar");
const scoreList = document.getElementById("scoreList");

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
        wordDisplay.innerHTML = randomWords[currentIndex].split('').map(letter => `<span>${letter}</span>`).join('');
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

    
    const letters = wordDisplay.querySelectorAll("span");
    letters.forEach((letter, index) => {
        const char = inputValue[index];

        if (char == null) {
            letter.style.color = "var(--primary-text-color)";
        } else if (char === letter.textContent) {
            letter.style.color = "var(--success)";
        } else {
            letter.style.color = "var(--error)";
        }
    });
}

// ARRAY OF SCORES
function saveScore(scoreObj) {
    let scores = JSON.parse(localStorage.getItem("scores")) || [];
    scores.push(scoreObj); // adding object to array
    localStorage.setItem("scores", JSON.stringify(scores));
}

function getScores() {
    return JSON.parse(localStorage.getItem("scores")) || [];
}

function renderScores() {
    scoreList.innerHTML = "";

    const scores = getScores();

    if (!scores.length) {
        scoreList.innerHTML = "<li>No scores yet</li>";
        return;
    }

    scores.forEach(s => {
        const li = document.createElement("li");
        li.textContent = `${s.date} | ${s.hits} hits | ${s.percentage}%`;
        scoreList.appendChild(li);
    });
}

// Close modal
openScoreBtn.addEventListener("click", () => {
    renderScores();
    scoreSidebar.classList.add("active");
});

closeScoreBtn.addEventListener("click", () => {
    scoreSidebar.classList.remove("active");
});

// Background change
function changeBackground() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const container = document.querySelector(".game-container");
    const popUp = document.getElementById("popUp");
    
    container.style.background = randomColor;
    popUp.style.background = randomColor;

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
    saveScore(finalScore);

    // Use the object to update the head display
    headDisplay.innerText = `${finalScore.summary}`;

    // to lower background music, not stop.
    bgMusic.volume = 0.2;
    // to play end-game sound.
    endSound.currentTime = 0;
    endSound.play();
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