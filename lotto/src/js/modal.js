'use strict';

import { lottosList } from './index.js';

const winningNums = document.querySelectorAll('.winning-number');
const bonusNum = document.querySelector('.bonus-number');
const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);

// wins
const win5 = document.querySelector('.win5');
const win4 = document.querySelector('.win4');
const win3 = document.querySelector('.win3');
const win2 = document.querySelector('.win2');
const win1 = document.querySelector('.win1');
// const win = [win5, win4, win3, win2, win1];
let countThree = 0;
let countFour = 0;
let countFive = 0;
let countSix = 0;
let countSeven = 0;

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

//TODO input에 숫자 하나만 적을 경우 경고창은 뜨지만 modal은 실행되는 거 막기
$showResultButton.addEventListener('click', () => {
  let count = 0;

  winningNums.forEach((winningNum) => {
    if (
      winningNum.value === '' ||
      Number(winningNum.value) <= 0 ||
      Number(winningNum.value) > 45
    ) {
      alert('올바른 생성 번호가 아닙니다!');
      e.preventDefault();
    } else {
      onModalShow();
    }
  });

  console.log(lottosList);
  for (let i = 0; i < lottosList.length; i++) {
    for (let j = 0; j < 6; j++) {
      if (lottosList[i][j] === winningNums[j]) {
        count++;
      }
    }
  }

  console.log(count);
  if (count === 3) {
    console.log('3개');
  }
});
$modalClose.addEventListener('click', onModalClose);
