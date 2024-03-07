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

// --------------------------------------------------------------------------------------------------------------------------------------------
// Lazy loading images while scrolling
// --------------------------------------------------------------------------------------------------------------------------------------------
const imgTargets = document.querySelectorAll('img[data-src]'); // using css attribute selector

const loadImage = function (entries, observer) {
  const [entry] = entries; // destructure entry obj, holding on to required info of target element

  if (!entry.isIntersecting) return; // guard clause to not do anything if not intersecting

  entry.target.src = entry.target.dataset.src; // if viewport intersect img, change low res img src to high res img src

  // if add class remove outside eventlistener, high resolution img may not load finish but blur effect already removed
  // therefore, best to only remove blur effect after img loaded (using event listener)
  entry.target.addEventListener('load', function (ev) {
    // 'load' event called when img finished loading
    entry.target.classList.remove('lazy-img'); // lazy-img is class that cause blur effect
  });

  observer.unobserve(entry.target); // unobserve target img element after performing action
};

const imgObserverOptions = {
  root: null, // reference element is the viewport
  threshold: 0, // the moment viewport touches img, will execute callback
  rootMargin: '200px', // perform action 200px before intersection (i.e load image before user even scroll till image)
};

const imgObserver = new IntersectionObserver(loadImage, imgObserverOptions);

imgTargets.forEach(img => imgObserver.observe(img)); // target element is all imges with data-src attribute

// --------------------------------------------------------------------------------------------------------------------------------------------
// carousell (tab-sliders)
// --------------------------------------------------------------------------------------------------------------------------------------------
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');

const tabBtnLeft = document.querySelector('.slider__btn--left');
const tabBtnRight = document.querySelector('.slider__btn--right');

const dotsContainer = document.querySelector('.dots'); // to select <div class='dots'></div>

let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, idx) {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${idx}"></button>`
    );
  });
};

const activeDots = function (slide_num) {
  // to show which active dot is selected
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active')); // first make all dots inactive

  document
    .querySelector(`.dots__dot[data-slide="${slide_num}"]`)
    .classList.add('dots__dot--active');
};

const goToSlide = function (slide_num) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${(i - slide_num) * 100}%)`)
  );
  activeDots(slide_num);
};

const nextSlide = function () {
  if (curSlide === maxSlide - 1) return;
  curSlide++;
  goToSlide(curSlide);
  activeDots(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) return;
  curSlide--;
  goToSlide(curSlide);
  activeDots(curSlide);
};

const initTabSlider = function () {
  createDots();
  slider.style.overflow = 'visible'; // hidden or visible choice
  goToSlide(0); // initial position for all tabs
  activeDots(0); // activate dots for initial tab
};

initTabSlider();

tabBtnRight.addEventListener('click', function () {
  nextSlide();
});

tabBtnLeft.addEventListener('click', function () {
  prevSlide();
});

document.addEventListener('keydown', function (ev) {
  console.log(ev.key);
  console.log(curSlide);
  if (ev.key === 'ArrowLeft') prevSlide();
  if (ev.key === 'ArrowRight') nextSlide();
});

dotsContainer.addEventListener('click', function (ev) {
  if (ev.target.classList.contains('dots__dot')) {
    const slide_num = ev.target.dataset.slide;
    goToSlide(slide_num);
  }
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
