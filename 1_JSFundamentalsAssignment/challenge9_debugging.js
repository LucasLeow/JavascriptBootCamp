/*
Given an array of forecasted maximum temperatures in deg. C:
[17, 21, 23]

The output should print:
"... 17°C in 1 days ... 21°C in 2 days ... 23°C in 3 days ..."

Create a function 'printForecast' which takes in an array 'arr' and logs a string like the above to the console.

TEST DATA 1: [17, 21, 23]
TEST DATA 2: [12, 5, -5, 0, 4]
*/

const TEST_DATA_1 = [17, 21, 23];
const TEST_DATA_2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  for (let i = 0; i < arr.length; i++) {
    process.stdout.write(`... ${arr[i]} in ${i + 1} days`);
  }
};

printForecast(TEST_DATA_1);
console.log();
printForecast(TEST_DATA_2);
