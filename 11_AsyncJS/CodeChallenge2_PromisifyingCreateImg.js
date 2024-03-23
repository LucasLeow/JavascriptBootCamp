'use strict';

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    if (!imgPath) reject('No img URL provided');
    let newImg = document.createElement('img');
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
  .then(res => console.log('here', res))
  .catch(err => console.log(err));
