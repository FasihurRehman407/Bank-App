'use strict';
// DATA
const account1 = {
  owner: 'Fasih ur Rehman',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2021-07-15T23:36:17.929Z',
    '2021-07-16T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Muzammil Ahmad',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2021-07-11T18:49:59.371Z',
    '2021-07-14T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: 'Uzair Baig',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2021-07-14T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',

};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2, account3, account4];

//   Selecting elements
const reload = document.querySelector('.logo');
const login_btn = document.querySelector('.login_btn');
const login_user = document.querySelector('.login_user');
const login_pin = document.querySelector('.login_pin');
const current_date = document.querySelector('.date');
const current_balance = document.querySelector('.bal');
const transfer_to = document.querySelector('.transfer_to');
const transfer_amount = document.querySelector('.transfer_amount');
const loan_amount = document.querySelector('.loan_amount');
const close_user = document.querySelector('.close_user');
const close_pin = document.querySelector('.close_pin');
const transfer_btn = document.querySelector('.transfer_btn');
const loan_btn = document.querySelector('.loan_btn');
const close_btn = document.querySelector('.close_btn');
const sort_btn = document.querySelector('.sort_btn');
const sum_in = document.querySelector('.summary_value_in');
const sum_out = document.querySelector('.summary_value_out');
const sum_interest = document.querySelector('.summary_value_inter');
const logout_time = document.querySelector('.summary_label_log');
const in_label = document.querySelector('.summary_label_in');
const out_label = document.querySelector('.summary_label_out');
const inter_label = document.querySelector('.summary_label_inter');
const app = document.querySelector('.app');
const movements = document.querySelector('.movement_box');
const welcome = document.querySelector('.welcome');
const mov_value = document.querySelector('.movement_value');
const dark = document.querySelector('.dark');
const body = document.querySelector('body');
const move_date = document.querySelector('.movement_date');
const move_value = document.querySelector('.movement_value');
const balance_label = document.querySelector('.cur_label');
const balance_date = document.querySelector('.bal_date');
const logout_timer = document.querySelector('.timer');
const clock =document.querySelector('.clock');

let currentAcc,timer;
// Functions

let options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
};


const startLogOutTimer = function(){
  let time=300;
  const tick = () => {
    let min = String(Math.trunc(time/60)).padStart(2,0);
    let sec = String(time%60).padStart(2,0);
    logout_timer.textContent= `${min}:${sec}`
    if(time===0){
      clearInterval(timer)
      alert('Login expired!');
      hideUI();
    }
    time--;
  }
  tick();
  timer= setInterval(tick,1000)
  return timer;
}


const formatNum = function(acc,n){
  let option = {
    style : 'currency',
    currency: acc.currency,
  }
  return new Intl.NumberFormat(acc.locale,option).format(n)
}



const createDate = function (date, locale) {
  const daysPassed = function (date1, date2) {
    return Math.round(Math.abs(date2 - date1) / (1000 * 24 * 60 * 60));
  };
  const days = daysPassed(new Date(), date);
  if (days === 0) {
    return 'today';
  }
  if (days === 1) {
    return 'yesterday';
  }
  if (days <= 7) {
    return `${days}days ago`;
  }
  return new Intl.DateTimeFormat(locale).format(date);
};


const createUsernames = function (accs) {
  accs.forEach(acc => {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(cur => cur[0])
      .join('');
  });
};
createUsernames(accounts);

const displayMovements = function (acc, sorted = false) {
  movements.innerHTML = '';
  const movs = sorted
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;
  movs.forEach(function (mov, i) {
    const dates = new Date(acc.movementsDates[i])
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `<div class="row movement_row">
          <div class="col-2 movement_type movement_type_${type}">${
      i + 1
    }${type}</div>
          <div class="col-3 movement_date">${createDate(dates,acc.locale)}</div>
          <div class="col-6 offset-1 movement_value">${formatNum(currentAcc,mov)}</div>
          </div>`;
    movements.insertAdjacentHTML('afterbegin', html);
    [...document.querySelectorAll('.movement_row')].forEach(function (cur, i) {
      if (i % 2 === 0) {
        cur.style.backgroundColor = '#b0d4c9';
      } else {
        cur.style.backgroundColor = 'rgb(248, 232, 205)';
      }
    });
  });
};

const displayCurrentBalance = function (acc) {
  acc.current_Balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  current_balance.textContent = `${formatNum(currentAcc,acc.current_Balance)}`;
  return acc.current_Balance;
};

const displaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  sum_in.textContent = `${income.toFixed(2)}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + Math.abs(cur), 0);
  sum_out.textContent = `${out.toFixed(2)}€`;
  const interest = acc.movements
    .filter(mov => mov > 0)
    .reduce((accc, cur) => cur * (acc.interestRate / 100), 1);
  sum_interest.textContent = `${Math.trunc(interest).toFixed(2)}€`;
};

// update UI
const updateUI = function (acc) {
  displayMovements(acc);
  displayCurrentBalance(acc);
  displaySummary(acc);
};

// Hide UI
const hideUI = function () {
  app.style.opacity = 0;
  app.style.transition = 'all 0.8s';
  welcome.textContent= 'Login to get started'
  welcome.style.transition = 'all 0.8s'
};

// event handlers

// Check Credentials login button
login_btn.addEventListener('click', function (e) {
  e.preventDefault();
  currentAcc = accounts.find(acc => acc.userName === login_user.value);
  if (currentAcc?.pin === +login_pin.value) {
    app.style.opacity = 100;
    welcome.textContent = 'Login to get started';
    welcome.style.fontSize = '1.25rem';
    welcome.textContent = `Welcome Back! ${currentAcc.owner.split(' ')[0]}`;
  } else if (currentAcc?.pin != +login_pin.value) {
    welcome.textContent = `Wrong Credentials! :(`;
    welcome.style.fontSize = '2rem';
  }
  login_user.value = '';
  login_pin.value = '';
  login_pin.blur();
  const now = new Intl.DateTimeFormat(currentAcc.locale, options).format(
    new Date()
  );
  balance_date.textContent = `As of ${now}`;
  if(timer){
    clearInterval(timer)
  }
  timer = startLogOutTimer();

  updateUI(currentAcc);
});

// reload page
reload.addEventListener('click', function () {
  hideUI();
  clearInterval(timer);
});

// transfer button
transfer_btn.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +transfer_amount.value;
  const transTo = accounts.find(cur => cur.userName === transfer_to.value);
  if (
    transTo &&
    currentAcc.current_Balance >= amount &&
    login_user.value != transTo
  ) {
    transTo.movements.push(amount);
    transTo.movementsDates.push(new Date().toISOString());
    currentAcc.movements.push(-amount);
    currentAcc.movementsDates.push(new Date().toISOString())
  }
  transfer_to.value = '';
  transfer_amount.value = '';
  clearInterval(timer);
  timer = startLogOutTimer();
  updateUI(currentAcc);
});

// loan button
loan_btn.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Math.floor(loan_amount.value);
  loan_amount.value = '';
  loan_amount.blur();
  
  setTimeout(() => {
    if (loan > 0 && currentAcc.movements.some(mov => mov >= loan * 0.1)) {
      currentAcc.movements.push(loan);
      currentAcc.movementsDates.push(new Date().toISOString())
    }
    updateUI(currentAcc);
  } , 3000 )


 clearInterval(timer)
 timer =startLogOutTimer();


});

// close button
close_btn.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    close_user.value === currentAcc.userName &&
    +close_pin.value === currentAcc.pin
  ) {
    hideUI();
  }
  close_user.value = close_pin.value = '';
  close_user.blur();
  close_pin.blur();
  clearInterval(timer);
});

// Dark mode
let darkMode = 'light';
dark.addEventListener('click', function (e) {
  e.preventDefault();
  body.style.transition = 'all 0.5s';
  if (darkMode === 'light') {
    reload.src = 'img/icon.png';
    body.style.background = 'rgb(41, 41, 41)';
    dark.textContent = '🔆';
    dark.style.boxShadow = 'none';
    dark.style.color = 'white';
    welcome.style.color = 'white';
    balance_label.style.color = 'white';
    balance_date.style.color = 'white';
    current_balance.style.color = 'white';
    login_btn.style.color = 'white';
    logout_time.style.color = 'white';
    in_label.style.color = 'white';
    out_label.style.color = 'white';
    inter_label.style.color = 'white';
    sort_btn.style.color = 'white';
    logout_time.style.color = 'white';
    clock.style.color = 'white';
    clock.style.border = 'solid white';

    dark.blur();
    body.style.transition = 'all 0.5s';
    darkMode = 'dark';
  } else if (darkMode === 'dark') {
    reload.src = 'img/logo.png';
    body.style.background = 'rgb(240, 240, 240)';
    balance_label.style.color = 'black';
    balance_date.style.color = 'black';
    current_balance.style.color = 'black';
    login_btn.style.color = 'black';
    welcome.style.color = 'black';
    logout_time.style.color = 'white';
    in_label.style.color = 'black';
    out_label.style.color = 'black';
    inter_label.style.color = 'black';
    sort_btn.style.color = 'black';
    logout_time.style.color = 'black';
    dark.textContent = '🌙';
    clock.style.color = 'black';
    clock.style.border = 'solid black';
    body.style.transition = 'all 0.5s';
    darkMode = 'light';
  }
});

// sort button
let sorted = false;
sort_btn.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAcc, !sorted);
  sorted = !sorted;
});


// clock
  const myclock = function(){
    let tock=()=>{
      let timeInSec = Math.trunc(new Date().getTime()/1000);
      const date = new Intl.DateTimeFormat(navigator.language,{
        hour : 'numeric',
        minute: 'numeric'
        ,second: 'numeric'
      }).format();
      clock.textContent = date; 
      timeInSec--;
    }
    tock();
    setInterval(tock,1000)
}
myclock();