'use strict';

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: Javascript', '1: Python', '2: Rust', '3: C++'],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    let qns_str = '';
    for (let qns of poll.options) {
      qns_str += qns + '\n';
    }
    let user_input = Number(prompt(`${this.question}\n${qns_str}`));
    user_input >= 0 && user_input <= 3
      ? (this.answers[user_input] += 1)
      : alert('Invalid choice, please choose between 0 and 4');
    this.displayResults('string');
  },
  displayResults(type) {
    if (type === 'array') {
      console.log(`[${this.answers}]`);
    } else if (type === 'string') {
      let answer_string = this.answers.join(', ');
      console.log(`Poll results are ${answer_string}`);
    }
  },
};

let ans_poll_btn_node = document.querySelector('.poll');
ans_poll_btn_node.addEventListener('click', poll.registerNewAnswer.bind(poll));

poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [5, 2, 3] }, 'array');

poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'array');
