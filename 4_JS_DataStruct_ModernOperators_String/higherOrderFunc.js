const greet = (greeting) => (name) => console.log(`${greeting} ${name}`);
const greeterHey = greet('Hey');
greeterHey('Lucas');
greet('Greetings')('Lucas');
