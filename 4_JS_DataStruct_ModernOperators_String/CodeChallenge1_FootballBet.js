const game = require('./football_bet_data');

// -------------------------------------------------------------------------------------------------------------------------------------------
// 1. Create 1 player array for each team (players1 & players2)
const [players1, players2] = game.players;
// console.log(players1, players2);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2. 1st player is goalkeeper, others are fieldplayers
// create gk for team1, 1 array for fieldPlayers
const [gk, ...fieldPlayers] = players1;
// console.log(gk, fieldPlayers);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 3.create array 'allPlayers' containing both teams players
const allPlayers = [...players1, ...players2];
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4.create new arr 'players1Final' containing original team1 players
// Thiago, Coutinho, Perisic
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 5. From games.odd object, create variables for each odd called:
// team1, draw, team2
const { team1, x: draw, team2 } = game.odds;
// console.log(team1, draw, team2);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 6. write fn 'printGoals', arbitrary numPlayers, prints each player to console along with number of goals scored
const printGoals = function (...players) {
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
  console.log(`Total goals scored: ${players.length}`);
};

printGoals(...game.scored);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 7. Team with lower odd is more likely to win. Print expected winning team without if else / ternary operator
team1 < team2 && console.log('Team 1 is more likely to win!'); // && returns first falsey

// -------------------------------------------------------------------------------------------------------------------------------------------

// 'Davies', 'Muller', 'Lewandowski', 'Kimmich'
