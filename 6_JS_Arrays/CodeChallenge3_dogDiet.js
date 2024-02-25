'use strict';

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

const checkDogDiet = function (dog) {
  if (
    dog.curFood >= dog.recommendedFood * 0.9 &&
    dog.curFood <= dog.recommendedFood * 1.1
  ) {
    return 'eating just right';
  } else if (dog.curFood > dog.recommendedFood * 1.1) return 'eating too much';
  else return 'eating too little';
};

// -------------------------------------------------------------------------------------------------------------------------------------------
// 1. Loop through dogs array, calculate recommended food portion, add to object as new property.
// recommendedFood = weight ** 0.75 * 28
dogs.map((dog) => {
  dog.recommendedFood = dog.weight ** 0.75 * 28;
});
console.log(dogs);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 2. Find Sarah's dog & log to console if eating too much / too less
const sarahDog = dogs.find((dog) => dog.owners.includes('Sarah'));
let sarahDogDietString = checkDogDiet(sarahDog);
console.log(`Sarah's Dog is ${sarahDogDietString}`);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 3. Create 2 arrays ownersEatTooMuch, ownersEatTooLittle
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood * 1.1)
  .map((dog) => dog.owners)
  .flat();

const ownersEatTooLittle = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood * 0.9)
  .map((dog) => dog.owners)
  .flat();
console.log(ownersEatTooMuch);
console.log(ownersEatTooLittle);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 4. Log string to console for each array in 3
let eatTooMuchString = ownersEatTooMuch.join(' and ') + "'s dogs eat too much!";
let eatTooLittleString =
  ownersEatTooLittle.join(' and ') + "'s dogs eat too little!";
console.log(eatTooMuchString);
console.log(eatTooLittleString);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 5. Log to console whether any dog eating exactly amount of food recommended
let exactDogs = dogs.some((dog) => dog.curFood === dog.recommendedFood);
console.log(exactDogs);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 6. Log to console whether any dog eating okay amount
let okayDogs = dogs.some(
  (dog) =>
    dog.curFood >= dog.recommendedFood * 0.9 &&
    dog.curFood <= dog.recommendedFood * 1.1
);
console.log(okayDogs);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 7. Create array containing dogs eating okay amount of food
let okayDogsArr = dogs.filter(
  (dog) =>
    dog.curFood >= dog.recommendedFood * 0.9 &&
    dog.curFood <= dog.recommendedFood * 1.1
);
console.log(okayDogsArr);
// -------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------------------------------------------------------------------------------------------------------------------------
// 8. Create shallow copy of dogs arr, sort it by recommended food portion in ascending order
let dogCopy = dogs.slice();
dogCopy.sort((dogA, dogB) => dogA.recommendedFood - dogB.recommendedFood);
console.log(dogCopy);
// -------------------------------------------------------------------------------------------------------------------------------------------
