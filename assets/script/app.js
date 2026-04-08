'strict';

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
        return `On ${this.date}: Player had ${this.#hits} hits (${this.#percentage}% accuracy)`;
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
const wordCountDisplay = document.getElementById('wordCount');
const totalWordsDisplay = document.getElementById('totalWords');
const wordInput = document.getElementById('wordInput');
const resetBtn = document.getElementById('resetBtn');

let randomWords = [];
let userPlaying = false;
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

//Next Word function
function nextWord() {
    if (currentIndex < randomWords.length) { 
        wordDisplay.innerText=randomWords[currentIndex];
        wordDisplay.style.color='var(--primary-text-color)' ; 
        wordCountDisplay.innerText=currentIndex; 
    } else { 
        endGame("All Available Words Have Been Entered! CONGRATULATIONS!!"); 

    } 
} 

//Compare Inputted Word
function handleInput() { 
    if (!userPlaying && wordInput.value.length> 0) {
        userPlaying = true;
        timer = setInterval(updateTimer, 1000);
    }

    const currentWord = randomWords[currentIndex];
    const inputValue = wordInput.value;

    if (inputValue === currentWord) {
        typedChars += currentWord.length + 1;
        wordInput.value = '';
        currentIndex++;
        calculateScore();
        nextWord();
        return;
    }
    wordDisplay.style.color = currentWord.startsWith(inputValue) ? 'var(--success)' : 'var(--error)';
}

//Calculate Displayed Score
function calculateScore() {
    const timeSpent = 99 - timeLeft;
    if (timeSpent > 0) {
        const accuracy = Math.round((currentIndex / wordList.length) * 100);
        const score = accuracy * 10 - timeSpent // a fun way to keep score 
        scoreDisplay.innerText = score ;
    }
}

// Update Timer 
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