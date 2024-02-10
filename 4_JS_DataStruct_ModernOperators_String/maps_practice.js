const questions = new Map([
  ['Question1', 'What is the best Programming Language?'],
  [1, 'Python'],
  [2, 'c++'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);
console.log(questions.get('Question1'));
for (let [key, val] of questions) {
  if (typeof key == 'number') {
    console.log(`Answer ${key}: ${val}`);
  }
}
const ans = Number(prompt('Your answer: '));
console.log(questions.get(ans === questions.get('correct')));
