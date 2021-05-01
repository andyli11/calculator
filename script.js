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
        this.previousOperand = `${this.currentOperand} ${operand}`;
        this.currentOperand = '';
    }

    compute(){
        let co
    }

    updateOutput(){
        this.previousOperandTextNode.textContent = this.previousOperand;
        this.currentOperandTextNode.textContent = this.currentOperand;
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
    updateOutput();
});

