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

p1ScoreNode.textContent = p1Score;
p2ScoreNode.textContent = p2Score;

// Event Listener Functions
const rollDice = () => {
  let activePlayer;
  let rollResult = Math.floor(Math.random() * 6) + 1;
  diceImgNode.setAttribute('src', `dice-${rollResult}.png`);

  p1Node.classList.contains('player--active')
    ? (activePlayer = p1CurrentScoreNode)
    : (activePlayer = p2CurrentScoreNode);

  if (rollResult === 1) {
    currentScore = 0;
    p1Node.classList.toggle('player--active');
    p2Node.classList.toggle('player--active');
  } else {
    currentScore += rollResult;
  }
  activePlayer.textContent = currentScore;
};

// == Event Listeners ==
diceBtnNode.addEventListener('click', rollDice);
