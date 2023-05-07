const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const enterButton = document.querySelector('#enter');
const operatorsArr = ['*', '/', '+', '-', '%'];

function clearDisplay() {
  display.innerText = '0';
}

//* 계산하는 역할
function evaluateExpression() {
  const expression = display.textContent;
  const result = new Function(`return ${expression}`)();
  display.textContent = result;
}

function handleClick(event) {
  const target = event.target;

  if (target === clearButton) {
    clearDisplay();
  } else if (target === enterButton) {
    evaluateExpression();
  }
}

numbers.forEach((num) => {
  num.addEventListener('click', (event) => {
    const displayValue = display.textContent;
    const target = event.target;
    const last = display.textContent.charAt(display.textContent.length - 1);

    if (target.textContent === '.' && displayValue.includes('.')) {
      // 이미 소수점이 있는 경우
      return; // 더 이상 추가하지 않음
    } else if (target.textContent === '.' && displayValue === '0') {
      display.textContent = '0' + target.textContent;
    } else if (displayValue === '0') {
      display.textContent = target.textContent;
    } else {
      display.textContent = display.textContent + target.textContent;
    }
  });
});

operators.forEach((operator) => {
  operator.addEventListener('click', (event) => {
    const target = event.target;
    const displayValue = display.textContent;
    const last = display.textContent.charAt(display.textContent.length - 1);

    if (operatorsArr.includes(last)) {
      return;
    }
    display.textContent = displayValue + target.textContent;
  });
});

clearButton.addEventListener('click', handleClick);
enterButton.addEventListener('click', handleClick);

// TODO
// 숫자 빠져나가는 거 제한하기

// 연산 중에는 숫자 제일 앞에 0이 입력되는 부분

// 천단위 콤마처리.
