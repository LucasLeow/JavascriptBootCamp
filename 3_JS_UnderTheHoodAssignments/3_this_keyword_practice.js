'use strict';
console.log(this); // global obj in nodejs, window obj in browser

const calcAge = function (birthYear) {
  console.log(2024 - birthYear);
  console.log(this); // undefined for regular function call in strict mode
};

calcAge(20);

const calcAgeArrow = (birthYear) => {
  console.log(2024 - birthYear);
  console.log(this); // global obj because parent 'this' is global obj, arrow fn does not get its own 'this'
};

calcAgeArrow(25);

const lucas = {
  year: 2000,
  calcAge: function () {
    console.log(this); // 'this' will point to any object calling calcAge function
  },
};
