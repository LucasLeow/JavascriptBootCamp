// -------------------------------------------------------------------------------------------------------------------------------------------
// Write a program that receives a list of variable names in underscore_case
// convert to camelCase

test_data = `underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure`;

words_arr = test_data.split('\n');
for (let i = 0; i < words_arr.length; i++) {
  word = words_arr[i].toLowerCase();
  underscore_idx = word.indexOf('_');

  word = word.replace('_', '');
  camel_word =
    word.slice(0, underscore_idx) +
    word.slice(underscore_idx, underscore_idx + 1).toUpperCase() +
    word.slice(underscore_idx + 1);

  camel_word = camel_word.padEnd(20);

  console.log(camel_word + '✅'.repeat(i + 1));
}
