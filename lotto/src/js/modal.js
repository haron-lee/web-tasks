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
const win5 = document.querySelector('.win-5');
const win4 = document.querySelector('.win-4');
const win3 = document.querySelector('.win-3');
const win2 = document.querySelector('.win-2');
const win1 = document.querySelector('.win-1');
// const win = [win5, win4, win3, win2, win1];
let countThree = 0;
let countFour = 0;
let countFive = 0;
let countSix = 0;
let countAll = 0;

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

//TODO input에 숫자 하나만 적을 경우 경고창은 뜨지만 modal은 실행되는 거 막기
$showResultButton.addEventListener('click', () => {
  let winningNumsArr = [];

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
    winningNumsArr.push(Number(winningNum.value));
  });

  for (let i = 0; i < lottosList.length; i++) {
    let matchedNums = lottosList[i].filter((num) =>
      winningNumsArr.includes(num)
    );
    if (matchedNums.length === 6) {
      countAll++;
    } else if (
      matchedNums.length === 5 &&
      lottosList[i].includes(parseInt(bonusNum.value))
    ) {
      countSix++;
    } else if (matchedNums.length === 5) {
      countFive++;
    } else if (matchedNums.length === 4) {
      countFour++;
    } else if (matchedNums.length === 3) {
      countThree++;
    }
  }

  //* count의 맞은 숫자가
  console.log(
    '맞은 숫자',
    countAll,
    countSix,
    countFive,
    countFour,
    countThree
  );
  win5.innerText = `${countThree}개`;
  win4.innerText = `${countFour}개`;
  win3.innerText = `${countFive}개`;
  win2.innerText = `${countSix}개`;
  win1.innerText = `${countAll}개`;
});
$modalClose.addEventListener('click', onModalClose);
