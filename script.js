'use strict';


// Define Calculator Object!
class Calculator{
    constructor(previousOperandTextNode, currentOperandTextNode){
        this.previousOperandTextNode = previousOperandTextNode;
        this.currentOperandTextNode = currentOperandTextNode;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        console.log(typeof(this.currentOperand));
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand += number;
    }

    selectOperation(operand){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== ''){
            this.compute();
        }
        this.operand = operand;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operand){
            case '+': 
                computation = prev + current; break;
            case '-': 
                computation = prev - current; break;
            case '*':
                computation = prev * current; break;
            case '÷': 
                computation = prev / current; break;
            case '^':
                computation = prev**current; break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.operand = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const splitNumber = stringNumber.split('.');
        const integerDigits = parseFloat(splitNumber[0]);
        const decimalDigits = splitNumber[1];
        let integerOutput;
        if(isNaN(integerDigits)){
            integerOutput = '';
        }else{
            integerOutput = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits != null){
            return `${integerOutput}.${decimalDigits}`;
        }
        return integerOutput;
    }

    updateOutput(){
        if(this.operand != null){
            this.previousOperandTextNode.textContent = `${this.getDisplayNumber(this.previousOperand)} ${this.operand}`;
        }else{
            this.previousOperandTextNode.textContent = '';
        }
        this.currentOperandTextNode.textContent = this.getDisplayNumber(this.currentOperand);
    }
}


// Create Element Variables!
const numberButtons = document.querySelectorAll('[data-number]');

const operationButtons = document.querySelectorAll('[data-operation]');

const equalsButton = document.querySelector('[data-equals]');

const deleteButton = document.querySelector('[data-delete]');

const allClearButton = document.querySelector('[data-all-clear]');

const previousOperandTextNode = document.querySelector('[data-previous-operand]');

const currentOperandTextNode = document.querySelector('[data-current-operand]');


// Initialize Calculator Object!
const calculator = new Calculator(previousOperandTextNode, currentOperandTextNode);


// Event Listeners! 
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.textContent);
        calculator.updateOutput();
    }, false)
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.selectOperation(button.textContent);
        calculator.updateOutput();
    }, false)
});

equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateOutput();
});

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateOutput();
});

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateOutput();
});

