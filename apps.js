

const inputNums = [];
const inputOperators = [];
const keys = document.querySelectorAll('.key');
const display = document.getElementById('display');
const smallDisplay = document.getElementById('small-display');
let result;
let displayInput = '0';
let lastKeyPressed;
display.value = '0';
display.disabled = true; //disable direct keyboard input
smallDisplay.disabled = true;

for (let key of keys) {
    key.addEventListener('click', (e) => {
        // const keyPressed = e.target.innerText;
        processKey(e.target.innerText);
    }
    )
}

window.addEventListener('keydown', (e) => {
    // console.log(e.key);
    if ('0123456789./*-+='.includes(e.key)) {
        processKey(e.key);
    } else if (e.key === 'Backspace') {
        processKey('←');
    } else if (e.key === 'Enter') {
        processKey('=');
    }
    return
}
)

function processKey(keyPressed) {
    if (//(!lastKeyPressed && '+-*/='.includes(keyPressed)) || first key input can't be operator.  
        (keyPressed === '.' && display.value.includes('.')) && displayInput.includes('.') || //ignore 2nd dot in number unless right after result
        (keyPressed === '←' && '+-*/='.includes(lastKeyPressed))) //ignore ← key after operator
    {
        return
    } else if (keyPressed === 'C') {
        initCalc();
        return
    } else if ('+-*/='.includes(lastKeyPressed) && '+-*/='.includes(keyPressed)) {//only last operator is recorded if multiple operators pressed  in a row. Same applies if after pressing =, then press an operator to use the result as operand) 
        inputOperators.pop();
        inputOperators.push(keyPressed);
        lastKeyPressed = keyPressed;
        updateSmallDisp();
        return
    } else if (lastKeyPressed === '=' && !'+-*/='.includes(keyPressed)) { //clear arrays if user input new num after last result)
        inputNums.splice(0, inputNums.length);
        inputOperators.splice(0, inputOperators.length);
        result = '';
    }
    lastKeyPressed = keyPressed;

    if (!'+-*/='.includes(keyPressed)) {
        populateNum(keyPressed);
    } else if (inputOperators.length >= 1) {
        storeInput(keyPressed);
        doMath();
        updateSmallDisp();
    } else {
        storeInput(keyPressed);
        updateSmallDisp();
    }
}

function initCalc() {
    inputNums.splice(0, inputNums.length);
    inputOperators.splice(0, inputOperators.length);
    display.value = '0';
    smallDisplay.value = '';
    displayInput = '0';
    result = '';

}

function updateSmallDisp() {
    smallDisplay.value = result ?
        `${result} ${inputOperators[1] === '=' ? '' : inputOperators[1]}` :
        `${inputNums[0]} ${inputOperators[0] ?? ''}${inputNums[1] ?? ''}`;
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
    } else if (inputOperators.length === 0) {
        inputOperators[0] = op;
        // console.log('inputOperators', inputOperators);
    }
    else if (inputOperators.length === 1) {
        inputOperators[1] = op;
    }
    else {
        inputOperators.shift();
        inputOperators.push(op);
        // console.log('inputOperators', inputOperators);
    }
    // smallDisplay.value = result ? `${result} ${inputOperators[1]}` : `${inputNums[0]} ${inputOperators[0] ?? ''} ${inputNums[1] ?? ''} `;

    // inputOperators.push(op);


}


function doMath() {
    switch (inputOperators[0]) {
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



