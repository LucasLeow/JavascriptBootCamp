'use strict';

const data = [5, 2, 4, 1, 15, 8, 3];

const calcAverageHumanAge = function (dogAges) {
  let newDogArr = dogAges
    .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
    .filter((age) => age >= 18);

  let avgAge =
    newDogArr.reduce((total, age) => total + age, 0) / newDogArr.length;
  return avgAge;
};

console.log(
  `The average human equivalent age of the dogs are ${calcAverageHumanAge(
    data
  )} years old`
);
