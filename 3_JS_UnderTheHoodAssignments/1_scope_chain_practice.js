'use strict';

function calcAge(birthYear) {
  const age = 2024 - birthYear;
  console.log(firstName); // firstName is global scoped

  // defined inside calcAge, cannot be accessed in global scope
  function printAge() {
    const output = `You are ${age}, born in ${birthYear}`; // age & birthYear parent variable.
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      const blockScopeVar = `You are a millenial`; // let & const can be block-scoped.
      console.log(blockScopeVar);

      // function add is block-scoped if use strict mode is used
      function add(a, b) {
        return a + b;
        firstName = 'latestName'; // reassigning firstName here will only take effect if firstName access within this block
      }
    }
  }
  printAge();
  return age;
}

const firstName = 'Lucas';
calcAge(1995);
