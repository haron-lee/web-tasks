const winningNums = document.querySelectorAll('.winning-number');
const bonusNum = document.querySelector('.bonus-number');
const $showResultButton = document.querySelector('.open-result-modal-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');
const $lottoNumbersToggleButton = document.querySelector(
  '.lotto-numbers-toggle-button'
);
const winningMoney = document.querySelectorAll('.winning-money');
const lottos = document.querySelectorAll('.lottos');

const onModalShow = () => {
  $modal.classList.add('open');
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

//TODO input에 숫자 하나만 적을 경우 경고창은 뜨지만 modal은 실행되는 거 막기
$showResultButton.addEventListener('click', () => {
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
      console.log('hello');
    }
  });
});
$modalClose.addEventListener('click', onModalClose);
