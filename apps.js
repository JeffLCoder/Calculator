

const inputNums = [];
const inputOperators = [];
const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
let result;
let displayInput = '0';
let lastKeyPressed;
display.value = '0';

for (let key of keys) {
    key.addEventListener('click', (e) => {
        const keyPressed = e.target.innerText;
        // console.log(e.target.innerText === '←');
        if (!lastKeyPressed && '+-*/='.includes(keyPressed)) { //first input can't be operator.          
            return
        } else if (keyPressed === '.' && display.value.includes('.')) { //no 2 dots
            return
        } else if (keyPressed === '←' && '+-*/='.includes(lastKeyPressed)) { //ignore ← key after operator
            return
        } else if (keyPressed === 'C') {
            initCalc();
            return
        } else if ('+-*/='.includes(lastKeyPressed) && '+-*/='.includes(keyPressed)) {//only last operator is recorded if multiple operators pressed  in a row. Same applies if after pressing =, then press an operator to use the result as operand) 
            inputOperators.pop();
            inputOperators.push(keyPressed);
            lastKeyPressed = keyPressed;
            return
        } else if (lastKeyPressed === '=' && !'+-*/='.includes(keyPressed)) { //clear arrays if user input new num after last result)
            inputNums.splice(0, inputNums.length);
            inputOperators.splice(0, inputOperators.length);
        }
        lastKeyPressed = keyPressed;

        if (!'+-*/='.includes(keyPressed)) {
            populateNum(keyPressed);
        } else if (inputOperators.length >= 1) {
            storeInput(keyPressed);
            doMath();
        } else {
            storeInput(keyPressed);
        }
    }
    )
}

function initCalc() {
    inputNums.splice(0, inputNums.length);
    inputOperators.splice(0, inputOperators.length);
    display.value = '0';
    displayInput = '0';
}

function populateNum(elem) {
    if (elem === '←') {
        display.value = display.value.length === 1 ? '0' : display.value.slice(0, -1);
        displayInput = display.value;
    } else {
        displayInput += elem;

        if (displayInput[0] === '0' && Number(displayInput) !== 0 && Number(displayInput) >= 1) {
            displayInput = displayInput.slice(1); //e.g. 05 will be shown as 5.

        }
        else if (displayInput === '00') {
            displayInput = '0';
        }
        display.value = displayInput;
    }
}

function storeInput(op) {

    if (!inputNums.length) {
        inputNums[0] = parseFloat(displayInput);
    } else {
        inputNums[1] = parseFloat(displayInput);
    }
    // !inputNums.length ? inputNums[0] = parseFloat(displayInput) : inputNums[1] = parseFloat(displayInput);

    display.value = Number(display.value).toString(); //remove '.' at end from number
    displayInput = '0';//clear input queue only after valid num input is captured
    if (op === '=' && inputNums.length <= 1) {
        return
    } else {
        inputOperators.push(op);
    }
}


function doMath() {
    switch (inputOperators[inputOperators.length - 2]) {
        case '/':
            result = !inputNums[1] ? 'ERROR' : inputNums[0] / inputNums[1]
            break;
        case '*':
            result = inputNums[0] * inputNums[1]
            break;
        case '+':
            result = inputNums[0] + inputNums[1]
            break;
        case '-':
            result = inputNums[0] - inputNums[1]
            break;
    }
    display.value = result;

    inputNums[0] = result;
    inputNums.splice(1, 1);
}



