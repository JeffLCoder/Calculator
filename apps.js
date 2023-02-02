
// capture  input
const inputNums = [];
const inputOperators = [];
let result;
let displayInput = '0';
const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
display.value = '0';
let lastKeyPressed;

for (let key of keys) {
    key.addEventListener('click', (e) => {
        const keyPressed = e.target.innerText;
        console.log('keyPressed', keyPressed);

        if (!lastKeyPressed && '+-*/='.includes(keyPressed)) { //first input can't be operator.          
            return
        } else if (keyPressed === 'C') {
            initCalc();
            return
        } else if (keyPressed === '.' && display.value.includes('.')) { //no 2 dots
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
            populateNum(key);
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
    displayInput += elem.innerText;

    // if (displayInput[0] === '0' && displayInput.length > 1 && Number(displayInput) !== 0) {
    //     displayInput = displayInput.slice(1); //e.g. 05 will be shown as 5.
    // }
    // display.value = displayInput;
    if (displayInput[0] === '0' && Number(displayInput) !== 0 && Number(displayInput) >= 1) {
        // if ( displayInput.slice(-1) === '.') 
        displayInput = displayInput.slice(1); //e.g. 05 will be shown as 5.
        // } else {
        //     displayInput = displayInput.slice(1);
    }
    else if (displayInput === '00') {
        displayInput = '0';
    }
    display.value = displayInput;

    console.log('displayInput', displayInput)
}
function storeInput(op) {
    // if (displayInput !== '.') { //input num can't be dot only
    if (!inputNums.length) {
        inputNums[0] = parseFloat(displayInput);
    } else {
        inputNums[1] = parseFloat(displayInput);
    }
    display.value = Number(display.value).toString(); //remove it if last dig is '.' for any number
    displayInput = '0';//clear input queue only after valid num input is captured
    if (op === '=' && inputNums.length <= 1) {
        return
    } else {
        inputOperators.push(op);
    }
    // }
    console.log('inputOperators', inputOperators)
    console.log('storedNum', inputNums)
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
    console.log('storedNum', inputNums);
    console.log('inputOperators', inputOperators)
}


