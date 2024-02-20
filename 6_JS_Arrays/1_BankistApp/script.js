'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach(function (mov, i) {
    const transact_type = mov > 0 ? 'deposit' : 'withdrawal';

    const mov_string = `<div class="movements__row">
    <div class="movements__type movements__type--${transact_type}">${
      i + 1
    } ${transact_type}</div>
    <div class="movements__value">${mov}$</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', mov_string);
  });
};

const createUsernames = function (accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((str, idx) => str[0])
      .join('');
  });
};

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);

  const withdrawals = Math.abs(
    movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov, 0)
  );

  const interest = movements
    .filter(mov => mov > 0)
    .reduce((interest_accum, mov) => interest_accum + mov * 0.012, 0);

  labelSumIn.textContent = `$${incomes}`;
  labelSumOut.textContent = `$${withdrawals}`;
  labelSumInterest.textContent = `${interest}`;
};

const calcPrintBalance = function (movements) {
  labelBalance.textContent = '';

  let balance = movements.reduce(function (accum, mov) {
    return accum + mov;
  }, 0);

  labelBalance.textContent = `$${balance}`;
};
displayMovements(account1.movements);
calcPrintBalance(account1.movements);
calcDisplaySummary(account1.movements);
createUsernames(accounts);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const movementsDescriptions = movements.map((val, idx) => {
  return val > 0
    ? `Movement ${idx + 1}: You deposited ${val}`
    : `Movement ${idx + 1}: You withdrew ${Math.abs(val)}`;
});

const withdrawals = movements.filter(function (mov) {
  return mov < 0;
});

/////////////////////////////////////////////////
