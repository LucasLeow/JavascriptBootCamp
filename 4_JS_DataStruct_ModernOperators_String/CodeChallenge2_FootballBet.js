const game = require('./football_bet_data');

// -------------------------------------------------------------------------------------------------------------------------------------------
// 1. Loop over game.scored & print each player name to console along with goal number
for (let [idx, val] of game.scored.entries()) {
  console.log(`Goal ${idx + 1}: ${val}`);
}
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2. Calculate average odd & log to console
const avgOdd = function () {
  let sum = 0;
  for (let val of Object.values(game.odds)) {
    sum += val;
  }
  return sum / Object.values(game.odds).length;
};
console.log(avgOdd());
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 3. Print the 3 odds to console
for (let [key, val] of Object.entries(game.odds)) {
  let teamName = game[key] ? 'victory ' + game[key] : 'draw';
  console.log(`Odd of ${teamName}: ${val}`);
}
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4. Create object called 'scorers' containing:
// properties = players who scored, number of goals = value
let scored = {};
for (let name of game.scored) {
  scored[name] = 0;
}
for (let name of game.scored) {
  scored[name] += 1;
}
console.log(scored);
// -------------------------------------------------------------------------------------------------------------------------------------------
