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