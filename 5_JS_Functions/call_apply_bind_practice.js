const addTax = (rate, val) => val + val * rate;
const addVat = function (val) {
  return addTax(0.23, val);
};

console.log(addVat(100));
