// GLOBAL VARIABLES
const smallButtons = document.querySelectorAll(".small button");
const display = document.getElementById("display");
const equal = document.querySelector(".equal");
const del = document.getElementById("del");
//let displayValue;
let inputValue = "";
let operatorValue = "";
let inputValue2 = "";
let result = "";
let result2 = ""; //żeby rozróżnić wyniki po kliknięciu = od innych operatorów
let resultToBe = "";

//BASIC MATH OPERATORS
let add = function(a, b) {
  return a + b;
}

let subtract = function(a, b) {
  return a - b;
}

let multiply = function(a, b) {
  return a * b;
}

let divide = function(a, b) {
  return a / b;
}
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
    else if (operator == "*") {
      result = multiply(a, b);
    }
    else if (operator == "/") {
      result = divide(a, b);
    }
    display.textContent = result;
}


//DISPLAY function

smallButtons.forEach(function(button) {
  button.addEventListener("click", () => {

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
          display.textContent = inputValue
          result2 = ""; // to delete the temporary variable if someone press = and new input number right after (doesnt want to continue with result of his previous action)
          console.log(inputValue);
        }
    }

//if we got first input and operator, we would get second input if user will press numbers
    else {
      if (button.className == "number") {
        inputValue2 += button.innerText;
        display.textContent = inputValue + " " + operatorValue + " " + inputValue2;
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
//zaokrąglić wyniki do 10 miejsc po ,
//wprowdzic ograniczenie kropki do 1
//wygląd
