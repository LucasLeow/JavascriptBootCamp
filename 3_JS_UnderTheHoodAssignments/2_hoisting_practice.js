// console.log(me);
// console.log(job); // throws exception
// console.log(year); // throws exception

var me = 'Lucas';
let job = 'developer';
const year = 1995;

console.log(addDeclaration(1, 2));
// console.log(addExpr(1, 2)); // declared with const, therefore no hoisting. throws exception
// console.log(addArrow(1, 2)); // same as above
// if change to var, will return undefined

function addDeclaration(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

const addArrow = (a, b) => {
  a + b;
};
