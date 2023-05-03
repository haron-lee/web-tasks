const display = document.querySelector('.display');
const numbers = document.querySelectorAll('.num');
const operators = document.querySelectorAll('.operator');
const clearButton = document.querySelector('#clear');
const enterButton = document.querySelector('#enter');
const operatorsArr = ['*', '/', '+', '-', '%'];

function clearDisplay() {
  display.innerText = '0';
}

// display.textContent에 저장된 수식을 문자열로 받아들이고, 이를 new Function() 생성자에 전달하여 새로운 함수를 생성. 이 함수를 실행하여 결과값을 계산하고, 계산된 결과값을 다시 display.textContent에 저장.
//* 계산하는 역할
function evaluateExpression() {
  const expression = display.textContent; // 7+7
  const result = new Function(`return ${expression}`)(); // eval
  display.textContent = result;
}

function handleClick(event) {
  const target = event.target;
  const buttonValue = target.textContent;
  const displayValue = display.textContent;
  const last = displayValue.charAt(displayValue.length - 1);

  if (target.matches('.num')) {
    // num일 경우
    if (displayValue === '0') {
      // display 텍스트가 0이면 button의 숫자를 입력
      display.textContent = buttonValue;
    } else {
      // 그게 아니면 display의 text와 button의 텍스트를 이어붙이기
      display.textContent = displayValue + buttonValue;
    }
  } else if (target.matches('.operator')) {
    if (displayValue === '0') {
      return;
    }
    display.textContent = displayValue + ' ' + buttonValue + ' ';
  } else if (target === clearButton) {
    clearDisplay();
  } else if (target === enterButton) {
    evaluateExpression();
  }
}

numbers.forEach((button) => {
  button.addEventListener('click', handleClick);
});

operators.forEach((button) => {
  button.addEventListener('click', handleClick);
});

clearButton.addEventListener('click', handleClick);
enterButton.addEventListener('click', handleClick);

// TODO
// 숫자 빠져나가는 거 제한하기

// 연산자 중복처리.
// '.' 버튼과 연산자 버튼이 중복 입력되는 부분 수정
//  숫자 -> 연산자 -> 0 중복처리.
// 연산 중에는 숫자 제일 앞에 0이 입력되는 부분

// 천단위 콤마처리.
// '0'인 상태에서 '.'을 눌렀을 때 '.'으로만 표시되는 부분을 '0.'으로 표시되도록 수정 (. 따로 처리)
