'use strict';

// == Init start values ==
let secret_num = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
let game_over_flag = false;

// == Init nodes ==
let highscoreNode = document.querySelector('.highscore');
let scoreNode = document.querySelector('.score');
let messageNode = document.querySelector('.message');
let bodyNode = document.querySelector('body');
let guessNode = document.querySelector('.guess');

highscoreNode.textContent = highscore;
scoreNode.textContent = score;

const gameLogic = () => {
  if (game_over_flag) {
    alert('Game has ended. Please click Again! button to play again.');
    return;
  }

  const guess = Number(guessNode.value);
  document.querySelector('.score').textContent = score;

  if (!guess) {
    messageNode.textContent = '⛔ No Number!';
  } else if (guess === secret_num) {
    game_over_flag = true;
    messageNode.textContent = '✅ Bingo!';
    bodyNode.style.backgroundColor = '#60b347';
    if (score > highscore) {
      highscore = score;
      highscoreNode.textContent = highscore;
    }
  } else {
    score -= 1;
    if (score == 0) {
      messageNode.textContent = 'Gameover 💥. You lose! ';
      bodyNode.style.backgroundColor = '#fb7a6c';
      game_over_flag = true;
      return;
    }
    document.querySelector('.score').textContent = score;
    guess < secret_num
      ? (messageNode.textContent = '⬆️ Higher.')
      : (messageNode.textContent = '⬇️ Lower.');
  }
};

const againLogic = () => {
  // == Reset values ==
  game_over_flag = false;
  score = 20;
  secret_num = Math.trunc(Math.random() * 20 + 1);

  guessNode.value = null;
  messageNode.textContent = 'Start guessing...';
  scoreNode.textContent = score;
  bodyNode.style.backgroundColor = '#222';
};

document.querySelector('.check').addEventListener('click', gameLogic);
document.querySelector('.btn.again').addEventListener('click', againLogic);
