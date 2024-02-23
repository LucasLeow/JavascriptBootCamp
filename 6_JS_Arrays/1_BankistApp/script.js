'use strict';
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// BANKIST APP
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//========================================================================
// Data
//========================================================================
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

//========================================================================
// HTML Elements
//========================================================================
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

//========================================================================
// Creating Usernames for each user
//========================================================================
const createUsernames = function (accounts) {
  accounts.forEach(acc => {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map((str, idx) => str[0])
      .join('');
  });
};

createUsernames(accounts);

//========================================================================
// Display Methods (used in event listener)
//========================================================================

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

const calcDisplaySummary = function (movements, usr_interest) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((sum, mov) => sum + mov, 0);

  const withdrawals = Math.abs(
    movements.filter(mov => mov < 0).reduce((sum, mov) => sum + mov, 0)
  );

  const interest = movements
    .filter(mov => mov > 0)
    .reduce(
      (interest_accum, mov) => interest_accum + mov * (usr_interest / 100),
      0
    );

  labelSumIn.textContent = `$${incomes}`;
  labelSumOut.textContent = `$${withdrawals}`;
  labelSumInterest.textContent = `$${interest}`;
};

const calcPrintBalance = function (movements) {
  labelBalance.textContent = '';

  let balance = movements.reduce(function (accum, mov) {
    return accum + mov;
  }, 0);

  labelBalance.textContent = `$${balance}`;
};

let currentAccount;
let authenticated;

//========================================================================
// Helper Functions
//========================================================================
const updateUI = function (balance_arr, interest = null) {
  displayMovements(balance_arr);
  calcPrintBalance(balance_arr);
  calcDisplaySummary(balance_arr, interest);
};

//========================================================================
// Event Listeners
//========================================================================
btnLogin.addEventListener('click', function (ev) {
  ev.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );

  if (currentAccount) {
    if (Number(inputLoginPin.value) === currentAccount.pin) {
      containerApp.style.opacity = '.9';
      labelWelcome.textContent = `Welcome Back, ${
        currentAccount.owner.split(' ')[0]
      }`;
      updateUI(currentAccount.movements, currentAccount.interestRate);
      inputLoginUsername.value = inputLoginPin.value = '';
      inputLoginPin.blur();
    } else alert('Incorrect password');
  } else {
    alert('Account not found');
  }
});

btnTransfer.addEventListener('click', function (ev) {
  ev.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => inputTransferTo.value === acc.username
  );
  if (receiverAcc && receiverAcc.username != currentAccount.username) {
    let currentBal = currentAccount.movements.reduce(
      (sum, val) => sum + val,
      0
    );

    if (currentBal - amount < 0) {
      alert('Insufficient balance to transfer');
    } else if (amount < 0) {
      alert('Invalid amount input, please try again');
    } else {
      currentAccount.movements.push(-1 * amount);
      receiverAcc.movements.push(amount);
      updateUI(currentAccount.movements, currentAccount.interestRate);

      inputTransferAmount.value = inputTransferTo.value = '';
      alert('Amount transferred successfully');
    }
  } else {
    alert('Invalid target user. Please try again');
    inputTransferAmount.value = inputTransferTo.value = '';
  }
});

btnClose.addEventListener('click', function (ev) {
  ev.preventDefault();
  const user_confirm = inputCloseUsername.value;
  const user_pin_confirm = Number(inputClosePin.value);
  if (
    user_confirm === currentAccount.username &&
    user_pin_confirm === currentAccount.pin
  ) {
    const index_to_delete = accounts.findIndex(
      acc => acc.username === user_confirm
    );
    accounts.splice(index_to_delete, 1);
    containerApp.style.opacity = 0;
    alert('Account deleted');
    inputCloseUsername.value = inputClosePin.value = '';
  } else {
    alert('Invalid user or password. Please try again');
    inputCloseUsername.value = inputClosePin.value = '';
  }
});

btnLoan.addEventListener('click', function (ev) {
  ev.preventDefault();
  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(val => val >= amount * 0.1)) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount.movements, currentAccount.interestRate);
  } else {
    alert('invalid amount or insufficient deposit.');
  }
  inputLoanAmount.value = '';
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//========================================================================
// Lecture Practices
//========================================================================
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// const movementsDescriptions = movements.map((val, idx) => {
//   return val > 0
//     ? `Movement ${idx + 1}: You deposited ${val}`
//     : `Movement ${idx + 1}: You withdrew ${Math.abs(val)}`;
// });

// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });

const accountMovements = accounts.map(acc => acc.movements).flat();
let totalBalance = accountMovements.reduce((sum, val) => sum + val, 0);
console.log(totalBalance);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
