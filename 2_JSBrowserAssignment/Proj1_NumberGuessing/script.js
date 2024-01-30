'use strict';

const secret_num = Math.trunc(Math.random() * 20 + 1);
let score = 20;
let highscore = 0;

// == Init start values ==
document.querySelector('.score').textContent = score;
document.querySelector('.number').textContent = secret_num;
document.querySelector('.highscore').textContent = highscore;

document.querySelector('.check').addEventListener('click', () => {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No Number!';
  } else if (guess === secret_num) {
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
});
