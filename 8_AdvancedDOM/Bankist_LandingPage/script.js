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

// --------------------------------------------------------------------------------------------------------------------------------------------
// Navbar fade animation
// --------------------------------------------------------------------------------------------------------------------------------------------
const handleFadeOver = function (ev, opacity, param3) {
  if (ev.target.classList.contains('nav__link')) {
    // matching strategy to check which child clicked
    const navLink = ev.target;
    const navLinks = navLink.closest('.nav').querySelectorAll('.nav__link');

    navLinks.forEach(link => {
      if (link !== navLink) link.style.opacity = `${opacity}`;
    });
  }
  const logo = nav.querySelector('img');
  logo.style.opacity = `${opacity}`;
};

// Event delegation for links in navbar, step 1 is to get parent
const nav = document.querySelector('.nav'); // parent element for links
nav.addEventListener('mouseover', ev => {
  handleFadeOver(ev, 0.5);
});

// To undo opacity
nav.addEventListener('mouseout', ev => {
  handleFadeOver(ev, 1);
});

// --------------------------------------------------------------------------------------------------------------------------------------------
// Sticky Navbar
// --------------------------------------------------------------------------------------------------------------------------------------------
const navHeight = nav.getBoundingClientRect().height;
const hdrObsOpt = {
  root: null, // null means entire viewport is observed
  threshold: 0, // when 0% of header is observed in viewport, perform callback
  rootMargin: `-${navHeight}px`, // begin 90px before threshold was reached. only accept px unit
};

const stickyNavCallBack = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNavCallBack, hdrObsOpt);
headerObserver.observe(header);

// --------------------------------------------------------------------------------------------------------------------------------------------
// Reveal element on mouse scroll
// --------------------------------------------------------------------------------------------------------------------------------------------
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target); // unobserve target element after performing desired action
};
const revealSectionOption = {
  root: null, // viewport as the reference element
  threshold: 0.15, // execute callback when intersection is 15% between viewport & sections
};

const sectionObserver = new IntersectionObserver( // init IntersectionObserver obj with callback & option
  revealSection,
  revealSectionOption
);

allSections.forEach(section => {
  // attach intersection observer to target elements
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
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
