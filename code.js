const result = document.querySelector(".result-box");
const memory = document.querySelector(".memory");
const btns = document.querySelectorAll(".calc-number");
const zero = document.querySelector(".calc-btn-zero");
const operators = document.querySelectorAll(".calc-operator");
const equal = document.querySelector(".equal");
const clear = document.querySelector(".clear");
const comma = document.querySelector(".comma");
const mod = document.querySelector(".mod");
const pORm = document.querySelector(".pORm");
const backspace = document.querySelector(".backspace");
let displayResult = null;
let operatorMark = null;
let memoryResult = null;
result.textContent = "";

let btnF = true;
btns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btnF === true) {
      if (result.textContent != "ERROR") {
        if (result.textContent.length < 12) {
          result.append(btn.textContent);
        }
      }
    }
  });
});

let zeroF = true;
zero.addEventListener("click", () => {
  if (zeroF === true) {
    if (result.textContent.length < 10) {
      if (result.textContent != "") {
        if (result.textContent != null) {
          if (result.textContent != "ERROR") {
            result.append(zero.textContent);
          }
        }
      }
    }
  }
});

let j = 0;
let previousOperatorMark = null;
operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    if (result.textContent != "ERROR") {
      if (j == 0) {
        memory.textContent = result.textContent;
        operatorMark = operator.textContent;
        memoryResult = memory.textContent;
        j++;
      } else {
        operatorMark = operator.textContent;
        displayResult = result.textContent;
        memory.textContent = "";
        switch (previousOperatorMark) {
          case "+":
            memoryResult = +memoryResult + +displayResult;
            break;
          case "-":
            memoryResult = memoryResult - displayResult;
            break;
          case "×":
            memoryResult = memoryResult * displayResult;
            break;
          case "÷":
            memoryResult = memoryResult / displayResult;
            break;
        }
        memory.append(memoryResult);
      }
      error();
      onBackSpace();
      btnF = true;
      zeroF = true;
      commaF = true;
      memory.append(operatorMark);
      previousOperatorMark = operatorMark;
      result.textContent = "";
    }
  });
});

equal.addEventListener("click", () => {
  displayResult = result.textContent;
  switch (operatorMark) {
    case "+":
      result.textContent = +memoryResult + +displayResult;
      memory.append(displayResult);
      break;
    case "-":
      result.textContent = memoryResult - displayResult;
      memory.append(displayResult);
      break;
    case "×":
      result.textContent = memoryResult * displayResult;
      memory.append(displayResult);
      break;
    case "÷":
      result.textContent = memoryResult / displayResult;
      memory.append(displayResult);
      break;
  }
  error();
  if (result.textContent.length > 10) {
    result.textContent = Math.floor(result.textContent * 10000) / 10000;
    result.style.fontSize = "32px";
  }
  displayResult = null;
  memoryResult = result.textContent;
  operatorMark = null;
  previousOperatorMark = null;
  stopBackSpase();
  btnF = false;
  zeroF = false;
  commaF = false;
});

mod.addEventListener("click", () => {
  if (result.textContent != "ERROR") {
    switch (operatorMark) {
      case "+":
        memory.textContent = +memoryResult + +result.textContent;
        result.textContent = memory.textContent / 100 + "%";
        break;
      case "-":
        memory.textContent = memoryResult - result.textContent;
        result.textContent = memory.textContent / 100 + "%";
        break;
      case "×":
        memory.textContent = memoryResult * result.textContent;
        result.textContent = memory.textContent / 100 + "%";
        break;
      case "÷":
        memory.textContent = memoryResult / result.textContent;
        result.textContent = memory.textContent / 100 + "%";
        break;
      default:
        result.textContent = result.textContent / 100 + "%";
    }
  }
});

pORm.addEventListener("click", () => {
  if (result.textContent != "ERROR") {
    result.textContent *= -1;
  }
});

let commaF = true;
comma.addEventListener("click", () => {
  if (commaF === true) {
    if (result.textContent.includes(".") == false) {
      result.append(".");
    }
  }
});

function backspaceF() {
  let x = result.textContent.length - 1;
  result.textContent = result.textContent.slice(0, x);
}
function onBackSpace() {
  backspace.addEventListener("click", backspaceF);
}
function stopBackSpase() {
  backspace.removeEventListener("click", backspaceF);
}

onBackSpace();

clear.addEventListener("click", () => {
  result.textContent = "";
  memory.textContent = "";
  displayResult = "";
  operatorMark = "";
  memoryResult = "";
  i = 0;
  j = 0;
  onBackSpace();
  btnF = true;
  zeroF = true;
  commaF = true;
  result.style.fontSize = "45px";
});

const error = function () {
  if (
    result.textContent.includes("Infinity") == true ||
    result.textContent.includes("NaN") == true
  ) {
    result.textContent = "ERROR";
  }
  if (
    memory.textContent.includes("Infinity") == true ||
    memory.textContent.includes("NaN") == true
  ) {
    memory.textContent = "ERROR";
  }
};
