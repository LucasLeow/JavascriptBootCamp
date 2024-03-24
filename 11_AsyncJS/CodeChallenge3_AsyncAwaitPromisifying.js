'use strict';

let newImg;

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    if (!imgPath) reject('No img URL provided');
    newImg = document.createElement('img');
    newImg.setAttribute('src', imgPath);
    newImg.addEventListener('load', () => {
      document
        .querySelector('.images')
        .insertAdjacentElement('afterbegin', newImg);
      resolve(newImg);
    });
  });
};

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

const loadNPause = async function () {
  try {
    newImg = await createImage(
      'https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s900-c-k-c0x00ffffff-no-rj'
    );
    console.log(newImg);
    await wait(2);
    newImg.style.display = 'none';
    newImg = await createImage(
      'https://raw.githubusercontent.com/HyunCafe/HyunCafe/main/assests/loficity.gif'
    );
    await wait(3);
    newImg.style.display = 'none';
  } catch (err) {
    console.error(err);
  }
};

loadNPause();

/*
Main Difference between Challenge 2 (.then() & .catch()) & Challenge 3 (async & await)
    - async & await code structure is more aligned with synchronous code & in a linear manner, making things clearer
*/
