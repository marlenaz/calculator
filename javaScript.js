// GLOBAL VARIABLES
const smallButtons = document.querySelectorAll(".small button");
const display = document.getElementById("display");
const equal = document.querySelector(".equal");
const del = document.getElementById("del");
const decimal = document.getElementById("decimal");
const backspace = document.getElementById("backspace");
//let displayValue;
let inputValue = "";
let operatorValue = "";
let inputValue2 = "";
let result = "";
let result2 = ""; //żeby rozróżnić wyniki po kliknięciu = od innych operatorów
let resultToBe = "";
let displayValue;

//BASIC MATH OPERATORS
let add = function(a, b) {
  return a + b;
};

let subtract = function(a, b) {
  return a - b;
};

let multiply = function(a, b) {
  return a * b;
};

let divide = function(a, b) {
  return a / b;
};
//Main count function
let operate = function(a, b, operator) {

    a = Number(inputValue);
    operator = operatorValue;
    b = Number(inputValue2);
    if (operator == "+") {
      result = add(a, b);
    }
    else if (operator == "-") {
      result = subtract(a, b);
    }
    else if (operator == "×") {
      result = multiply(a, b);
    }
    else if (operator == "÷") {
      result = divide(a, b);
    }
    result = Math.round(result * 1000000) / 1000000;
    display.textContent = result;
};

//BULLET BUTTON ENABLE/DISABLE
var decimalDisable = function(string) {
  let dot1 = string.indexOf(".");

  if (dot1 > 0 ) {
    decimal.disabled = true;
  }
};

//DISPLAY function

smallButtons.forEach(function(button) {
  button.addEventListener("click", () => {

    decimal.disabled = false; //to unable the disabled decimal point
//
    if (result2 != "" && button.className == "operator") {
        inputValue = result;
        operatorValue = button.innerText;
        display.textContent = result + " " + operatorValue;
        result2 = "";
        console.log(operatorValue);
    }

//if there is no first values entered it gives the values of input and operator
    else if (inputValue === "" || operatorValue === "") {
      if (button.className == "operator") {
          operatorValue = button.innerText;
          display.textContent = inputValue + " " + operatorValue;
          console.log(operatorValue);
        }
        else if (button.className == "number") {
          inputValue += button.innerText;
          display.textContent = inputValue;
          result2 = ""; // to delete the temporary variable if someone press = and new input number right after (doesnt want to continue with result of his previous action)
          decimalDisable(inputValue); //to make sure there is only one decimal point
          console.log(inputValue);
        }
    }

//if we got first input and operator, we would get second input if user will press numbers
    else {
      if (button.className == "number") {
        inputValue2 += button.innerText;
        display.textContent = inputValue + " " + operatorValue + " " + inputValue2;
        decimalDisable(inputValue2);
        console.log(inputValue2);
      }
      //if he will press operator and we got inp1 inp2 and operator - this action will perform operate() and will give a resut and next operator. Clicking numbers next results with new inputValue2
      else if (button.className == "operator") {
        resultToBe = operate();
        display.textContent = result + " " + button.innerText;
        inputValue = result;
        operatorValue = button.innerText;
        inputValue2 = "";
      }
    }
  })
});

equal.addEventListener("click", () => {
  resultToBe = operate();
  result2 = result;
  inputValue = "";
  operatorValue = "";
  inputValue2 = "";
});

del.addEventListener("click", () => {
  inputValue = "";
  operatorValue = "";
  inputValue2 = "";
  result = "";
  result2 = "";
  resultToBe = "";
  display.textContent = "";
});

backspace.addEventListener("click", () => {
  displayValue = display.firstChild.data;
  let iV2find = displayValue.split(" ").findIndex((element) => element == inputValue2);
  let oVfind = displayValue.split(" ").findIndex((element) => element == operatorValue);
  let iVfind = displayValue.split(" ").findIndex((element) => element == inputValue);

  let toDelete =Math.max(iV2find, oVfind, iVfind);

  if (iV2find === toDelete) {
    inputValue2 = inputValue2.split("").slice(0, inputValue2.length - 1).join("");
    displayValue = displayValue.split("").slice(0, displayValue.length - 1).join("");
    display.textContent = displayValue;
  }
  else if (oVfind === toDelete) {
    operatorValue = "";
    displayValue = displayValue.split("").slice(0, displayValue.length - 1).join("");
    display.textContent = displayValue;
  }
  else if (iVfind === toDelete) {
    inputValue = inputValue.split("").slice(0, inputValue.length - 1).join("");
    displayValue = displayValue.split("").slice(0, displayValue.length - 1).join("");
    display.textContent = displayValue;
  }

});
