'use strict;';

const purchaseBox = document.querySelector('#purchase-box');
const completedBox = document.querySelector('#completed-box');
const purchase = purchaseBox.querySelector('#purchase');
const btnAuto = purchaseBox.querySelector('#btn-auto');
const toggle = document.querySelector('#toggle');
const toggleSpan = document.querySelector('#toggle-span');

const purchaseValue = purchase.value;

// purchase가 invalid가 아니면 !
// 이벤트 막고, 알림창 띄워주기!

const handleWarning = function (event) {
  //TODO 1000원 단위로 안넣었을시 input focus border color 바꾸기
  const warning = document.createElement('p');
  warning.classList.add('warning');
  warning.style.color = 'red';
  warning.innerText = '1000원 단위로 입력해주세요';
  if (
    !purchaseBox.nextElementSibling ||
    purchaseBox.nextElementSibling.nodeName !== 'P'
  ) {
    purchaseBox.after(warning);
  }

  purchase.classList.add('red');
};

//* random으로 Lotto 번호 생성 [1, 2, 3, 4, 5, 6]
const randomLotto = function () {
  let lotto = [];
  for (let i = 0; i < 6; i++) {
    lotto.push(Math.floor(Math.random() * 45) + 1);
  }
  lotto.sort((a, b) => a - b);
  return lotto;
};

//* 생성된 lotto 번호를 사용자가 입력한 금액의 개수 만큼 뽑기 (2차원배열)
const randomLottoSet = function (n) {
  return Array.from({ length: n }, () => randomLotto());
};

//* 로또 몇장이 필요한지 계산 후 장수 만큼의 배열의 로또를 div에 담아서 반응보기를 눌렀을 때 보여주기

const enterLotto = () => {
  // 12000 => 12장
  const purchaseNum = purchase.value / 1000;
  const lottoSet = randomLottoSet(purchaseNum);
  console.log(lottoSet);

  const lottoWrap = document.createElement('div');
  lottoWrap.classList.add('lottos-wrap');
  completedBox.appendChild(lottoWrap);

  for (let i = 0; i < lottoSet.length; i++) {
    const lottos = document.createElement('p');
    lottos.classList.add('lottos');
    lottos.innerText = lottoSet[i] + ' ';
    lottoWrap.appendChild(lottos);
    console.log(lottos);
  }
  lottoWrap.classList.add('none');
};

//* 번호보기 checked 역할
let flag = false;

purchase.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && purchase.value % 1000 !== 0) {
    event.preventDefault();
    handleWarning();
  } else if (event.key === 'Enter') {
    enterLotto();
  }
});

btnAuto.addEventListener('invalid', handleWarning);

btnAuto.addEventListener('click', (event) => {
  if (purchase.value % 1000 !== 0) {
    handleWarning();
  } else {
    // 1000으로 나눠질때만!
    const warning = document.querySelector('.warning');
    purchase.classList.remove('red');
    warning.remove();
    enterLotto();
  }
});

toggleSpan.addEventListener('click', (event) => {
  const lottoWrap = completedBox.querySelector('.lottos-wrap');
  flag = !flag;
  if (flag) {
    lottoWrap.classList.remove('none');
    lottoWrap.classList.add('block');
  } else {
    lottoWrap.classList.remove('block');
    lottoWrap.classList.add('none');
  }
});
