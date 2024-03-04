'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (ev) {
  ev.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//--------------------------------------------------------------------------------------------------------------------------------------------
// Cookie footer using JS
// --------------------------------------------------------------------------------------------------------------------------------------------
const header = document.querySelector('.header');

const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>`;
header.append(message);

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', () => message.remove());

// Working with styles using JS
console.log(getComputedStyle(message));

message.style.backgroundColor = '#37383d';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + 'px';

// --------------------------------------------------------------------------------------------------------------------------------------------
// Smooth Scrolling
// --------------------------------------------------------------------------------------------------------------------------------------------
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', ev => {
  const section1Coords = section1.getBoundingClientRect();

  window.scrollTo({
    left: section1Coords.left + window.pageXOffset,
    top: section1Coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// Page navigation (Smooth Scrolling) using Event delegation
// --------------------------------------------------------------------------------------------------------------------------------------------
document.querySelector('.nav__links').addEventListener('click', function (ev) {
  ev.preventDefault();
  console.log(ev.target);
  if (ev.target.classList.contains('nav__link')) {
    const id = ev.target.getAttribute('href');
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// Tabbed Components using vanilla JS
// --------------------------------------------------------------------------------------------------------------------------------------------
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const operations_content = document.querySelectorAll('.operations__content');

// Event delegation, step 1: assign to parent
tabsContainer.addEventListener('click', ev => {
  const clicked = ev.target.closest('.operations__tab'); // step 2, match strategy to identify child
  if (!clicked) return; // anywhere else within container that is not on the buttons

  // if clicked, remove existing tab content to make way for new tab content
  tabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  operations_content.forEach(content =>
    content.classList.remove('operations__content--active')
  );

  // Activate content area that was clicked
  clicked.classList.add('operations__tab--active');
  document
    .querySelector(`.operations__content--${clicked.getAttribute('data-tab')}`)
    .classList.add('operations__content--active');
});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Lecture practice
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener(
//   'click',
//   function (ev) {
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );

// document.querySelector('.nav__links').addEventListener(
//   'click',
//   function (ev) {
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );

// document.querySelector('.nav').addEventListener(
//   'click',
//   function (ev) {
//     this.style.backgroundColor = randomColor();
//   },
//   true
// );
