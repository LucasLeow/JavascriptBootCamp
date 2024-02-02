'use strict';

// == Init start values ==
let secret_num = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;
let game_over_flag = false;

document.querySelector('.highscore').textContent = highscore;
document.querySelector('.score').textContent = score;

const gameLogic = () => {
  if (game_over_flag) {
    alert('Game has ended. Please click Again! button to play again.');
    return;
  }

  if (score <= 1) {
    score--;
    document.querySelector('.score').textContent = score;
    document.querySelector('.message').textContent = 'Gameover 💥. You lose! ';
    document.querySelector('body').style.backgroundColor = '#fb7a6c';
    return;
  }
  const guess = Number(document.querySelector('.guess').value);
  document.querySelector('.score').textContent = score;

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number!';
  } else if (guess === secret_num) {
    game_over_flag = true;
    document.querySelector('.message').textContent = '✅ Bingo!';
    document.querySelector('body').style.backgroundColor = '#60b347';
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
  document.querySelector('body').style.backgroundColor = '#222';
};

document.querySelector('.check').addEventListener('click', gameLogic);
document.querySelector('.btn.again').addEventListener('click', againLogic);
