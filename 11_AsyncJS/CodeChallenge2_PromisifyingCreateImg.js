'use strict';
let newImg;

const wait = function (seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
};

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

createImage(
  'https://yt3.googleusercontent.com/ytc/AIdro_k2wsQa2j9sAhjS25DyZxrhAGDJWtNZBYcLVd3uqQ=s900-c-k-c0x00ffffff-no-rj'
)
  .then(imgNode => console.log(imgNode))
  .catch(err => console.log(err));

wait(3)
  .then(() => {
    newImg.style.display = 'none';
    return createImage(
      'https://raw.githubusercontent.com/HyunCafe/HyunCafe/main/assests/loficity.gif'
    );
  })
  .then(imgNode => {
    return wait(3);
  })
  .then(() => {
    newImg.style.display = 'none';
  });
