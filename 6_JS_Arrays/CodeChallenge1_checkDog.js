'use strict';

const julia_data = [3, 5, 2, 12, 7];
const kate_data = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  let corrected_julia = [...dogsJulia].splice(1, 2);
  let combined_data = corrected_julia.concat(dogsKate);
  combined_data.forEach(function (age, idx) {
    let dog_string =
      age >= 3 ? `is an adult, and is ${age} years old` : 'is still a puppy 🐶';
    console.log(`Dog number ${idx + 1} ${dog_string} `);
  });
};

checkDogs(julia_data, kate_data);
