const btns = document.querySelectorAll('.key');
const firstDisp = document.getElementById('display');
const secondDisp = document.getElementById('small-display');

class Calc {
    constructor(keys, display, smallDisplay,) {
        this.keys = keys;
        this.display = display;
        this.smallDisplay = smallDisplay;

        this.display.disabled = true; //disable direct keyboard input
        this.smallDisplay.disabled = true;
        this.display.value = '0';
        this.result = '';
        this.displayInput = '0';
        this.lastKeyPressed = undefined;
        this.inputNums = [];
        this.inputOperators = [];

        for (let key of this.keys) {
            key.addEventListener('click', (e) => {
                this.processKey(e.target.innerText);
            }
            )
        }

        window.addEventListener('keydown', this.onKeyPress)
    }

    onKeyPress = (e) => {
        // console.log(e.key);
        if ('0123456789./*-+='.includes(e.key)) {
            this.processKey(e.key);
        } else if (e.key === 'Backspace') {
            this.processKey('←');
        } else if (e.key === 'Enter') {
            this.processKey('=');
        }
        return
    }
    processKey = (keyPressed) => {
        if (//(!lastKeyPressed && '+-*/='.includes(keyPressed)) || first key input can't be operator.  
            (keyPressed === '.' && this.display.value.includes('.')) && this.displayInput.includes('.') || //ignore 2nd dot in number unless right after result
            (keyPressed === '←' && '+-*/='.includes(this.lastKeyPressed))) //ignore ← key after operator
        {
            return
        } else if (keyPressed === 'C') {
            this.initCalc();
            return
        } else if ('+-*/='.includes(this.lastKeyPressed) && '+-*/='.includes(keyPressed)) {//only last operator is recorded if multiple operators pressed  in a row. Same applies if after pressing =, then press an operator to use the result as operand) 
            this.inputOperators.pop();
            this.inputOperators.push(keyPressed);
            this.lastKeyPressed = keyPressed;
            this.updateSmallDisp();
            return
        } else if (this.lastKeyPressed === '=' && !'+-*/='.includes(keyPressed)) { //clear arrays if user input new num after last result)
            this.inputNums.splice(0, this.inputNums.length);
            this.inputOperators.splice(0, this.inputOperators.length);
            this.result = '';
        }
        this.lastKeyPressed = keyPressed;

        if (!'+-*/='.includes(keyPressed)) {
            this.populateNum(keyPressed);
        } else if (this.inputOperators.length >= 1) {
            this.storeInput(keyPressed);
            this.doMath();
            this.updateSmallDisp();
        } else {
            this.storeInput(keyPressed);
            this.updateSmallDisp();
        }
    }

    initCalc = () => {
        this.inputNums.splice(0, this.inputNums.length);
        this.inputOperators.splice(0, this.inputOperators.length);
        this.display.value = '0';
        this.smallDisplay.value = '';
        this.displayInput = '0';
        this.result = '';
        this.lastKeyPressed = undefined;
    }

    updateSmallDisp = () => {
        this.smallDisplay.value = this.result === '' ?
            `${this.inputNums[0]} ${this.inputOperators[0] ?? ''}${this.inputNums[1] ?? ''}` :
            `${this.result} ${this.inputOperators[1] === '=' ? '' : this.inputOperators[1]}`;
    }

    populateNum = (elem) => {
        if (elem === '←') {
            this.display.value = this.display.value.length === 1 ? '0' : this.display.value.slice(0, -1);
            this.displayInput = this.display.value;
        } else {
            this.displayInput += elem;

            if (this.displayInput[0] === '0' && Number(this.displayInput) !== 0 && Number(this.displayInput) >= 1) {
                this.displayInput = this.displayInput.slice(1); //e.g. 05 will be shown as 5.

            }
            else if (this.displayInput === '00') {
                this.displayInput = '0';
            }
            this.display.value = this.displayInput;
        }
    }

    storeInput = (op) => {

        if (!this.inputNums.length) {
            this.inputNums[0] = parseFloat(this.displayInput);
        } else {
            this.inputNums[1] = parseFloat(this.displayInput);
        }

        this.display.value = Number(this.display.value).toString(); //remove '.' at end from number
        this.displayInput = '0';//clear input queue only after valid num input is captured
        if (op === '=' && this.inputNums.length <= 1) {
            return
        } else if (this.inputOperators.length === 0) {
            this.inputOperators[0] = op;
        }
        else if (this.inputOperators.length === 1) {
            this.inputOperators[1] = op;
        }
        else {
            this.inputOperators.shift();
            this.inputOperators.push(op);
        }
    }


    doMath = () => {
        switch (this.inputOperators[0]) {
            case '/':
                this.result = !this.inputNums[1] ? 'ERROR' : this.inputNums[0] / this.inputNums[1]
                break;
            case '*':
                this.result = this.inputNums[0] * this.inputNums[1]
                break;
            case '+':
                this.result = this.inputNums[0] + this.inputNums[1]
                break;
            case '-':
                this.result = this.inputNums[0] - this.inputNums[1]
                break;
        }
        this.display.value = this.result;

        this.inputNums[0] = this.result;
        this.inputNums.splice(1, 1);
    }
}

const newCalc = new Calc(btns, firstDisp, secondDisp);









