'use strict';

const modalNode = document.querySelector('.modal');
const overlayNode = document.querySelector('.overlay');
const closeModalNode = document.querySelector('.close-modal');
const openModalNodes = document.querySelectorAll('.show-modal');

const toggleModals = () => {
  modalNode.classList.toggle('hidden');
  overlayNode.classList.toggle('hidden');
};

for (let i = 0; i < openModalNodes.length; i++) {
  openModalNodes[i].addEventListener('click', toggleModals);
}

closeModalNode.addEventListener('click', toggleModals);
overlayNode.addEventListener('click', toggleModals);
