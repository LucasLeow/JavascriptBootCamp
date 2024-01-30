/* Write your code below. Good luck! 🙂 */

const calcAverage = (s1, s2, s3) => (s1 + s2 + s3) / 3;

const checkWinner = function(dolphinScore, koalaScore) {
    if (dolphinScore >= (2 * koalaScore)) {
        console.log(`Dolphins win (${dolphinScore} vs. ${koalaScore})`)
    } else if (koalaScore >= (2 * dolphinScore)) {
        console.log(`Koalas win (${koalaScore} vs ${dolphinScore})`)
    } else {
        console.log("No team wins...")
    }
}

let scoreDolphins = calcAverage(44, 23, 71);
let scoreKoalas = calcAverage(65, 54, 49);

checkWinner(scoreDolphins, scoreKoalas);