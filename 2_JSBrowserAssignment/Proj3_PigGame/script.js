'use strict';

const WIN_CRITERIA = 100;
let p1Score = 0;
let p2Score = 0;
let currentScore = 0;

const p1ScoreNode = document.getElementById('score--0');
const p2ScoreNode = document.getElementById('score--1');
const diceImgNode = document.querySelector('.dice');
const p1CurrentScoreNode = document.getElementById('current--0');
const p2CurrentScoreNode = document.getElementById('current--1');

const p1Node = document.querySelector('section.player--0');
const p2Node = document.querySelector('section.player--1');

// Button Nodes
const diceBtnNode = document.querySelector('.btn--roll');
const holdBtnNode = document.querySelector('.btn--hold');

p1ScoreNode.textContent = p1Score;
p2ScoreNode.textContent = p2Score;

const checkActivePlayer = () => {
  return p1Node.classList.contains('player--active') ? p1Node : p2Node;
};

const toggleActivePlayer = () => {
  p1Node.classList.toggle('player--active');
  p2Node.classList.toggle('player--active');
};

// Event Listener Functions
const rollDice = () => {
  let activePlayer = checkActivePlayer();
  let activePlayerScoreNode = activePlayer.querySelector('.score');
  let rollResult = Math.floor(Math.random() * 6) + 1;
  diceImgNode.setAttribute('src', `dice-${rollResult}.png`);

  if (rollResult === 1) {
    currentScore = 0;
    toggleActivePlayer();
  } else {
    currentScore += rollResult;
  }
  activePlayerScoreNode.textContent = currentScore;
};

const holdScore = () => {
  let activePlayer = checkActivePlayer();
  p1Node.classList.contains('player--active')
    ? (p1Score += currentScore)
    : (p2Score += currentScore);

  p1Node.classList.contains('player--active')
    ? (p1Node.querySelector('.current-score').textContent = p1Score)
    : (p2Node.querySelector('.current-score').textContent = p2Score);

  currentScore = 0;
  activePlayer.querySelector('.score').textContent = currentScore;

  toggleActivePlayer();
};

// == Event Listeners ==
diceBtnNode.addEventListener('click', rollDice);
holdBtnNode.addEventListener('click', holdScore);
