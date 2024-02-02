'use strict';

let secret_num = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
let game_over_flag = false;

// == Init start values ==

document.querySelector('.highscore').textContent = highscore;
document.querySelector('.score').textContent = score;

const gameLogic = () => {
  if (game_over_flag) {
    alert('Game has ended. Please click Again! button to play again.');
    return;
  }

  if (score === 0) {
    document.querySelector('.message').textContent = 'Gameover 💥. You lose! ';
    return;
  }
  const guess = Number(document.querySelector('.guess').value);
  document.querySelector('.score').textContent = score;

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number!';
  } else if (guess === secret_num) {
    game_over_flag = true;
    document.querySelector('.message').textContent = '✅ Bingo!';
    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  } else {
    score -= 1;
    document.querySelector('.score').textContent = score;
    if (guess < secret_num) {
      document.querySelector('.message').textContent = '⬆️ Higher.';
    } else {
      document.querySelector('.message').textContent = '⬇️ Lower.';
    }
  }
};

const againLogic = () => {
  game_over_flag = false;
  document.querySelector('.guess').value = null;
  document.querySelector('.message').textContent = 'Start guessing...';
  score = 20;
  document.querySelector('.score').textContent = score;
  secret_num = Math.trunc(Math.random() * 20 + 1);
};

document.querySelector('.check').addEventListener('click', gameLogic);
document.querySelector('.btn.again').addEventListener('click', againLogic);
