'use strict';

const WIN_CRITERIA = 100;
let p1Score = 0;
let p2Score = 0;
let currentScore = 0;
let game_over_flag = false;

const p1Node = document.querySelector('section.player--0');
const p2Node = document.querySelector('section.player--1');
const diceImgNode = document.querySelector('.dice');

// Button Nodes
const diceBtnNode = document.querySelector('.btn--roll');
const holdBtnNode = document.querySelector('.btn--hold');
const newGameBtnNode = document.querySelector('.btn--new');

const displayScore = () => {
  p1Node.querySelector('.score').textContent = p1Score;
  p2Node.querySelector('.score').textContent = p2Score;

  p1Node.querySelector('.current-score').textContent = currentScore;
  p2Node.querySelector('.current-score').textContent = currentScore;
};

displayScore();
const checkActivePlayer = () => {
  return p1Node.classList.contains('player--active') ? p1Node : p2Node;
};

const toggleActivePlayer = () => {
  p1Node.classList.toggle('player--active');
  p2Node.classList.toggle('player--active');
};

// Event Listener Functions
const rollDice = () => {
  if (game_over_flag) {
    alert('Gameover! Please click New Game to play again.');
    return;
  }
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
  if (game_over_flag) {
    alert('Game over! Please click New Game to play again.');
    return;
  }
  let activePlayer = checkActivePlayer();
  p1Node.classList.contains('player--active')
    ? (p1Score += currentScore)
    : (p2Score += currentScore);

  p1Node.classList.contains('player--active')
    ? (p1Node.querySelector('.current-score').textContent = p1Score)
    : (p2Node.querySelector('.current-score').textContent = p2Score);

  currentScore = 0;
  activePlayer.querySelector('.score').textContent = currentScore;
  if (
    Number(activePlayer.querySelector('.current-score').textContent) >=
    WIN_CRITERIA
  ) {
    activePlayer.classList.toggle('player--winner');
    let winner = activePlayer.querySelector('.name').textContent;
    activePlayer.querySelector('.name').textContent = winner + ' Wins!';

    game_over_flag = true;
  }
  toggleActivePlayer();
};

const newGame = () => {
  game_over_flag = false;
  (p1Score = 0), (p2Score = 0), (currentScore = 0);
  displayScore();
};

// == Event Listeners ==
diceBtnNode.addEventListener('click', rollDice);
holdBtnNode.addEventListener('click', holdScore);
newGameBtnNode.addEventListener('click', newGame);
