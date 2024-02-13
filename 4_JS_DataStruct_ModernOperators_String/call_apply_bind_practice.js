const myRegularFunction = function (param1, param2) {
  console.log(`Greetings ${this.name} ${param1} ${param2}`);
};

const myObj = {
  name: 'Lucas',
};

myRegularFunction.call(myObj, 'param1', 'param2');
