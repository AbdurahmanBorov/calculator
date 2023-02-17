class Calculator {
    constructor(previousOperand, currentOperand) {
      this.previousOperandTextElement = previousOperand;
      this.currentOperandTextElement = currentOperand;
      this.clear();
    }
    changePercentToDecimal() {
        this.currentOperand = this.currentOperand / 100;
    }
    sqrt() {
        const current = parseFloat(this.currentOperand);
        if(isNaN(current)) return;
        if(current < 0) {
            return;
        } else {
            this.currentOperand = Math.sqrt(current);
            this.operation = undefined;
        }
        
    }

    negateNumber() {
        this.currentOperand *= -1;
    }

    clear() {
      this.currentOperand = '';
      this.previousOperand = '';
      this.operation = undefined;
    }
  
    backpace() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
  
    insertNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  
    insertOperation(operation) {
      if (this.currentOperand === '') return;
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }
  
    compute() {
      let computation;
      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(current)) return;
      switch (this.operation) {
        case '+':
          computation = prev + current;
          if(prev % 1 !== 0 && current % 1 !==0){
            const prevLength = (prev % 1).toString().length - 2;
            const currentLenth = (prev % 1).toString().length - 2;
            computation = computation.toFixed(Math.max(prevLength, currentLenth));
          }
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          if(prev % 1 !== 0 && current % 1 !==0){
            const prevLength = (prev % 1).toString().length - 2;
            const currentLenth = (prev % 1).toString().length - 2;
            computation = computation.toFixed(Math.max(prevLength - currentLenth));
          }
          break;
        case '/':
          computation = prev / current;
          break;
        case '^':
          computation = prev ** current;
          if(prev % 1 !== 0 && current % 1 !==0){
            const prevLength = (prev % 1).toString().length - 2;
            const currentLenth = (prev % 1).toString().length - 2;
            computation = computation.toFixed(Math.max(prevLength * currentLenth));
          }
          break;  
        default:
          return;
      }
      this.currentOperand = computation;
      this.operation = undefined;
      this.previousOperand = '';
    }
  
    getDisplayNumber(number) {
      const stringNumber = number.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];
      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand);
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
      } else {
        this.previousOperandTextElement.innerText = '';
      }
    }
}




const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

const clearButton = document.querySelector("[data-clear]");
const backpaceButton = document.querySelector("[data-backpace]");
const negationButton = document.querySelector("[data-negation]");
const sqrtButton = document.querySelector("[data-sqrt]");
const powButton = document.querySelector("[data-pow]");
const percentButton = document.querySelector("[data-percent]");
const operationButtons = document.querySelectorAll("[data-operator]");
const numberButtons = document.querySelectorAll("[data-number]");;
const equalsButton = document.querySelector("[data-equals]");

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)





clearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
})
backpaceButton.addEventListener('click', button => {
    calculator.backpace();
    calculator.updateDisplay();
})
negationButton.addEventListener('click', button => {
    calculator.negateNumber();
    calculator.updateDisplay();
})
sqrtButton.addEventListener('click', button => {
    calculator.sqrt();
    calculator.updateDisplay();
})
percentButton.addEventListener('click', button => {
    calculator.changePercentToDecimal();
    calculator.updateDisplay();
})
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertNumber(button.innerText);
        calculator.updateDisplay();
      })
})
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.insertOperation(button.innerText);
        calculator.updateDisplay();
      })
})
equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})